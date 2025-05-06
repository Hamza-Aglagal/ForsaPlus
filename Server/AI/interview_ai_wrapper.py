#!/usr/bin/env python3
"""
Interview AI Wrapper

This script serves as a bridge between the Node.js backend and the ForsaPlus AI model.
It handles various operations related to interview analysis.
"""

import argparse
import json
import os
import sys
import logging
from pathlib import Path

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='interview_ai.log'
)
logger = logging.getLogger('interview_ai_wrapper')

# Constants
FORSA_MODEL_DIR = Path(__file__).parent / "ForsaPlus_Model-AI-Interview"
WEB_LLM_DIR = Path(__file__).parent / "web-llm"

def generate_question(category, level):
    """Generate a question based on category and level."""
    try:
        # In a production setup, you would import and use the actual model here
        # For now, we'll simulate the model's behavior
        
        # Example of how to call the model:
        # Import needed modules from the ForsaPlus model
        # sys.path.append(str(FORSA_MODEL_DIR))
        # from src.inference.nlp import get_interview_question
        # question_data = get_interview_question(category=category, level=level)
        
        # For demonstration, return a predefined question based on category and level
        questions = {
            'technical': {
                'beginner': "Can you explain what React Native is and how it differs from React?",
                'intermediate': "How would you handle state management in a complex React Native application?",
                'advanced': "Describe how you would optimize the performance of a React Native app that renders large lists of data."
            },
            'behavioral': {
                'beginner': "Tell me about a time when you had to learn a new skill quickly.",
                'intermediate': "Describe a situation where you had to resolve a conflict within your team.",
                'advanced': "Tell me about a time when you had to make a difficult decision with incomplete information."
            },
            'general': {
                'beginner': "Why are you interested in this position?",
                'intermediate': "Where do you see yourself in five years?",
                'advanced': "What unique value would you bring to our organization?"
            }
        }
        
        question = questions.get(category, {}).get(level, "Tell me about yourself.")
        
        return {
            "question": question,
            "type": category,
            "tips": f"When answering this {category} question, be concise and provide specific examples from your experience."
        }
    except Exception as e:
        logger.error(f"Error generating question: {e}")
        return {"error": f"Failed to generate question: {str(e)}"}

def analyze_response(video_path, audio_path, text_response, category, level, history):
    """Analyze a user's interview response."""
    try:
        # In a production setup, you would:
        # 1. Check if files exist
        if video_path and not os.path.exists(video_path):
            return {"error": f"Video file not found: {video_path}"}
        
        if audio_path and not os.path.exists(audio_path):
            return {"error": f"Audio file not found: {audio_path}"}
            
        # 2. Call the ForsaPlus model to analyze the response
        # Example:
        # sys.path.append(str(FORSA_MODEL_DIR))
        # from src.inference.facial import analyze_facial_expressions
        # from src.inference.audio import analyze_audio
        # from src.inference.nlp import analyze_text_response
        #
        # facial_analysis = analyze_facial_expressions(video_path) if video_path else None
        # audio_analysis = analyze_audio(audio_path) if audio_path else None
        # text_analysis = analyze_text_response(text_response, category) if text_response else None
        #
        # # Combine analyses
        # combined_analysis = {
        #    "confidence": facial_analysis.get("confidence", 0) if facial_analysis else 0,
        #    "clarity": audio_analysis.get("clarity", 0) if audio_analysis else 0,
        #    "relevance": text_analysis.get("relevance", 0) if text_analysis else 0,
        #    "feedback": generate_feedback(facial_analysis, audio_analysis, text_analysis)
        # }
        
        # For demonstration, simulate analysis with random scores
        import random
        
        # Simulate analyzing the response (would call the actual model in production)
        confidence = random.randint(60, 100)
        clarity = random.randint(60, 100)
        relevance = random.randint(60, 100)
        
        # Generate feedback based on the scores
        feedback_points = []
        if confidence < 75:
            feedback_points.append("Try to maintain better eye contact and more confident body language.")
        
        if clarity < 75:
            feedback_points.append("Work on speaking more clearly and structuring your thoughts better.")
            
        if relevance < 75:
            feedback_points.append("Your answer could be more relevant to the question. Focus on addressing the key points.")
            
        if not feedback_points:
            feedback_points.append("Good job! Your response was clear, confident, and relevant.")
            
        feedback = " ".join(feedback_points)
        
        # Decide if the interview should continue
        continue_interview = random.random() > 0.2  # 80% chance to continue
        
        # Generate the next question if continuing
        next_question = None
        next_question_type = None
        
        if continue_interview:
            # Generate next question based on history
            all_categories = ['technical', 'behavioral', 'general']
            # Choose a different category than the current one for variety
            next_categories = [c for c in all_categories if c != category] 
            next_category = random.choice(next_categories)
            
            next_question_data = generate_question(next_category, level)
            next_question = next_question_data["question"]
            next_question_type = next_question_data["type"]
        
        # Calculate overall score if interview is complete
        overall_score = None
        summary = None
        
        if not continue_interview:
            overall_score = int((confidence + clarity + relevance) / 3)
            
            if overall_score >= 85:
                summary = "Excellent interview performance! You demonstrated strong communication skills and provided relevant, insightful answers."
            elif overall_score >= 70:
                summary = "Good interview performance. You communicated well, though there's room for improvement in some areas."
            else:
                summary = "You have potential, but need to work on your interview skills. Focus on confidence, clarity, and the relevance of your answers."
        
        return {
            "confidence": confidence,
            "clarity": clarity,
            "relevance": relevance,
            "feedback": feedback,
            "nextQuestion": next_question,
            "nextQuestionType": next_question_type,
            "overallScore": overall_score,
            "summary": summary
        }
        
    except Exception as e:
        logger.error(f"Error analyzing response: {e}")
        return {"error": f"Failed to analyze response: {str(e)}"}

def main():
    """Main entry point for the script."""
    parser = argparse.ArgumentParser(description="ForsaPlus Interview AI Wrapper")
    parser.add_argument('--mode', required=True, choices=['generate_question', 'analyze_response'],
                       help='Operation mode')
    
    # Arguments for question generation
    parser.add_argument('--category', choices=['technical', 'behavioral', 'general'],
                       help='Question category')
    parser.add_argument('--level', choices=['beginner', 'intermediate', 'advanced'],
                       help='Difficulty level')
    
    # Arguments for response analysis
    parser.add_argument('--video', help='Path to video file')
    parser.add_argument('--audio', help='Path to audio file')
    parser.add_argument('--text', help='Text response')
    parser.add_argument('--history', help='JSON string of interview history')
    
    args = parser.parse_args()
    
    # Check if ForsaPlus model exists
    if not FORSA_MODEL_DIR.exists():
        print(json.dumps({"error": f"ForsaPlus model directory not found at {FORSA_MODEL_DIR}"}))
        return 1
    
    try:
        if args.mode == 'generate_question':
            if not args.category or not args.level:
                print(json.dumps({"error": "Category and level are required for question generation"}))
                return 1
                
            result = generate_question(args.category, args.level)
            
        elif args.mode == 'analyze_response':
            if not (args.video or args.audio or args.text):
                print(json.dumps({"error": "At least one of video, audio, or text must be provided"}))
                return 1
                
            history = json.loads(args.history) if args.history else []
            
            result = analyze_response(
                args.video,
                args.audio,
                args.text,
                args.category,
                args.level,
                history
            )
        
        # Output result as JSON
        print(json.dumps(result))
        return 0
        
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        print(json.dumps({"error": f"Unexpected error: {str(e)}"}))
        return 1

if __name__ == "__main__":
    sys.exit(main()) 