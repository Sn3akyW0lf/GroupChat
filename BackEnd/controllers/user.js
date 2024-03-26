const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function generateAccessToken (id) {
    return jwt.sign({ userId: id }, process.env.TOKEN_SECRET);
}

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

exports.postLogin = async (req, res, next) => {
    try {
        console.log('test');
        let email = req.body.email;
        let password = req.body.password;

        const user = await User.findAll({
            where: {
                email: email
            }
        });


        console.log(user[0]);

        if (user.length) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (err) {
                    throw new Error('Something Went Wrong');
                }
                if (result) {
                    console.log('Correct Password');
                    return res.status(200).json({ success: true, message: 'User Logged in Successfully', token: generateAccessToken(user[0].id), email: user[0].email });
                } else {
                    console.log('Wrong Password');
                    return res.status(401).json({ success: false, message: 'Wrong Password' });
                }
            })
        } else {
            res.status(404).json(user);
        }
    } catch (err) {
        console.log(err);
    }
};

exports.getUserList = async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: [
                'name'
            ]
        });

        return res.status(200).json({ success: true, message: 'User Logged in Successfully', users: users});        
        console.log(users);
    } catch (err) {
        console.log(err);
    }
};