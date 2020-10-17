module.exports = (sequelize, DataTypes) =>{
    const Grupo = sequelize.define (
      'Grupo', {
        grupoId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        grupoNombre: {
          type: DataTypes.STRING(40),
        },
        grupoEstado: {
          type: DataTypes.STRING(1),//A-ACTIVO I-INACTIVO
        }
      }
    );
    return Grupo;
};
