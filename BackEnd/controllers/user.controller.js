const dbManager = require ('../database/db.manager');

/**
 * Crear Usuario
 * @param {*} userObject JSON Object with User information
 */
async function crearUsuario (req, res) {
    // Validar parametros
    if (!req.body) {
        res.status(400).send({
          message: "El cuerpo de la solicitud esta vacio!!!!"
        });
        return;
    }

    // Crear objeto
    const newUserObject = {
        username: req.body.username,
        creation_date: req.body.creation_date
    }

    //Ejecucion metodo
    dbManager.User.create(newUserObject).then (
        data => {
            res.send (data);
        }
    ).catch (
        e => {
            console.log(e);
            res.status(500).send({
                message: "Ocurrió un error"
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
        const users = await dbManager.User.findAll ();

        res.json({
                data: users
        });

    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: "Ocurrió un error"
        });
    }
}

/**
 * Retonar Usuario por Id
 */
async function retonarUsuario (req, res){
    try {
        const { idUser } = req.params;

        //Ejecucion metodo
        const user = await dbManager.User.findOne({
            where: {
                idUser: idUser
            }
        });
        res.json(user);

    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: "Ocurrió un error"
        });
    }
}
/**
 * Actualizar Usuario por Id
 */
async function actualizarUsuario (req, res){
  // Validar parametros
  if (!req.body) {
      res.status(400).send({
        message: "El cuerpo de la solicitud esta vacio!!!!"
      });
      return;
  }
  try {
      const { idUser } = req.params;

      //Ejecucion metodo
      const resultado = await dbManager.User.update({
         username: req.body.username,
         creation_date: req.body.creation_date
       },{
         where: {idUser: idUser}
       })
      if(resultado==1)
        {res.status(200).json({
          message: "Usuario Actulizado"
          });
        };
        if(resultado!=1)
        {res.json({
            message: "El Usuario no existe en el sistema"
        });
        };
  } catch (e) {
      console.log(e);
      res.status(500).send({
          message: "Ocurrió un error"
      });
  }
}

/**
 * Eliminar Usuario por Nombre
 */
async function eliminarUsuario (req, res){
  try {
      const { username } = req.params;

      //Ejecucion metodo
      const resultado = await dbManager.User.destroy({
         where: {username: username}
       })
      if(resultado==1)
        {res.status(200).json({
          message: "Usuario Eliminado"
          });
        };
      if(resultado==0)
        {res.json({
          message: "El Post no existe en el sistema"
        });
        };
  } catch (e) {
      console.log(e);
      res.status(500).send({
          message: "Ocurrió un error"
      });
  }
}

/**
 * Eliminar todos los Usuarios
 */
async function eliminarUsuarios (req, res){
  try {
      //Ejecucion metodo
      const resultado = await dbManager.User.destroy({
         where: {}
       })
       if(resultado>=1)
         {res.status(200).json({
           message: "Usuarios Eliminados"
           });
         };
       if(resultado==0)
         {res.json({
           message: "No exiten Usuarios en el sistema"
           });
         };
  } catch (e) {
      console.log(e);
      res.status(500).send({
          message: "Ocurrió un error"
      });
  }
}

/**
 * Reronar todos los Usuario por fecha
 * Ejemeplo parametro: AAAA-MM-DDT00:00:00.000Z
 */
async function retonarUsuariosFecha (req, res){
  try {

      const { creation_date } = req.params;
      //Ejecucion metodo
      const users = await dbManager.User.findAll ({
         where: {creation_date: creation_date}
       });

      res.json({
              data: users
      });

  } catch (e) {
      console.log(e);
      res.status(500).send({
          message: "Ocurrió un error"
      });
  }
}
exports.crearUsuario = crearUsuario;
exports.retornarUsuarios = retornarUsuarios;
exports.retonarUsuario = retonarUsuario;
exports.actualizarUsuario = actualizarUsuario;
exports.eliminarUsuario = eliminarUsuario;
exports.eliminarUsuarios = eliminarUsuarios;
exports.retonarUsuariosFecha = retonarUsuariosFecha;
