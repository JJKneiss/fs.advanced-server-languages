// const { response } = require('express');
const express = require('express');
const app = new express();

const pageRouter = require('./src/controllers/page');
const quizCtrl = require('./src/controllers/quiz');
const questionCtrl = require('./src/controllers/question');
const choiceCtrl = require('./src/controllers/choice');
const authCtrl = require('./src/controllers/auth');

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


app.set('views', __dirname + '/src/views');
app.set('view engine', 'twig');

app.use('/', pageRouter);
app.use('/home', pageRouter);
app.use('/auth', authCtrl);
app.use('/quizzes', quizCtrl);
app.use('/questions', questionCtrl);
app.use('/choices', choiceCtrl);

app.listen(3000);