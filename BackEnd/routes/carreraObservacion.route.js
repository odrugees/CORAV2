var express = require('express');
var router = express.Router();
const carreraObservacionController = require ('../controllers/carreraObservacion.controller');

/*GET RETORNAR CARRERAS OBSERVACION*/
router.get('/', carreraObservacionController.retornarCarreras);

/*GET RETORNAR CARRERA DE OBSERVACION POR ID*/
router.get('/:carreraObservacionId', carreraObservacionController.retonarCarrera);

/* POST CREAR CARRERA DE OBSERVACION */
router.post('/', carreraObservacionController.crearCarrera);

/* PUT ACTULIZAR CARRERA DE OBSERVACION */
router.put('/:carreraObservacionId', carreraObservacionController.actualizarCarrera);

/* DELETE ELIMINAR CARRERA DE OBSERVACION CAMBIO ESTADO*/
router.delete('/:carreraObservacionId', carreraObservacionController.eliminarCarrera);


module.exports = router;
