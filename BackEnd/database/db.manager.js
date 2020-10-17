
const Sequelize = require("sequelize");

const sequelizeConnection = require('./db.connection.js');


const UsuarioModel = require("../models/usuario.model");
const Usuario = UsuarioModel (sequelizeConnection, Sequelize);

const CarreraObservacionModel = require("../models/carreraObservacion.model");
const CarreraObservacion = CarreraObservacionModel (sequelizeConnection, Sequelize);

const EstacionModel = require("../models/estacion.model");
const Estacion = EstacionModel (sequelizeConnection, Sequelize);

const GrupoModel = require("../models/grupo.model");
const Grupo = GrupoModel (sequelizeConnection, Sequelize);

const GrupoIntegranteModel = require("../models/grupoIntegrante.model");
const GrupoIntegrante = GrupoIntegranteModel (sequelizeConnection, Sequelize);

const EstadisticaModel = require("../models/estadistica.model");
const Estadistica = EstadisticaModel (sequelizeConnection, Sequelize);

const ParametroModel = require("../models/parametro.model");
const Parametro = ParametroModel (sequelizeConnection, Sequelize);


//****** CREAR RELACION ENTRE TABLAS***/

/*Tabla Carrera Observacion*/
CarreraObservacion.belongsTo( Usuario, {foreignKey: 'usuarioId', as: 'usuario' });
Usuario.hasMany(CarreraObservacion, {foreignKey: 'usuarioId'});

/*Tabla Estacion*/
Estacion.belongsTo( CarreraObservacion, {foreignKey: 'carreraObservacionId', as: 'carreraObservacion' });
CarreraObservacion.hasMany(Estacion, {foreignKey: 'carreraObservacionId'});

/*Tabla Grupo*/
Grupo.belongsTo( CarreraObservacion, {foreignKey: 'carreraObservacionId', as: 'carreraObservacion' });
CarreraObservacion.hasMany(Grupo, {foreignKey: 'carreraObservacionId'});

/*Tabla GrupoIntegrante*/
GrupoIntegrante.belongsTo( Grupo, {foreignKey: 'grupoId', as: 'grupo' });
Grupo.hasMany(GrupoIntegrante, {foreignKey: 'grupoId'});

/*Tabla Estadistica*/
Estadistica.belongsTo( Estacion, {foreignKey: 'estacionId', as: 'estacion' });
Estacion.hasMany(Estadistica, {foreignKey: 'estacionId'});

Estadistica.belongsTo( Grupo, {foreignKey: 'grupoId', as: 'grupo' });
Grupo.hasMany(Estadistica, {foreignKey: 'grupoId'});

const models = {
  Usuario: Usuario,
  CarreraObservacion: CarreraObservacion,
  Estacion: Estacion,
  Grupo: Grupo,
  GrupoIntegrante: GrupoIntegrante,
  Estadistica: Estadistica,
  Parametro: Parametro
};

const db = {
    ...models,
    sequelizeConnection
};

module.exports = db;
