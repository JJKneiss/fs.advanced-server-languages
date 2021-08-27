const express = require('express');
const router = express.Router();
const { Question, Quiz } = require('../models');
const question = require('../models/question');

// Index
router.get('/', async (req, res) => {
    let questions = await Question.findAll({
        include: Quiz
    });
    res.render('questions/index', { questions });
});

// Create Question
router.post('/', async (req, res) => {
    const question = await Question.create(req.body);
    // let quiz = await Quiz.findAll();
    // quiz = quiz.shift();
    // question.setQuiz(quiz);
    // console.log(question);
    res.redirect('/questions');
});
// Create Quiz Form
router.get('/new', async (req, res) => {
    res.render('questions/create');
});

// Show Question
router.get('/:id', async (req, res) => {
    const question = await Question.findByPk(Number(req.params.id), {
        include: Quiz
    });
    res.render('questions/show', { question });
});

// Update Questions
router.post('/:id', async (req, res) => {
    let question = await Question.update(req.body, {
        where: { id: Number(req.params.id) }
    });
    res.render('questions/edit', { question });
});
// Edit Quiz Form
router.get('/:id/edit', async (req, res) => {
    let question = await Question.update(req.body, {
        where: {
            id: Number(req.params.id)
        }
    });
    question = await Question.findByPk(Number(req.params.id));
    res.render('questions/edit', { question });
});

// Delete Question
router.delete('/:id', async (req, res) => {
    const deletedQuestion = await Question.destroy({
        where: { id: Number(req.params.id) }
    })
    res.redirect('/questions');
});
router.get('/:id/delete', async (req, res) => {
    const deleted = await Question.destroy({
        where: {
            id: Number(req.params.id)
        }
    });
    res.redirect('/questions');
});
// Export
module.exports = router;