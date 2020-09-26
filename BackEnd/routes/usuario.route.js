var express = require('express');
var router = express.Router();
const usuarioController = require ('../controllers/usuario.controller');

/* POST new users listing. */
router.post('/', usuarioController.crearUsuario);
/**
 * GET Route to list all users
 */
router.get('/', usuarioController.retornarUsuarios);

module.exports = router;
