const express = require('express');
const router = express.Router();
const path = require('path');

// create static asses from the front-end's bundle
const staticFile = express.static(path.join(__dirname, '../../client/dist/index.html'));

router.get('/*', (req, res) => {
    res.sendFile(staticFile);
});

module.exports = router;
