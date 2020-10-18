var express = require('express');
var router = express.Router();
const grupoController = require ('../controllers/grupo.controller');


/*GET RETORNAR USUARIOS*/
router.get('/', grupoController.retornarGrupos);

/*GET RETORNAR USUARIO POR ID*/
router.get('/:grupoId', grupoController.retonarGrupo);


/* POST CREAR USUARIO */
router.post('/', grupoController.crearGrupo);

/* PUT ACTULIZAR USUARIO */
router.put('/:grupoId', grupoController.actualizarGrupo);

/* DELETE ELIMINAR USUARIO CAMBIO ESTADO*/
router.delete('/:grupoId', grupoController.eliminarGrupo);


module.exports = router;
