const express = require('express');
const router = express.Router();
const { Choice } = require('../models');

// Index
router.get('/', async (req, res) => {
    let choices = await Choice.findAll();
    res.render('choices/index', { choices });
});

// Create choices
router.post('/', async (req, res) => {
    let choice = await Choice.create(req.body);
    console.log(choice);
    res.redirect('/choices');
});
// Create choices form
router.get('/new', async (req, res) => {
    res.render('choices/create');
});

// Show choices
router.get('/:id', async (req, res) => {
    const choice = await Choice.findByPk(Number(req.params.id));
    console.log(choice);
    res.render('choices/show', { choice });
});

// Update choices
router.post('/:id', async (req, res) => {
    let choice = await Choice.update(req.body, {
        where: { id: Number(req.params.id) }
    });
    choice = await Choice.findByPk(Number(req.params.id));
    res.render('choices/edit', { choice });
});
// Edit Quiz Form
router.get('/:id/edit', async (req, res) => {
    let choice = await Choice.update(req.body, {
        where: {
            id: Number(req.params.id)
        }
    });
    choice = await Choice.findByPk(Number(req.params.id));
    res.render('choices/edit', { choice });
});

// Delete choices
router.delete('/:id', async (req, res) => {
    const deleted = await Choice.destroy({
        where: { id: Number(req.params.id) }
    });
    res.redirect('/choices');
});
// Delete choices
router.get('/:id/delete', async (req, res) => {
    const deleted = await Choice.destroy({
        where: { id: Number(req.params.id) }
    })
    res.redirect('/choices');
});
// Export
module.exports = router;