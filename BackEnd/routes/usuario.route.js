var express = require('express');
var router = express.Router();
const usuarioController = require ('../controllers/usuario.controller');


/*GET RETORNAR USUARIOS*/
router.get('/', usuarioController.retornarUsuarios);

/*GET RETORNAR USUARIO POR ID*/
router.get('/:usuarioId', usuarioController.retonarUsuario);

/* POST CREAR USUARIO */
router.post('/', usuarioController.crearUsuario);

/* PUT ACTULIZAR USUARIO */
router.put('/:usuarioId', usuarioController.actualizarUsuario);

/* DELETE ELIMINAR USUARIO CAMBIO ESTADO*/
router.delete('/:usuarioId', usuarioController.eliminarUsuario);

/* DELETE ELIMINAR USUARIO CAMBIO ESTADO*/
router.post('/credenciales/', usuarioController.credencialesUsuario);

router.post('/restaurarContrasena/', usuarioController.restaurarContrasena);


module.exports = router;
