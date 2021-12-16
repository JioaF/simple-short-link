const { Sequelize } = require('sequelize');

module.exports = new Sequelize('w-link-shortener', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
});

