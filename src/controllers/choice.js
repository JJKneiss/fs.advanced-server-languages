const express = require('express');
const router = express.Router();
const { Choice } = require('../models');
const { isAuthenticated } = require('../middlewares/auth');

// Index
router.get('/', isAuthenticated, async (req, res) => {
    let choices = await Choice.findAll();
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(choices);
    }
    else res.render('choices/index', { choices, isLoggedIn: true });
});

// Create choices
router.post('/', isAuthenticated, async (req, res) => {
    let choice = await Choice.create(req.body);
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(choice);
    }
    else res.redirect('/choices');
});
// Create choices form
router.get('/new', isAuthenticated, async (req, res) => {
    res.render('choices/create');
});

// Show choices
router.get('/:id', isAuthenticated, async (req, res) => {
    const choice = await Choice.findByPk(Number(req.params.id));
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(choice);
    }
    else res.render('choices/show', { choice, isLoggedIn: true });
});

// Update choices
router.post('/:id', isAuthenticated, async (req, res) => {
    let choice = await Choice.update(req.body, {
        where: { id: Number(req.params.id) }
    });
    choice = await Choice.findByPk(Number(req.params.id));
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(choice);
    }
    else res.render('choices/edit', { choice, isLoggedIn: true });
});
// Edit Quiz Form
router.get('/:id/edit', isAuthenticated, async (req, res) => {
    let choice = await Choice.update(req.body, {
        where: {
            id: Number(req.params.id)
        }
    });
    choice = await Choice.findByPk(Number(req.params.id));
    res.render('choices/edit', { choice, isLoggedIn: true });
});

// Delete choices
router.get('/:id/delete', isAuthenticated, async (req, res) => {
    const deleted = await Choice.destroy({
        where: { id: Number(req.params.id) }
    })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(deleted);
    }
    else res.redirect('/choices');
});
// Export
module.exports = router;