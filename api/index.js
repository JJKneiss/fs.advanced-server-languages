// Create Express, App, & Port
const express = require('express');
const app = new express();
const port = process.env.PORT || 3001;

// Require & Define Page, Auth, and API Paths
const pageRouter = require('../api/src/controllers/page');
const authCtrl = require('../api/src/controllers/auth');
const quizCtrl = require('../api/src/controllers/quiz');
const questionCtrl = require('../api/src/controllers/question');
const choiceCtrl = require('../api/src/controllers/choice');

// Create User Session
const session = require('express-session');
app.use(session({
    saveUninitialized: false,
    secret: 'ambrosia',
    cookie: { maxAge: 60000 }
}));

// Enable CORS
const cors = require('cors');
app.use(cors());

// Use Request
const { request } = require('express');

// Use Body Parser for JSON Data
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Set Page Views & View Engine With Twig
app.set('views', __dirname + '/src/views');
app.set('view engine', 'twig');

// Use Page Routes
app.use('/', pageRouter);

// Authentication Route
app.use('/auth', authCtrl);

// API Routes
app.use('/quizzes', quizCtrl);
app.use('/questions', questionCtrl);
app.use('/choices', choiceCtrl);


// Run Server
app.listen(port, () => console.log(`listening at port ${port}`));