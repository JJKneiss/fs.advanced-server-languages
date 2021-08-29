const express = require('express');
const router = express.Router();
const { Quiz } = require('../models');
const { isAuthenticated } = require('../middlewares/auth');

// Show All Quizzes
router.get('/', isAuthenticated, async (req, res) => {
    let quizzes = await Quiz.findAll();
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(quizzes);
    }
    else res.render('quizzes/index', { quizzes, isLoggedIn: true });
});

// Create Quiz Form
router.get('/new', isAuthenticated, async (req, res) => {
    res.render('quizzes/create');
});

// Create Quiz
router.post('/', isAuthenticated, async (req, res) => {
    let quiz = await Quiz.create(req.body);
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(quiz);
    }
    else res.redirect('/quizzes');
});

// Show One Quiz
router.get('/:id', isAuthenticated, async (req, res) => {
    const quiz = await Quiz.findByPk(Number(req.params.id));
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(quiz);
    }
    else res.render('quizzes/show', { quiz, isLoggedIn: true });
});

// Update Quizzes
router.post('/:id', isAuthenticated, async (req, res) => {
    let quiz = await Quiz.update(req.body, {
        where: {
            id: Number(req.params.id)
        }
    });
    quiz = await Quiz.findByPk(Number(req.params.id));
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(quiz);
    }
    else {
        res.render('quizzes/show', { quiz, isLoggedIn: true });
    }
});
// Update Quiz Form
router.get('/:id/edit', isAuthenticated, async (req, res) => {
    let quiz = await Quiz.findByPk(Number(req.params.id));
    res.render('quizzes/edit', { quiz, isLoggedIn: true });
});

// Delete Quiz
router.get('/:id/delete', isAuthenticated, async (req, res) => {
    const deleted = await Quiz.destroy({
        where: {
            id: Number(req.params.id)
        }
    });
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(deleted);
    }
    else res.redirect('/quizzes');
});
// Export
module.exports = router;