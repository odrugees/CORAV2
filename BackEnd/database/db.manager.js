
const Sequelize = require("sequelize");

const sequelizeConnection = require('./db.connection.js');

const db = {
    sequelizeConnection
};

module.exports = db;
