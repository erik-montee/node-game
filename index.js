var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, 'bower_components')));
var http = require('http').Server(app);
var io = require('socket.io')(http);
var connections = 0;
var players = {};

var stars = [{"x" : 100, "y" : 500},{"x" : 300, "y" : 200}];


app.get('/game', function(req, res){
  res.sendFile(__dirname + '/html/index.html');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/html/home.html');
});

app.get('/Coding', function(req, res){
  res.sendFile(__dirname + '/html/Coding.html');
});

app.get('/Maze', function(req, res){
  res.sendFile(__dirname + '/html/maze.html');
});

io.on('connection', function(socket){


/**
   Endpoint for socket to start the game
**/
  socket.on('name_select', function(msg){
    console.log('message: ' + msg);
    console.log(connections);
    var x = Math.ceil(Math.random() * 800);
    var y = Math.ceil(Math.random() * 600);
    players[msg] = 0;
    var msg1 = {"x" : x, "y" : y, "stars" : stars, "topPlayer" : "{'name' : 'stuff', 'score' : '10'}"};
    socket.emit('setup', msg1);
  });


/**
   Endpoint for socket to update the users location  (May not be needed for current expectation)
**/
  socket.on('update_location', function(msg){
    //console.log(locations);
  });

/**
  Endpoint for socket to remove the star from all fields plus add points to there score
**/
  socket.on('collect_star', function(msg){
      var i = 0;
      stars.forEach(function(star) {
          if(star.x == msg.star.x && star.y == msg.star.y){
console.log(players[msg.name]);
          players[msg.name] = players[msg.name] + 10;
          msg1 = {"score" : players[msg.name]};
          socket.emit('update_score', msg1);
          io.emit('remove_star',msg.star);
          stars.splice(i,1);
          }
          i++;
      });
  });

});
setInterval(function(){ 
    if(stars.length < 10){
    var x = Math.ceil(Math.random() * 800);
    var y = Math.ceil(Math.random() * 600);
    var similar = false;
    stars.forEach(function(star){
        if ( Math.abs(x - star.x) < 30 && Math.abs(y - star.y) < 30){
            similar = true;
        }
    });
    if(similar == false) {
        var msg = {"x" : x, "y" : y };
        stars.push(msg);
        io.emit("update_field", msg);
    }
    }	
}, 5000);

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



