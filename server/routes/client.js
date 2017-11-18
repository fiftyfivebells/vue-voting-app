const express = require('express');
const router = express.Router();
const path = require('path');

const staticFile = express.static(path.join(__dirname, '../../client/dist'));

router.route('/*')
    .get((req, res) => {
        res.send(staticFile);
    });

module.exports = router;
