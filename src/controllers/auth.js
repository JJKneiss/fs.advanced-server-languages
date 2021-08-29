const express = require('express');
const authRouter = express.Router();
const request = require('request');
const querystring = require('querystring');
require('dotenv').config();

authRouter.get('/login', (req, res) => {
    if (!req.session.access_token) {
        const client_id = process.env.GITHUB_CLIENT_ID;
        res.render('auth/login', { client_id, isLoggedIn: false });
    }
    else {
        res.render('auth/logout', { isLoggedIn: true });
    }
});
authRouter.get('/logout', (req, res) => {
    res.redirect('/');
    req.session.destroy();
})
authRouter.get('/callback', async (req, res) => {
    const { code } = req.query;
    await request({
        uri: 'https://github.com/login/oauth/access_token',
        qs: {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code
        }
    }, async (error, response, body) => {
        const { access_token } = querystring.parse(body);
        req.session.access_token = access_token;
        res.redirect('/');
    });
});
module.exports = authRouter;