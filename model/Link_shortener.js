const Sequelize = require('sequelize');
const conn = require('../config/database');


const User = conn.define('users', {
    username: {
        type: Sequelize.DataTypes.STRING
    },
    password: {
        type: Sequelize.DataTypes.STRING
    },
});

module.exports = User;