var express = require('express'),
app         = express(),
bodyParser  = require('body-parser'),
http        = require('http').Server(app),
multer      = require('multer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/publish/:channel/:event/', function(req, res){
  var params = req.params;
  var result = io.sockets.emit(params.channel, { event: params.event, data: req.body });
});

app.use(express.static(__dirname + '/public'));
http.listen(8080);

var io = require('socket.io').listen(http);
