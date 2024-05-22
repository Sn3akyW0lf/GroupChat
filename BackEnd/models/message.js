const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const User = require('./user');
const Group = require('./group');

const Message = sequelize.define('message', {
    // id: {
    //     type:Sequelize.INTEGER,
    //     autoIncrement: true,
    //     allowNull: false,
    //     primaryKey: true
    // },
    message: {
        type:DataTypes.STRING
    },
    timestamp: {
        type: DataTypes.DATE
    }
});

Message.belongsTo(Group);
Message.belongsTo(User);

module.exports = Message;