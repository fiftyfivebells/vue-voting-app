const express = require('express');
const router = express.Router();
const path = require('path');

const passport = require('passport');
const Account = require('../models/account');

passport.use(new LocalStrategy(Account.authenticate()));