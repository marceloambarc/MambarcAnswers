const Sequelize = require('sequelize');

const connection = new Sequelize('guideasks', 'root', 'yourMySQLpasswordhere', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;