var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, 'bower_components')));
var http = require('http').Server(app);
var io = require('socket.io')(http);
var connections = 0;
var locations= {};


app.get('/', function(req, res){
  res.sendFile(__dirname + '/html/index.html');
});

/**io.on('connection', function(socket){
  console.log('a user connected');
  var width = Math.random() * 800;
  var height = Math.random() * 600;
  socket.emit("setup", '"x" : 300, "y" : 200');

});**/

io.on('connection', function(socket){
  socket.on('name_select', function(msg){
    console.log('message: ' + msg);
    console.log(connections);
    var x = Math.ceil(Math.random() * 800);
    var y = Math.ceil(Math.random() * 600);
    var msg1 = {"x" : x, "y" : y}
    socket.emit('setup', msg1);
console.log(msg1);
  });

  socket.on('update_location', function(msg){
    console.log('message: ' + msg);
    locations[msg.name] = msg;
    //console.log(locations);
  });

});

setInterval(function(){ 
    io.emit("update_field",locations);

}, 500);

io.on('disconnect', function(socket){
  socket.on('name_select', function(msg){
    console.log('message: ' + msg);
    connections--;
    console.log(connections);
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});



