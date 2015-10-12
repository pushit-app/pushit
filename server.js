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
  io.sockets.emit(params.channel, { event: params.event, data: req.body });
  res.status(200).json({ event: 'sent' })
});

app.use(express.static(__dirname + '/public'));

http.listen(process.env.PORT || 6969, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

var io = require('socket.io').listen(http);
