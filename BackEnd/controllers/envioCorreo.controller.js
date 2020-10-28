var nodemailer = require('nodemailer');
// email sender function

function enviarCorreo(req, res) {
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'oscar.ruge.e@gmail.com',
        pass: 'zgyatchkjpzmjxou',
      }
    });
    // Definimos el email
    var mailOptions = {
      from: '"CORA " <oscar.ruge.e@gmail.com>', // sender address,
      to: req.body.destinatario,
      subject: req.body.asunto,
      text: req.body.texto,
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        res.status(500).json({
          status: 0,
          message: error
        });
      } else {
        res.status(200).json({
          status: 1,
          message: req.body
        });
      }
    });
  }
  exports.enviarCorreo = enviarCorreo;
