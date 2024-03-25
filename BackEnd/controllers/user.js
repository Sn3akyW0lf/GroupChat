const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.postUser = async (req, res, next) => {

    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.phone;

    const saltrounds = 10;

    console.log(username, email, phone, password);

    bcrypt.hash(password, saltrounds, async (err, hash) => {
        // console.log(err);
        try {
            const user = await User.create({
                name: username,
                email: email,
                phone: phone,
                password: hash
            });
            console.log(user);

            res.json({ createdUser: user });
        } catch (err) {
            return res.status(409).json(err);
            throw Error(err);
        }
    });
};