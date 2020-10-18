const dbManager = require ('../database/db.manager');

/**Retonar todas las Carreras de Observacion*/
async function retornarCarreras (req, res){
    try {
        //Ejecucion metodo
        const carreras = await dbManager.CarreraObservacion.findAll ({
          where: {
              carreraObservacionEstado: 'A',
          }
        });

        res.json(carreras);

    } catch (e) {
        console.log(e);
        res.status(500).send({
          message: e.name,
          error: e.parent.sqlMessage
        });
    }
}
/* Retonar Carrera por Id*/
async function retonarCarrera (req, res){
    try {
        const { carreraObservacionId } = req.params;

        //Ejecucion metodo
        const carrera = await dbManager.CarreraObservacion.findOne({
            where: {
                carreraObservacionId: carreraObservacionId
            }
        });
        res.json(carrera);

    } catch (e) {
        console.log(e);
        res.status(500).send({
          message: e.name,
          error: e.parent.sqlMessage
        });
    }
}
/* Crear Carrera */
async function crearCarrera (req, res) {
    // Validar parametros
    if (!req.body) {
        res.status(400).send({
          message: "El cuerpo de la solicitud esta vacio!!!!"
        });
        return;
    }

    // Crear objeto
    const nuevaCarrera = {
        carreraObservacionNombre: req.body.carreraObservacionNombre,
        carreraObservacionDescripcion: req.body.carreraObservacionDescripcion,
        carreraObservacionCodigoIngreso: req.body.carreraObservacionCodigoIngreso,
        carreraObservacionIntegrantesGrupo: req.body.carreraObservacionIntegrantesGrupo,
        carreraObservacionEstado: 'A',
        usuarioId: req.body.usuarioId

    }

    //Ejecucion metodo
    dbManager.CarreraObservacion.create(nuevaCarrera).then (
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
/*Actualizar Carrera por Id*/
async function actualizarCarrera (req, res){
  // Validar parametros
  if (!req.body) {
      res.status(400).send({
        message: "El cuerpo de la solicitud esta vacio!!!!"
      });
      return;
  }
  try {
      const { carreraObservacionId } = req.params;

      //Ejecucion metodo
      const resultado = await dbManager.CarreraObservacion.update({
        carreraObservacionNombre: req.body.carreraObservacionNombre,
        carreraObservacionDescripcion: req.body.carreraObservacionDescripcion,
        carreraObservacionCodigoIngreso: req.body.carreraObservacionCodigoIngreso,
        carreraObservacionIntegrantesGrupo: req.body.carreraObservacionIntegrantesGrupo,
        carreraObservacionEstado: req.body.carreraObservacionEstado,
        usuarioId: req.body.usuarioId
       },{
         where: {carreraObservacionId: carreraObservacionId}
       })
      if(resultado==1)
        {res.status(200).json({
          message: "Registro Actulizado"
          });
        };
        if(resultado!=1)
        {res.json({
            message: "El resgistro no existe en el sistema"
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
 * Elimianr Usuario por Id "Cambio estado I"
 */
async function eliminarCarrera (req, res){
  // Validar parametros
  if (!req.body) {
      res.status(400).send({
        message: "El cuerpo de la solicitud esta vacio!!!!"
      });
      return;
  }
  try {
      const { carreraObservacionId } = req.params;

      //Ejecucion metodo
      const resultado = await dbManager.CarreraObservacion.update({
        carreraObservacionEstado: 'I'
       },{
         where: {carreraObservacionId: carreraObservacionId}
       })
      if(resultado==1)
        {res.status(200).json({
          message: "Regitro Eliminado"
          });
        };
        if(resultado!=1)
        {res.json({
            message: "El registro no existe en el sistema"
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

exports.retornarCarreras = retornarCarreras;
exports.retonarCarrera = retonarCarrera;
exports.crearCarrera = crearCarrera;
exports.actualizarCarrera = actualizarCarrera;
exports.eliminarCarrera = eliminarCarrera;
