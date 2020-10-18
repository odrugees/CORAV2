const dbManager = require ('../database/db.manager');

/**
 * Retonar todos los Grupos
 */
async function retornarGrupos(req, res){
    try {
        //Ejecucion metodo
        const grupos = await dbManager.Grupo.findAll ({
          where: {
              grupoEstado: 'A',
          }
        });

        res.json(grupos);

    } catch (e) {
        console.log(e);
        res.status(500).send({
          message: e.name,
          error: e.parent.sqlMessage
        });
    }
}

/* Retonar Grupo por Id*/
async function retonarGrupo (req, res){
    try {
        const { grupoId } = req.params;

        //Ejecucion metodo
        const usuario = await dbManager.Grupo.findOne({
            where: {
                grupoId: grupoId
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
 * Crear Grupo
 */
async function crearGrupo (req, res) {
    // Validar parametros
    if (!req.body) {
        res.status(400).send({
          message: "El cuerpo de la solicitud esta vacio!!!!"
        });
        return;
    }
    // Crear objeto
    const nuevoGrupo = {
        grupoNombre: req.body.grupoNombre,
        grupoEstado: "A",
        carreraObservacionId: req.body.carreraObservacionId
    }

    //Ejecucion metodo
    dbManager.Grupo.create(nuevoGrupo).then (
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
 * Actualizar Grupo por Id
 */
async function actualizarGrupo (req, res){
  // Validar parametros
  if (!req.body) {
      res.status(400).send({
        message: "El cuerpo de la solicitud esta vacio!!!!"
      });
      return;
  }
  try {
      const { grupoId } = req.params;

      //Ejecucion metodo
      const resultado = await dbManager.Grupo.update({
        grupoNombre: req.body.grupoNombre,
        grupoEstado:  req.body.grupoEstado,
        carreraObservacionId: req.body.carreraObservacionId
       },{
         where: {grupoId: grupoId}
       })
      if(resultado==1)
        {res.status(200).json({
          message: "Registro Actulizado"
          });
        };
        if(resultado!=1)
        {res.json({
            message: "El Registro no existe en el sistema"
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

/**
 * Elimianr Grupo por Id "Cambio estado I"
 */
async function eliminarGrupo (req, res){
  // Validar parametros
  if (!req.body) {
      res.status(400).send({
        message: "El cuerpo de la solicitud esta vacio!!!!"
      });
      return;
  }
  try {
      const { grupoId } = req.params;

      //Ejecucion metodo
      const resultado = await dbManager.Grupo.update({
        grupoEstado: 'I'
       },{
         where: {grupoId: grupoId}
       })
      if(resultado==1)
        {res.status(200).json({
          message: "Regitro Eliminado"
          });
        };
        if(resultado!=1)
        {res.json({
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

exports.retornarGrupos = retornarGrupos;
exports.retonarGrupo = retonarGrupo;
exports.crearGrupo = crearGrupo;
exports.actualizarGrupo = actualizarGrupo;
exports.eliminarGrupo = eliminarGrupo;
