module.exports = (sequelize, DataTypes) =>{
    const Estadistica = sequelize.define (
      'Estadistica', {
        estadisticaId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        estadisticaHoraInicio: {
          type: 'TIMESTAMP',
          allowNull: false
        },
        estadisticaHoraFinaliza: {
          type: 'TIMESTAMP',
          allowNull: false
        }
      }
    );
    return Estadistica;
};
