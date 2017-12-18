const express = require('express');
const router = express.Router();
const Poll = require('../models/poll');

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
        console.log(req);
        await Poll.deleteOne({choice: req.body.question});
        res.json('poll deleted');
    });

router.route('/update')
    .post(async (req, res) => {
        await Poll.update(
            {question: req.body.question},
            {$set: {
                totalVotes: req.body.totalVotes,
                choices: req.body.choices,
                voters: req.body.voters}});
    });

router.route('/add')
    .post(async (req, res) => {
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
