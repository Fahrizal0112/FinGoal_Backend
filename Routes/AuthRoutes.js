const express = require('express');
const { Signup, Signin } = require('../Controllers/AuthController');
const { createQuestion, getQuestions, createAnswer, getAnswersByQuestionId, submitAnswers } = require('../Controllers/QuestionController');
const authenticateToken = require('../middleware/AuthMiddleware');

const router = express.Router();

router.post('/signup', Signup);
router.post('/signin', Signin);

router.post('/question', createQuestion);
router.get('/question', getQuestions);

router.post('/answer', createAnswer);
router.get('/answer', getAnswersByQuestionId);
router.post('/submit', authenticateToken,submitAnswers);

module.exports = router;