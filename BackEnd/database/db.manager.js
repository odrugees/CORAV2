
const Sequelize = require("sequelize");

const sequelizeConnection = require('./db.connection.js');

const UserModel = require("../models/user.model");
const User = UserModel (sequelizeConnection, Sequelize);

const models = {
  User: User
};

const db = {
    ...models,
    sequelizeConnection
};

module.exports = db;
