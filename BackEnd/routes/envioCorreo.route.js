var express = require('express');
var router = express.Router();
const envioCorreoController = require ('../controllers/envioCorreo.controller');

/* POST ENVIAR CORREO */
router.post('/', envioCorreoController.enviarCorreo);

module.exports = router;
