const Message = require('../models/message');
const User = require('../models/user');
const io = require('../socket');
const formatMessage = require('../util/message');

const { Op } = require('sequelize');
const sequelize = require('../util/database');

exports.postMessage = async (req, res) => {
    // console.log(req.body);
    try {
        const { msg, date } = req.body
        const data = await req.user.createMessage({
            message: msg,
            timestamp: date
        });

        // console.log(data.message);

        

        return res.status(201).json(formatMessage(req.user.name, data.message));
    } catch (err) {
        console.log(err);
    }
};

exports.getMessages = async (req, res) => {

    let { lastChat } = req.params;
    console.log(req.params.lastChat);

    try {
        if (lastChat === 'undefined') {
            console.log('IN UNDEFINED');
            lastChat = -1;
            console.log(lastChat);
            const chats = await Message.findAll({
                attributes: [
                    'id',
                    'message',
                    'timestamp'
                ],
                include: {
                    model: User,
                    attributes: ['name']
                },
                where: {
                    id: {
                        [Op.gt]: `${lastChat}`
                    }
                }

            });
            // console.log(chats);

            return res.status(200).json({ success: true, messages: chats });

        } else {
            console.log('IN VALUE CONDITION');
            // console.log(lastChat);
            const chats = await Message.findAll({
                attributes: [
                    'id',
                    'message',
                    'timestamp'
                ],
                include: {
                    model: User,
                    attributes: ['name']
                },
                where: {
                    id: {
                        [Op.gt]: lastChat
                    }
                }
            });
            console.log(chats);

            return res.status(200).json({ success: true, messages: chats });

        }

        console.log(chats);

        // return res.status(200).json({ success: true, messages: chats });
    } catch (err) {
        console.log(err);
    }
};

exports.getNewMessages = async (req, res) => {

    let dateStr = new Date(req.params.date);

    console.log(dateStr);
    
    let chats = await Message.findAll({
        attributes: [
            'message',
            'sender',
            'createdAt'
        ],
        where: {
            createdAt: { [Sequelize.gt]: `${dateStr}` },
        },
    });

    console.log(chats);
};