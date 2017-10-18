const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
    },
});

accountSchema.pre('save', async function(next) {

    const SALT_FACTOR = 8;
    try {
        const salt = bcrypt.genSaltSync(SALT_FACTOR);
        const hash = bcrypt.hashSync(this.password, salt);

        this.password = hash;
        next();
    } catch (err) {
        next(err);
    }
});

accountSchema.methods.isValidPass = function(password, cb) {
    bcrypt.compare(password, this.password, (err, isValid) => {
        if (err) {
            return cb(err);
        }

        cb(null, isValid);
    });
};

const Account = mongoose.model('account', accountSchema);

module.exports = Account;
