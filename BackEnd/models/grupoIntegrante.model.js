module.exports = (sequelize, DataTypes) =>{
    const GrupoIntegrante = sequelize.define (
      'GrupoIntegrante', {
        grupoIntegranteId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        grupoIntegranteNombre: {
          type: DataTypes.STRING(40),
        },
        grupoIntegranteApellido: {
          type: DataTypes.STRING(40),
        },
        grupoIntegranteCorreo: {
          type: DataTypes.STRING(100),
          unique: true
        },
        grupoIntegranteTelefono: {
        type: DataTypes.STRING(20),
        },
        grupoIntegranteEstado: {
          type: DataTypes.STRING(1),//A-ACTIVO I-INACTIVO
        }
      }
    );
    return GrupoIntegrante;
};
