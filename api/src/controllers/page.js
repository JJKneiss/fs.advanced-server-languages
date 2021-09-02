const express = require('express');
const pageRouter = express.Router();

pageRouter.get('/', async (req, res) => {
    if (!req.session.access_token) {
        let isLoggedIn = false;
        res.render('pages/home', { isLoggedIn });
    }
    else {
        let isLoggedIn = true;
        res.render('pages/home', { isLoggedIn });
    }
});
module.exports = pageRouter;