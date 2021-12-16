const Sequelize = require('sequelize');
const conn = require('../config/database');


const Unsignup = conn.define('unsignup', {
    link: {
        type: Sequelize.STRING
    },
    masked_link: {
        type: Sequelize.STRING
    },
    browser_id: {
        type: Sequelize.STRING
    },
    date_created: {
        type: Sequelize.STRING
    },
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Unsignup;