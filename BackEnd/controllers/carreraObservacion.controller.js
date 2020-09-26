const dbManager = require ('../database/db.manager');

/**
 * Crear Usuario
 */
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
        carreraObservacionEstado: req.body.carreraObservacionEstado,
        usuarioTipo: req.body.usuarioTipo,
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
/**
 * Retonar todos los Usuario
 */
async function retornarCarreras (req, res){
    try {
        //Ejecucion metodo
        const carreras = await dbManager.CarreraObservacion.findAll ();

        res.json({
                data: carreras
        });

    } catch (e) {
        console.log(e);
        res.status(500).send({
          message: e.name,
          error: e.parent.sqlMessage
        });
    }
}
exports.crearCarrera = crearCarrera;
exports.retornarCarreras = retornarCarreras;
