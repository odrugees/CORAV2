var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var usuarioRouter = require('./routes/usuario.route');
var carreraRouter = require('./routes/carreraObservacion.route');
var grupoRouter = require('./routes/grupo.route');
var correoRouter = require('./routes/envioCorreo.route');

var app = express();

const dbManager = require('./database/db.manager');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuario', usuarioRouter);
app.use('/carreraObservacion', carreraRouter);
app.use('/grupo', grupoRouter);
app.use('/correo', correoRouter);

dbManager.sequelizeConnection.authenticate()
  .then(() => {
    console.log('****Connection has been established successfully.****');
    dbManager.sequelizeConnection.sync().then(() => {
        console.log("Database Synced");
      });

  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;
