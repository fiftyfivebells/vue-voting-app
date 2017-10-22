const express = require('express');
const router = express.Router();

// create static asses from the front-end's bundle
const staticFile = express.static(path.join(__dirname, '../../client/dist'));

router.get('/*', (req, res) => {
    res.send(staticFile);
});

module.exports = router;
