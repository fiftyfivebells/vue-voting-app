const express = require('express');
const router = express.Router();
const passport = require('passport');
const Poll = require('../models/poll');
const path = require('path');

router.route('/')
    .get((req, res) => {
        Poll.find().then((polls) => {
            res.send(polls);
        }).catch((err) => {
            res.status(400).send(err);
        });
    });

router.route('my-polls')
    .get(async (req, res) => {
        const polls = await Poll.find({username: req.user.username})
        .catch((err) => {
            res.json('No polls to return');
        });

        res.json(polls);
    });

router.route('/delete')
    .post(async (req, res) => {
        await Poll.delete({choice: req.body.choice});
        res.json('poll deleted');
    });

router.route('/add')
    .post(async (req, res) => {
        console.log(req.body.choices);
        const poll = new Poll({
            question: req.body.question,
            choices: req.body.choices,
            author: req.body.author,
        });

        await poll.save().catch((err) => {
            console.log(err);
        });
        res.json(poll);
    });

module.exports = router;
