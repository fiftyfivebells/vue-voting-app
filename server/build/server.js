'use strict';

const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const pollRoutes = require('./routes/polls.js');
const acctRoutes = require('./routes/accounts.js');
// const clientRoutes = require('./routes/client.js');
const passport = require('passport');

// connect to mongo through mongoose
const mongoUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1';
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl);

// initialize passport
app.use(passport.initialize());

// create static asses from the front-end's bundle
const staticFile = express.static(path.join(__dirname, '../client/dist'));

app.use(staticFile);
app.set('trust proxy', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// enable CORS
app.use((req, res, next) => {
    const headers = {
        methods: 'PUT, GET, POST, DELETE, OPTIONS',
        headers: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials'
    };

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', headers.methods);
    res.header('Access-Control-Allow-Headers', headers.headers);
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

// handle the different routes
app.use('/polls', pollRoutes);
app.use('/account', acctRoutes);
app.get('/*', (req, res) => {
    res.send(staticFile);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});