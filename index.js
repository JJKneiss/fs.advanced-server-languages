// const { response } = require('express');
const express = require('express');
const app = new express();
const pageRouter = require('./src/controllers/page');

// app.get('/', (request, response) => {
//     response.send("Home Page: GET");
// });
// app.post('/', (request, response) => {
//     response.send("Home Page: POST");
// });

app.get('/', pageRouter);

app.listen(3000);