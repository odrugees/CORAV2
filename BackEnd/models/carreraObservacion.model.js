module.exports = (sequelize, DataTypes) =>{
    const CarreraObservacion = sequelize.define (
      'CarreraObservacion', {
        carreraObservacionId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        carreraObservacionNombre: {
          type: DataTypes.STRING(40),
        },
        carreraObservacionDescripcion: {
          type: DataTypes.STRING(200),
        },
        carreraObservacionCodigoIngreso: {
          type: DataTypes.STRING(10),
          unique: true
        },
        carreraObservacionIntegrantesGrupo: {
          type: DataTypes.BIGINT(2),
        },
        carreraObservacionEstado: {
          type: DataTypes.STRING(1),//A-ACTIVO I-INACTIVO
        }
      }
    );
    return CarreraObservacion;
};
