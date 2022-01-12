const Sequelize = require('sequelize');
const conn = require('../config/database');


const Users = conn.define('users', {
    username: {
        type: Sequelize.DataTypes.STRING
    },
    password: {
        type: Sequelize.DataTypes.STRING
    },
});

const Links = conn.define('userLinks', {
    userId: {
        type: Sequelize.DataTypes.INTEGER
    },
    url: {
        type: Sequelize.DataTypes.TEXT
    },
    label: {
        type: Sequelize.DataTypes.STRING
    }    
})

module.exports = {Users, Links};