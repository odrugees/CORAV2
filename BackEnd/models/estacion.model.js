module.exports = (sequelize, DataTypes) =>{
    const Estacion = sequelize.define (
      'Estacion', {
        estacionId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        estacionNombre: {
          type: DataTypes.STRING(40),
        },
        estacionDescripcion: {
          type: DataTypes.STRING(40),
        },
        estacionCodigo: {
          type: DataTypes.STRING(100),
        },
        estacionURLVideo: {
          type: DataTypes.STRING(100),
        },
        estacionImagen: {
          type: DataTypes.STRING(100),
        },
        estacionImagen3D: {
          type: DataTypes.STRING(100),
        },
        estacionTexto: {
          type: DataTypes.STRING(100),
        },
        estacionAudio: {
          type: DataTypes.STRING(100),
        },
        estacionURLLink: {
          type: DataTypes.STRING(100),
        },
        estacionEstado: {
          type: DataTypes.STRING(1),//A-ACTIVO I-INACTIVO
        }
      }
    );
    return Estacion;
};
