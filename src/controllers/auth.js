const { response } = require('express');
const express = require('express');
const authRouter = express.Router();
const request = require('request');
const querystring = require('querystring');
require('dotenv').config();

authRouter.get('/login', (req, res) => {
    const client_id = process.env.GITHUB_CLIENT_ID;
    res.render('auth/login', { client_id });
});
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
        await request({
            uri: 'https://api.github.com/user',
            headers: {
                'Authorization': `token ${access_token}`,
                'User-Agent': `Mozilla/5.0`
            }
        }, async (error, response, body) => {
            const data = querystring.parse(body);
            res.json(data);
        });
    });
});
module.exports = authRouter;