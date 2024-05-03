const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Message = sequelize.define('message', {
    // id: {
    //     type:Sequelize.INTEGER,
    //     autoIncrement: true,
    //     allowNull: false,
    //     primaryKey: true
    // },
    message: {
        type:Sequelize.STRING
    },
    timestamp: {
        type: Sequelize.DATE
    }
});

module.exports = Message;