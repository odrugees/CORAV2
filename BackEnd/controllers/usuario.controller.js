const dbManager = require('../database/db.manager');

/**
 * Retonar todos los Usuario
 */
async function retornarUsuarios(req, res) {
  try {
    //Ejecucion metodo
    const usuarios = await dbManager.Usuario.findAll({
      where: {
        usuarioEstado: 'A',
      }
    });

    res.json(usuarios);

  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: e.name,
      error: e.parent.sqlMessage
    });
  }
}

/* Retonar Usuario por Id*/
async function retonarUsuario(req, res) {
  try {
    const {
      usuarioId
    } = req.params;

    //Ejecucion metodo
    const usuario = await dbManager.Usuario.findOne({
      where: {
        usuarioId: usuarioId
      }
    });
    res.json(usuario);

  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: e.name,
      error: e.parent.sqlMessage
    });
  }
}
/**
 * Crear Usuario
 */
async function crearUsuario(req, res) {
  // Validar parametros
  if (!req.body) {
    res.status(400).send({
      message: "El cuerpo de la solicitud esta vacio!!!!"
    });
    return;
  }
  // Crear objeto
  const nuevoUsuario = {
    usuarioNombre: req.body.usuarioNombre,
    usuarioApellido: req.body.usuarioApellido,
    usuarioCorreo: req.body.usuarioCorreo,
    usuarioContrasenia: req.body.usuarioContrasenia,
    usuarioEstado: 'A',
    usuarioTipo: req.body.usuarioTipo
  }

  //Ejecucion metodo
  dbManager.Usuario.create(nuevoUsuario).then(
    res.status(200).send({
      status: 1,
      message: "Usuario creado correctamente"
    })
  ).catch(
    e => {
      console.log(e);
      res.status(500).send({
        status: 0,
        message: e.name,
        error: e.parent.sqlMessage
      });
    }
  );
}

/**
 * Actualizar Usuario por Id
 */
async function actualizarUsuario(req, res) {
  // Validar parametros
  if (!req.body) {
    res.status(400).send({
      message: "El cuerpo de la solicitud esta vacio!!!!"
    });
    return;
  }
  try {
    const {
      usuarioId
    } = req.params;

    //Ejecucion metodo
    const resultado = await dbManager.Usuario.update({
      usuarioNombre: req.body.usuarioNombre,
      usuarioApellido: req.body.usuarioApellido,
      usuarioCorreo: req.body.usuarioCorreo,
      usuarioContrasenia: req.body.usuarioContrasenia,
      usuarioEstado: req.body.usuarioEstado,
      usuarioTipo: req.body.usuarioTipo
    }, {
      where: {
        usuarioId: usuarioId
      }
    })
    if (resultado == 1) {
      res.status(200).json({
        message: "Registro Actulizado"
      });
    };
    if (resultado != 1) {
      res.json({
        message: "El Registro no existe en el sistema"
      });
    };
  } catch (e) {
    console.log(e);
    res.status(500).send({
      status: 0,
      message: e.name,
      error: e.parent.sqlMessage
    });
  }
}

/**
 * Elimianr Usuario por Id "Cambio estado I"
 */
async function eliminarUsuario(req, res) {
  // Validar parametros
  if (!req.body) {
    res.status(400).send({
      message: "El cuerpo de la solicitud esta vacio!!!!"
    });
    return;
  }
  try {
    const {usuarioId} = req.params;

    //Ejecucion metodo
    const resultado = await dbManager.Usuario.update({
      usuarioEstado: 'I'
    }, {
      where: {
        usuarioId: usuarioId
      }
    })
    if (resultado == 1) {
      res.status(200).json({
        message: "Regitro Eliminado"
      });
    };
    if (resultado != 1) {
      res.json({
        message: "El Regitro no existe en el sistema"
      });
    };
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: e.name,
      error: e.parent.sqlMessage
    });
  }
}

/* Retonar Usuario por Id*/
async function credencialesUsuario(req, res) {
  try {
    const usuario = await dbManager.Usuario.findOne({
      where: {
        usuarioCorreo: req.body.usuarioCorreo,
        usuarioContrasenia: req.body.usuarioContrasenia
      }
    });
    if (usuario === null) {
      res.json({
        status: 0,
        message: "Correo o Contraseña incorrectas"
      });
    } else {
      res.status(200).json({
        status: 1,
        message: "Correcto",
        usuarioId: usuario.usuarioId,
        usuarioTipo: usuario.usuarioTipo
      });
    }

  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: e.name,
      error: e.parent.sqlMessage
    });
  }
}

async function restaurarContrasena(req, res) {
  try {
    const contraseniaTemporal = "C0r@"+random().toString()+".?";
    const resultado = await dbManager.Usuario.update({
      usuarioContrasenia: contraseniaTemporal
    }, {
      where: {
        usuarioCorreo: req.body.usuarioCorreo,
        usuarioNombre: req.body.usuarioNombre,
        usuarioApellido: req.body.usuarioApellido,
      }
      });
    if (resultado == 1) {
      res.status(200).json({
        status: 1,
        message: contraseniaTemporal
      });
    };
    if (resultado != 1) {
      res.json({
        status: 0,
        message: "El usuario no existe"
      });
    };
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: e.name,
      error: e.parent.sqlMessage
    });
  }
}

function random() {
    return Math.floor((Math.random() * (1000 - 100 + 1)) + 100);
}

exports.retornarUsuarios = retornarUsuarios;
exports.retonarUsuario = retonarUsuario;
exports.crearUsuario = crearUsuario;
exports.actualizarUsuario = actualizarUsuario;
exports.eliminarUsuario = eliminarUsuario;
exports.credencialesUsuario = credencialesUsuario;
exports.restaurarContrasena = restaurarContrasena;
