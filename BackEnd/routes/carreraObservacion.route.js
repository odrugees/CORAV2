var express = require('express');
var router = express.Router();
const carreraObservacionController = require ('../controllers/carreraObservacion.controller');

/* POST new users listing. */
router.post('/', carreraObservacionController.crearCarrera);
/**
 * GET Route to list all users
 */
router.get('/', carreraObservacionController.retornarCarreras);

module.exports = router;
