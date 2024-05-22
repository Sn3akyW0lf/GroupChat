const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const User = require('./user');

const Group = sequelize.define('group', {
    groupName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    creatorUserId: {
        type: DataTypes.INTEGER
    }
});

// Group.belongsTo(User);

module.exports = Group;