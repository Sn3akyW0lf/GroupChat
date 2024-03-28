const Message = require('../models/message');

const sequelize = require('../util/database');

exports.postMessage = async (req, res) => {
    // console.log(req.user);
    try {
        const data = await req.user.createMessage({
            message: req.body.msg,
            sender: req.user.name
        });

        console.log(data.message);

        return res.status(201).json({ message: data.message, sender: req.user.name });
    } catch (err) {
        console.log(err);
    }
};

exports.getMessages = async (req, res) => {

    try {
        const chats = await Message.findAll();

        // console.log(chats);

        return res.status(200).json({ success: true, messages: chats });
    } catch (err) {
        console.log(err);
    }
};