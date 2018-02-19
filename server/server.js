const express = require('express');
const path = require('path');
require('dotenv').config();
require('babel-polyfill');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const pollRoutes = require('./routes/polls.js');
const acctRoutes = require('./routes/accounts.js');
const clientRoutes = require('./routes/client.js');
const passport = require('passport');
const cors = require('cors');

// connect to mongo through mongoose
const mongoUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1';
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl);

// enable CORS
app.all('*', cors({
    origin: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization'],
}));

// initialize passport
app.use(passport.initialize());

// create static assets from the front-end's bundle
const staticFile = express.static(path.join(__dirname, '../../client/dist'));

app.use(staticFile);
app.set('trust proxy', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// handle the different routes
app.use('/api/polls', pollRoutes);
app.use('/api/account', acctRoutes);
app.use(clientRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
