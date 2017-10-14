const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const pollRoutes = require('./routes/polls.js');
const acctRoutes = require('./routes/accounts.js');

// connect to mongo through mongoose
mongoose.connect('mongodb://127.0.0.1');

// create static asses from the front-end's bundle
const staticFile = express.static(path.join(__dirname, '../client/dist'));

app.use(staticFile);
app.set('trust proxy', true);

app.use(bodyParser.json());
app.use((req, res, next) => {
    const headers = 'Access-Control-Allow-Headers';
    res.header('Access-Control-Allow-Origin', '*');
    res.header(headers, 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// handle the different routes
app.use('/polls', pollRoutes);
app.use('/account', acctRoutes);

// for all other routes, use Vue client
app.get('*', (req, res) => {
    res.send(staticFile);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
