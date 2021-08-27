const express = require('express');
const router = express.Router();
const { Quiz } = require('../models');

// Index
router.get('/', async (req, res) => {
    let quizzes = await Quiz.findAll();
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(quizzes);
    }
    else res.render('quizzes/index', { quizzes });
});

// Create Quiz
router.post('/', async (req, res) => {
    const quiz = await Quiz.create(req.body);
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(quizzes);
    }
    else res.redirect('/quizzes/' + quiz.id);
});
// Create Quiz Form
router.get('/new', async (req, res) => {
    res.render('quizzes/create');
});

// Show Quiz
router.get('/:id', async (req, res) => {
    const quiz = await Quiz.findByPk(Number(req.params.id));
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(quizzes);
    }
    else res.render('quizzes/show', { quiz });
});

// Update Quizzes
router.post('/:id', async (req, res) => {
    let quiz = await Quiz.update(req.body, {
        where: {
            id: Number(req.params.id)
        }
    });
    quiz = await Quiz.findByPk(Number(req.params.id));
    res.render('quizzes/edit', { quiz });
});
// Edit Quiz Form
router.get('/:id/edit', async (req, res) => {
    let quiz = await Quiz.update(req.body, {
        where: {
            id: Number(req.params.id)
        }
    });
    quiz = await Quiz.findByPk(Number(req.params.id));
    res.render('quizzes/edit', { quiz });
});

// Delete Quiz
router.delete('/:id', async (req, res) => {
    const deleted = await Quiz.destroy({
        where: {
            id: Number(req.params.id)
        }
    });
    res.redirect('/quizzes');
});// Delete Quiz Form
router.get('/:id/delete', async (req, res) => {
    const deleted = await Quiz.destroy({
        where: {
            id: Number(req.params.id)
        }
    });
    res.redirect('/quizzes');
});
// Export
module.exports = router;