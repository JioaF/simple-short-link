const { Sequelize } = require('sequelize');

module.exports = new Sequelize('link-shortener', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
});

