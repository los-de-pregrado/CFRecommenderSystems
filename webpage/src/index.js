// Archivo nodejs-express para inicializar servidor

// Variables y constantes
var createError = require('http-errors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
var indexRouter = require('./routes/index');
const app = express();
const Busboy = require('busboy');
const fs = require('fs');

// Settings 

app.set('port', process.env.PORT || 8082);
app.set('host', process.env.HOST || 'localhost');

// Middlewares
app.use(morgan('tiny'));
app.use(express.json());

// Routes
app.use('/', indexRouter);

//Receive uploaded voices
app.post('/upload', function(req, res) {
  var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      var saveTo = path.join(__dirname+'/public/ffmpeg/voices/', filename);
      console.log('Uploading: ' + saveTo);
      file.pipe(fs.createWriteStream(saveTo));
    });
    busboy.on('finish', function() {
      console.log('Upload complete');
      res.writeHead(200, { 'Connection': 'close' });
      res.end("That's all folks!");
    });
    return req.pipe(busboy);
});

//Receive images for banner
app.post('/banner', function(req, res) {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      var saveTo = path.join(__dirname+'/public/imagesbanner/', filename);
      console.log('Uploading: ' + saveTo);
      file.pipe(fs.createWriteStream(saveTo));
    });
    busboy.on('finish', function() {
      console.log('Upload complete');
      res.writeHead(200, { 'Connection': 'close' });
      res.end("That's all folks!");
    });
    return req.pipe(busboy);
});

//Static files

app.use(express.static(path.join(__dirname,'public')));
app.use('/:anything',express.static(path.join(__dirname,'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(app.get('port'),app.get('host'),()=>{
  console.log('Server on port '+app.get('port') + " on host " + app.get('host'));
})
