const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const mongoose = require('mongoose');
const Interview = require('../models/Interview');

// Path to Python AI model
const AI_MODEL_PATH = path.join(__dirname, '../../AI/ForsaPlus_Model-AI-Interview/run_interview_analyzer.py');

/**
 * @description Start a new interview session
 * @route POST /api/interview/start
 * @access Private
 */
exports.startInterview = async (req, res) => {
  try {
    const { category, level } = req.body;
    
    if (!category || !level) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide interview category and difficulty level' 
      });
    }

    // Create a new interview session
    const interview = new Interview({
      user: req.user.id,
      category,
      level,
      status: 'in_progress',
      questions: [],
      responses: []
    });

    // Get initial question from AI model
    const initialQuestionResponse = await getQuestionFromAI(category, level);
    
    // Add initial question to interview
    interview.questions.push({
      text: initialQuestionResponse.question,
      type: initialQuestionResponse.type // e.g., "technical", "behavioral", etc.
    });

    await interview.save();

    res.status(201).json({
      success: true,
      data: {
        interviewId: interview._id,
        question: initialQuestionResponse.question,
        questionType: initialQuestionResponse.type,
        tips: initialQuestionResponse.tips || null
      }
    });
  } catch (error) {
    console.error('Error starting interview:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

/**
 * @description Submit a response to an interview question
 * @route POST /api/interview/response
 * @access Private
 */
exports.submitResponse = async (req, res) => {
  try {
    const { interviewId } = req.body;
    
    if (!interviewId) {
      return res.status(400).json({ success: false, error: 'Interview ID is required' });
    }

    // Check if files are included
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ success: false, error: 'No files were uploaded' });
    }

    const interview = await Interview.findById(interviewId);
    
    if (!interview) {
      return res.status(404).json({ success: false, error: 'Interview not found' });
    }

    // Verify user owns this interview
    if (interview.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    // Get uploaded files
    const videoFile = req.files.video;
    const audioFile = req.files.audio;
    const { textResponse } = req.body;

    // Create directory for interview files if it doesn't exist
    const interviewDir = path.join(__dirname, '../../uploads/interviews', interviewId);
    if (!fs.existsSync(interviewDir)) {
      fs.mkdirSync(interviewDir, { recursive: true });
    }

    // Save files to disk
    const videoPath = videoFile ? path.join(interviewDir, `response_${interview.responses.length + 1}_video.mp4`) : null;
    const audioPath = audioFile ? path.join(interviewDir, `response_${interview.responses.length + 1}_audio.mp3`) : null;

    if (videoFile) await videoFile.mv(videoPath);
    if (audioFile) await audioFile.mv(audioPath);

    // Process the response with AI model
    const aiAnalysis = await analyzeResponseWithAI({
      videoPath,
      audioPath,
      textResponse,
      category: interview.category,
      level: interview.level,
      interviewHistory: interview.questions.map((q, i) => ({
        question: q.text,
        response: interview.responses[i]?.text || null
      }))
    });

    // Save response to database
    interview.responses.push({
      videoUrl: videoFile ? `/uploads/interviews/${interviewId}/response_${interview.responses.length + 1}_video.mp4` : null,
      audioUrl: audioFile ? `/uploads/interviews/${interviewId}/response_${interview.responses.length + 1}_audio.mp3` : null,
      text: textResponse,
      analysis: {
        confidence: aiAnalysis.confidence,
        clarity: aiAnalysis.clarity,
        relevance: aiAnalysis.relevance,
        feedback: aiAnalysis.feedback
      }
    });

    // If there are more questions, add the next question
    if (aiAnalysis.nextQuestion) {
      interview.questions.push({
        text: aiAnalysis.nextQuestion,
        type: aiAnalysis.nextQuestionType
      });
      
      await interview.save();
      
      return res.status(200).json({
        success: true,
        data: {
          analysis: aiAnalysis,
          nextQuestion: aiAnalysis.nextQuestion,
          nextQuestionType: aiAnalysis.nextQuestionType,
          isComplete: false
        }
      });
    } else {
      // Interview is complete
      interview.status = 'completed';
      interview.completedAt = Date.now();
      
      await interview.save();
      
      return res.status(200).json({
        success: true,
        data: {
          analysis: aiAnalysis,
          isComplete: true,
          overallScore: aiAnalysis.overallScore,
          summary: aiAnalysis.summary
        }
      });
    }
  } catch (error) {
    console.error('Error submitting response:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

/**
 * @description Get interview questions by category
 * @route GET /api/interview/questions/:category
 * @access Private
 */
exports.getInterviewQuestions = async (req, res) => {
  try {
    const { category } = req.params;
    
    // In a real implementation, you would fetch questions from a database
    // For now, return a sample set of questions
    const questions = {
      technical: [
        "Explain the concept of React Native's virtual DOM.",
        "What is the difference between props and state in React?",
        "How would you optimize the performance of a React Native app?",
      ],
      behavioral: [
        "Tell me about a time you had to work under pressure.",
        "Describe a situation where you had to collaborate with a difficult team member.",
        "How do you handle criticism of your work?",
      ],
      general: [
        "What are your greatest strengths and weaknesses?",
        "Why are you interested in this position?",
        "Where do you see yourself in five years?",
      ]
    };
    
    if (!questions[category]) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }
    
    res.status(200).json({
      success: true,
      data: questions[category]
    });
  } catch (error) {
    console.error('Error getting questions:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

/**
 * @description Get results of a completed interview
 * @route GET /api/interview/results/:interviewId
 * @access Private
 */
exports.getInterviewResults = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.interviewId);
    
    if (!interview) {
      return res.status(404).json({ success: false, error: 'Interview not found' });
    }
    
    // Verify user owns this interview
    if (interview.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }
    
    res.status(200).json({
      success: true,
      data: {
        interview
      }
    });
  } catch (error) {
    console.error('Error getting interview results:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

/**
 * @description Get user's interview history
 * @route GET /api/interview/history
 * @access Private
 */
exports.getInterviewHistory = async (req, res) => {
  try {
    const interviews = await Interview.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select('category level status createdAt completedAt');
    
    res.status(200).json({
      success: true,
      count: interviews.length,
      data: interviews
    });
  } catch (error) {
    console.error('Error getting interview history:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

/**
 * Helper function to get a question from the AI model
 */
async function getQuestionFromAI(category, level) {
  // In a real implementation, this would call the Python AI model
  // For now, return mock data
  
  // Example of how to call the Python model:
  // return new Promise((resolve, reject) => {
  //   const python = spawn('python', [
  //     AI_MODEL_PATH,
  //     '--mode', 'generate_question',
  //     '--category', category,
  //     '--level', level
  //   ]);
  //
  //   let dataString = '';
  //
  //   python.stdout.on('data', (data) => {
  //     dataString += data.toString();
  //   });
  //
  //   python.stderr.on('data', (data) => {
  //     console.error(`stderr: ${data}`);
  //   });
  //
  //   python.on('close', (code) => {
  //     if (code !== 0) {
  //       reject(new Error(`Python process exited with code ${code}`));
  //       return;
  //     }
  //
  //     try {
  //       const result = JSON.parse(dataString);
  //       resolve(result);
  //     } catch (error) {
  //       reject(new Error('Failed to parse Python output'));
  //     }
  //   });
  // });
  
  // Mock response
  return {
    question: `Tell me about your experience with ${category === 'technical' ? 'React Native development' : 'teamwork and collaboration'}.`,
    type: category,
    tips: "Be specific and use concrete examples from your past experience."
  };
}

/**
 * Helper function to analyze a response with the AI model
 */
async function analyzeResponseWithAI({ videoPath, audioPath, textResponse, category, level, interviewHistory }) {
  // In a real implementation, this would call the Python AI model
  // For now, return mock data
  
  // Example of how to call the Python model:
  // return new Promise((resolve, reject) => {
  //   const python = spawn('python', [
  //     AI_MODEL_PATH,
  //     '--mode', 'analyze_response',
  //     '--video', videoPath || '',
  //     '--audio', audioPath || '',
  //     '--text', textResponse || '',
  //     '--category', category,
  //     '--level', level,
  //     '--history', JSON.stringify(interviewHistory)
  //   ]);
  //
  //   let dataString = '';
  //
  //   python.stdout.on('data', (data) => {
  //     dataString += data.toString();
  //   });
  //
  //   python.stderr.on('data', (data) => {
  //     console.error(`stderr: ${data}`);
  //   });
  //
  //   python.on('close', (code) => {
  //     if (code !== 0) {
  //       reject(new Error(`Python process exited with code ${code}`));
  //       return;
  //     }
  //
  //     try {
  //       const result = JSON.parse(dataString);
  //       resolve(result);
  //     } catch (error) {
  //       reject(new Error('Failed to parse Python output'));
  //     }
  //   });
  // });
  
  // Mock response with 80% chance of continuing with another question
  const isComplete = Math.random() > 0.8;
  
  return {
    confidence: Math.floor(Math.random() * 40) + 60, // 60-100
    clarity: Math.floor(Math.random() * 40) + 60, // 60-100
    relevance: Math.floor(Math.random() * 40) + 60, // 60-100
    feedback: "Good answer. You provided specific examples, but could improve by quantifying your impact more.",
    nextQuestion: isComplete ? null : "Can you describe a challenging situation you faced and how you overcame it?",
    nextQuestionType: isComplete ? null : "behavioral",
    overallScore: isComplete ? Math.floor(Math.random() * 40) + 60 : null,
    summary: isComplete ? "Overall, you performed well in the interview. Your technical knowledge is strong, but you could improve your communication clarity." : null
  };
} 