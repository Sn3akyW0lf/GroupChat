const Message = require('../models/message');

const sequelize = require('../util/database');

exports.postMessage = async (req, res) => {
    // console.log(req.user);

    const data = await req.user.createMessage({
        message: req.body.msg
    });

    console.log(data.message);

    return res.status(201).json({ msgData: data.message, user: req.user.name });
};