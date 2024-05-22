const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const User = require('./user');
const Group = require('./group');

const GroupMember = sequelize.define('groupMember', {});

Group.belongsToMany(User, { through: GroupMember });
User.belongsToMany(Group, { through: GroupMember });