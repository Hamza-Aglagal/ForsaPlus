const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { 
  startInterview, 
  submitResponse,
  getInterviewQuestions,
  getInterviewResults,
  getInterviewHistory 
} = require('../controllers/interview');

// Get interview questions by category
router.get('/questions/:category', protect, getInterviewQuestions);

// Start a new interview session
router.post('/start', protect, startInterview);

// Submit interview response (video/audio/text)
router.post('/response', protect, submitResponse);

// Get results of a completed interview
router.get('/results/:interviewId', protect, getInterviewResults);

// Get user's interview history
router.get('/history', protect, getInterviewHistory);

module.exports = router; 