
const dbConfig = require("./db.config");


const Sequelize = require("sequelize");

//const sequelizeConnection = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//  host: dbConfig.HOST,
//  dialect: dbConfig.dialect,
//  operatorsAliases: false,
//  pool: {
//    max: dbConfig.pool.max,
//    min: dbConfig.pool.min,
//    acquire: dbConfig.pool.acquire,
//    idle: dbConfig.pool.idle
//  }
//});
const sequelizeConnection = new Sequelize('mysql://uz6i7f3oaf38hyon:q9c1q5ybjgfsb4ql@vrk7xcrab1wsx4r1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/i8fusb36ynxj9m7z');
module.exports = sequelizeConnection;
