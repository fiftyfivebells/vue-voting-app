const express = require('express');
const router = express.Router();
const passport = require('passport');
const Poll = require('../models/poll');
const path = require('path');

router.route('/').get((req, res) => {
    Poll.find().then((polls) => {
        res.send(polls);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

router.route('/my-polls').get(async (req, res) => {
    const polls = await Poll.find({username: req.user.username})
    .catch((err) => {
        res.json('No polls to return');
    });

    res.json(polls);
});

router.route('/delete').post(async (req, res) => {
    await Poll.delete({choice: req.body.choice});
    res.json('poll deleted');
});

router.route('/add').post(async (req, res) => {

    const poll = new Poll({
        question: req.body.question,
        choices: req.body.choices,
        author: req.user.username,
    });

    await poll.save().catch((err) => {
        console.log(err);
    });
    res.json(poll);
});

// testing only
router.route('/add').get((req, res) => {
    res.sendFile(path.join(__dirname, '../testpublic/register.html'));
});

module.exports = router;
