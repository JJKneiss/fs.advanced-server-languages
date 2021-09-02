const express = require('express');
const router = express.Router();
const { Question, Quiz } = require('../models');
const question = require('../models/question');
const { isAuthenticated } = require('../middlewares/auth');

// Index
router.get('/', isAuthenticated, async (req, res) => {
    let questions = await Question.findAll({
        include: Quiz
    });
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(questions);
    }
    else res.render('questions/index', { questions, isLoggedIn: true });
});

// Create Question
router.post('/', isAuthenticated, async (req, res) => {
    const question = await Question.create(req.body);
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(question);
    }
    else res.redirect('/questions');
});
// Create Quiz Form
router.get('/new', isAuthenticated, async (req, res) => {
    res.render('questions/create');
});

// Show Question
router.get('/:id', isAuthenticated, async (req, res) => {
    const question = await Question.findByPk(Number(req.params.id), {
        include: Quiz
    });
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(question);
    }
    else res.render('questions/show', { question, isLoggedIn: true });
});

// Update Questions
router.post('/:id', isAuthenticated, async (req, res) => {
    let question = await Question.update(req.body, {
        where: { id: Number(req.params.id) }
    });
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(question);
    }
    else res.render('questions/edit', { question, isLoggedIn: true });
});
// Edit Quiz Form
router.get('/:id/edit', isAuthenticated, async (req, res) => {
    let question = await Question.update(req.body, {
        where: {
            id: Number(req.params.id)
        }
    });
    question = await Question.findByPk(Number(req.params.id));
    res.render('questions/edit', { question, isLoggedIn: true });
});

// Delete Question
router.get('/:id/delete', isAuthenticated, async (req, res) => {
    const deleted = await Question.destroy({
        where: {
            id: Number(req.params.id)
        }
    });
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(deleted);
    }
    else res.redirect('/questions');
});
// Export
module.exports = router;