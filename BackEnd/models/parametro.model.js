module.exports = (sequelize, DataTypes) =>{
    const Parametro = sequelize.define (
      'Parametro', {
        parametroId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        parametroCodigo: {
          type: DataTypes.INTEGER,
          unique: true
        },
        parametroTexto: {
          type: DataTypes.STRING(40),
        },
        parametroFecha: {
          type: DataTypes.DATE,
        },
        parametroValor: {
          type: DataTypes.INTEGER,
        },
        parametroEstado: {
          type: DataTypes.STRING(1),//A-ACTIVO I-INACTIVO
        }
      }
    );
    return Parametro;
};
