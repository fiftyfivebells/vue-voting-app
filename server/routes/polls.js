const express = require('express');
const router = express.Router();
const passport = require('passport');
const Poll = require('../models/poll');
const path = require('path');

router.get('/', (req, res) => {
    Poll.find().then((polls) => {
        res.send(polls);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

router.get('my-polls', async (req, res) => {
    const polls = await Poll.find({username: req.user.username})
    .catch((err) => {
        res.json('No polls to return');
    });

    res.json(polls);
});

router.post('/delete', async (req, res) => {
    await Poll.delete({choice: req.body.choice});
    res.json('poll deleted');
});

router.post('/add', async (req, res) => {
    console.log(req.body.choices);
    const poll = new Poll({
        question: req.body.question,
        choices: req.body.choices,
        author: req.body.username,
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
