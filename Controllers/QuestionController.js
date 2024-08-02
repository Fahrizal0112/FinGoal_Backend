const { Answer,Question } = require('../models/Models');

const createQuestion = async (req, res) => {
    try {
        const { questionText } = req.body;
        
        if (!questionText) {
            return res.status(400).json({ message: 'Question text is required' });
        }

        const question = await Question.create({ questionText });
        res.status(201).json({ message: 'Question created successfully', question });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getQuestions = async (req, res) => {
    try {
        const questions = await Question.findAll();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createAnswer = async (req, res) => {
    try {
        const { questionId, answerText } = req.body;
        
        if (!questionId || !answerText) {
            return res.status(400).json({ message: 'Question ID and answer text are required' });
        }
        const answer = await Answer.create({ questionId, answerText });
        res.status(201).json({ message: 'Answer created successfully', answer });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAnswersByQuestionId = async (req, res) => {
    try {
        const { questionId } = req.params;

        if (!questionId) {
            return res.status(400).json({ message: 'Question ID is required' });
        }

        const answers = await Answer.findAll({ where: { questionId } });
        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createQuestion, getQuestions , createAnswer, getAnswersByQuestionId };