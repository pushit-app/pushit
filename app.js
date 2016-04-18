require('dotenv').load();

var newrelic  = require('newrelic');

var express   = require('express'),
app           = express(),
bodyParser    = require('body-parser'),
io            = require('socket.io')(),
rollbar       = require('rollbar');

app.io = io;

app.use(rollbar.errorHandler(process.env.ROLLBAR_API_KEY));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/publish/:channel/:event/', function(req, res){
  var params = req.params;
  console.log({ channel: params.channel, event: params.event, data: req.body })
  io.sockets.emit(params.channel, { event: params.event, data: req.body });
  res.status(200).json({ success: true, event: 'sent' })
});

app.use(express.static(__dirname + '/public'));

module.exports = app;
