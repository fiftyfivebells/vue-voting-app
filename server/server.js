const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const pollRoutes = require('./routes/polls.js');
const acctRoutes = require('./routes/accounts.js');

// connect to mongo through mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1');

// create static asses from the front-end's bundle
const staticFile = express.static(path.join(__dirname, '../client/dist'));

app.use(staticFile);
app.use(express.static('testpublic'));
app.set('trust proxy', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// enable CORS
app.use((req, res, next) => {
    const headers = {
        methods: 'PUT, GET, POST, DELETE, OPTIONS',
        headers: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials',
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

// redirect any non-specific routes to the front-end client
app.use('/*', (req, res) => {
    res.send(staticFile);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
