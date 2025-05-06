const mongoose = require('mongoose');

// Schema for individual question
const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['technical', 'behavioral', 'general'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Schema for response analysis
const AnalysisSchema = new mongoose.Schema({
  confidence: {
    type: Number,
    min: 0,
    max: 100
  },
  clarity: {
    type: Number,
    min: 0,
    max: 100
  },
  relevance: {
    type: Number,
    min: 0,
    max: 100
  },
  feedback: {
    type: String
  }
});

// Schema for interview response
const ResponseSchema = new mongoose.Schema({
  videoUrl: {
    type: String
  },
  audioUrl: {
    type: String
  },
  text: {
    type: String
  },
  analysis: AnalysisSchema,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Main interview schema
const InterviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['technical', 'behavioral', 'general', 'mock_interview'],
    required: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  questions: [QuestionSchema],
  responses: [ResponseSchema],
  overallScore: {
    type: Number,
    min: 0,
    max: 100
  },
  summary: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  }
});

module.exports = mongoose.model('Interview', InterviewSchema); 