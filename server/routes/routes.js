const express = require('express');
const router = express.Router();
const path = require('path');

const JWT = require('jsonwebtoken');
const passport = require('passport');
require('../passport/passport');

const Account = require('../models/account');
const Poll = require('../models/poll');

/*
 * Account/Login related routes 
 */

/**
 * Creates a JWT token to identify user
 * @param {*} user
 * @return {obj} A token attached to user to authenticate their activities 
 */
function generateToken(user) {
    const jwtOptions = {
        name: user._id,
        time: 10080,
    };
    return JWT.sign(jwtOptions, process.env.JWT_KEY);
}

router.route('/account/register')
    .get((req, res) => {
    res.json({'msg': 'just for testing'});
});

router.post('/account/register', async (req, res, next) => {
        const {username, password} = req.body;

        console.log(`jwt key is ${process.env.JWT_KEY}`);

        if (!username) {
            return res.status(422).send({error: 'Please enter username'});
        }

        if (!password) {
            return res.status(422).send({error: 'Please enter password'});
        }

        const newAcc = new Account({username, password});
        const acct = await newAcc.save()
        .catch((err) => {
            return err;
        });

        const user = {
            name: username,
            id: acct._id,
        };

        console.log(user);
        const webToken = generateToken(user);

        res.set('Authorization', webToken).json(acct);
    });

router.post('/account/login', async (req, res, next) => {
        passport.authenticate('local', {session: false}, (err, user, info) => {
            if (err) {
                return next(err);
            };
            if (!user) {
                return res.json( {message: info.message});
            }

            const webToken = generateToken(user);
            res.set('Authorization', webToken).json(user);
            })(req, res, next);
    });

/*
 * Poll-related routes
 */
router.get('/polls', (req, res) => {
    Poll.find().then((polls) => {
        res.send(polls);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

router.get('/polls/my-polls', async (req, res) => {
    const polls = await Poll.find({username: req.user.username})
    .catch((err) => {
        res.json('No polls to return');
    });

    res.json(polls);
});

router.post('/polls/delete', async (req, res) => {
    await Poll.delete({choice: req.body.choice});
    res.json('poll deleted');
});

router.post('/polls/add', async (req, res) => {
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

/*
 * All other routes caught by client
 */

const staticFile = express.static(path.join(__dirname, '../../client/dist'));

router.get('/*', (req, res) => {
    res.send(staticFile);
});

module.exports = router;

