
const Sequelize = require("sequelize");

const sequelizeConnection = require('./db.connection.js');

const UserModel = require("../models/user.model");
const User = UserModel (sequelizeConnection, Sequelize);

const UsuarioModel = require("../models/usuario.model");
const Usuario = UsuarioModel (sequelizeConnection, Sequelize);

const CarreraObservacionModel = require("../models/carreraObservacion.model");
const CarreraObservacion = CarreraObservacionModel (sequelizeConnection, Sequelize);


//****** CREAR RELACION ENTRE TABLAS***/

/*Tabla Carrera Observacion*/
CarreraObservacion.belongsTo( Usuario, {foreignKey: 'usuarioId', as: 'usuario' });
Usuario.hasMany(CarreraObservacion, {foreignKey: 'usuarioId'});

const models = {
  User: User,
  Usuario: Usuario,
  CarreraObservacion: CarreraObservacion
};

const db = {
    ...models,
    sequelizeConnection
};

module.exports = db;
