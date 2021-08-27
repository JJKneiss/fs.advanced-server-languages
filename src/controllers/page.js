const express = require('express');
const pageRouter = express.Router();

pageRouter.get('/', async (req, res) => {
    res.render('pages/home');
});
pageRouter.get('/home', async (req, res) => {
    res.render('pages/home');
});
module.exports = pageRouter;