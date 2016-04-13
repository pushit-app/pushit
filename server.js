var newrelic  = require('newrelic');

var express   = require('express'),
app           = express(),
bodyParser    = require('body-parser'),
http          = require('http').Server(app),
io            = require('socket.io')(http),
rollbar       = require('rollbar');

app.use(rollbar.errorHandler(process.env.ROLLBAR_API_KEY));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/publish/:channel/:event/', function(req, res){
  var params = req.params;
  io.sockets.emit(params.channel, { event: params.event, data: req.body });
  res.status(200).json({ event: 'sent' })
});

app.use(express.static(__dirname + '/public'));

http.listen(process.env.PORT || 8080, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
