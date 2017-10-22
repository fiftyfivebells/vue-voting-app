const express = require('express');
const JWT = require('jsonwebtoken');
const router = express.Router();
const passport = require('passport');
const Account = require('../models/account');
require('../passport/passport');

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

router.route('/register')
    .post(async (req, res, next) => {
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

router.route('/login')
    .post(async (req, res, next) => {
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

module.exports = router;

