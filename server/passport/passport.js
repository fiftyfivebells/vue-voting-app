const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const Account = require('../models/account');
const errMsg = {message: 'Username or password is incorrect.'};

const local = new LocalStrategy(
    (username, password, done) => {
        Account.findOne({username: username}, (err, user) => {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, errMsg);
            }

            const isValid = user.isValidPass(password);
            if (!isValid) {
                return done(null, false, errMsg);
            }

            return done(null, user);
        });
    }
);

const jwtOptions = {
    jwtFromRequest: extractJwt.fromHeader(),
    secretOrKey: process.env.JWT_KEY || 'justfortesting',
};

const jwt = new JwtStrategy(jwtOptions, async (data, next) => {
    console.log(data);
    const acc = await Account.findById(data._id);
    if (acc) {
        return next(null, acc);
    } else {
        return next(null, false);
    }
});

passport.use(local);
passport.use(jwt);

