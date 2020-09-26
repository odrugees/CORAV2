const dbManager = require ('../database/db.manager');
const bcrypt = require("bcrypt-nodejs");

/**
 * Crear Usuario
 */
async function crearUsuario (req, res) {
    // Validar parametros
    if (!req.body) {
        res.status(400).send({
          message: "El cuerpo de la solicitud esta vacio!!!!"
        });
        return;
    }


  function cryptPassword(req.body.usuarioContrasenia) {
  console.log("cryptPassword" + password);
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(10, function(err, salt) {
      // Encrypt password using bycrpt module
      if (err) return reject(err);

      bcrypt.hash(password, salt, null, function(err, hash) {
        if (err) return reject(err);
        return resolve(hash);
      });
    });
    // Crear objeto
    const nuevoUsuario = {
        usuarioNombre: req.body.usuarioNombre,
        usuarioApellido: req.body.usuarioApellido,
        usuarioCorreo: req.body.usuarioCorreo,
        usuarioContrasenia: req.body.usuarioContrasenia,
        usuarioEstado: req.body.usuarioEstado,
        usuarioTipo: req.body.usuarioTipo

    }

    //Ejecucion metodo
    dbManager.Usuario.create(nuevoUsuario).then (
        data => {
            res.send (data);
        }
    ).catch (
        e => {
            console.log(e);
            res.status(500).send({
              message: e.name,
              error: e.parent.sqlMessage
            });
        }
    );
}
/**
 * Retonar todos los Usuario
 */
async function retornarUsuarios (req, res){
    try {
        //Ejecucion metodo
        const usuarios = await dbManager.Usuario.findAll ();

        res.json({
                data: usuarios
        });

    } catch (e) {
        console.log(e);
        res.status(500).send({
          message: e.name,
          error: e.parent.sqlMessage
        });
    }
}
exports.crearUsuario = crearUsuario;
exports.retornarUsuarios = retornarUsuarios;
