const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes/routes.js');

// create static asses from the front-end's bundle
const staticFile = express.static(path.join(__dirname, '../client/dist'));

app.use(staticFile);
app.set('trust proxy', true);

app.use((req, res, next) => {
    const headers = 'Access-Control-Allow-Headers';
    res.header('Access-Control-Allow-Origin', '*');
    res.header(headers, 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
