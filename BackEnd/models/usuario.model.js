module.exports = (sequelize, DataTypes) =>{
    const Usuario = sequelize.define (
      'Usuario', {
        usuarioId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        usuarioNombre: {
          type: DataTypes.STRING(40),
        },
        usuarioApellido: {
          type: DataTypes.STRING(40),
        },
        usuarioCorreo: {
          type: DataTypes.STRING(100),
          unique: true
        },
        usuarioContrasenia: {
          type: DataTypes.STRING(40),
        },
        usuarioEstado: {
          type: DataTypes.STRING(1),//A-ACTIVO I-INACTIVO
        },
        usuarioTipo: {
          type: DataTypes.STRING(15),//Administrador-Anfitrion
        }
      }
    );
    return Usuario;
};
