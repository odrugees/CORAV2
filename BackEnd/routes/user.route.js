var express = require('express');
var router = express.Router();
const userController = require ('../controllers/user.controller');

/* POST new users listing. */
router.post('/', userController.crearUsuario);
/**
 * GET Route to list all users
 */
router.get('/', userController.retornarUsuarios);
/**
 * GET Route to find user by id
 */
router.get('/:idUser', userController.retonarUsuario);
/**
 * PUT Route to update an user by id
 */
router.put ('/:idUser',userController.actualizarUsuario);
/**
 * DELETE Route to delete an user by username
 */
router.delete ('/:username',userController.eliminarUsuario);
/**
 * DELETE Route to delete all users
 */
router.delete ('/',userController.eliminarUsuarios);
/**
 * GET list all users by Created Date
 */
router.get ('/createdate/:creation_date',userController.retonarUsuariosFecha);

module.exports = router;
