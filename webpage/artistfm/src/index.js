// Archivo nodejs-express para inicializar servidor

// Variables y constantes
var createError = require('http-errors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
var indexRouter = require('./routes/index');
//const batchProcess = require('./public/ffmpeg/batch');
const app = express();
const Busboy = require('busboy');
const fs = require('fs');

// Settings

app.set('port', process.env.PORT || 8082);
app.set('host', process.env.HOST || '0.0.0.0');

// Middlewares
app.use(morgan('tiny'));
app.use(express.json());

// Routes
app.use('/', indexRouter);

//Static files

app.use(express.static(path.join(__dirname,'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(app.get('port'),app.get('host'),()=>{
  console.log('Server on port '+app.get('port') + " on host " + app.get('host'));
})
