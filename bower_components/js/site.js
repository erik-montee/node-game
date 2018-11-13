var name;
var x;
var y;
var Score = 0;
var scoreText;
var topPlayerText;
var bird;
var cursors;
var top;
var stars;
var timer = 0;
var socket = io()
var player2;
var topPlayer = { "name" : "Jeoff", "Score" : "10"};
$(document).on("click", "#name_select", function (event) {
     name = $('#Name').val();
     socket.emit('name_select', name);
});

socket.on('setup', function(msg){
      x = msg.x;
console.log(x);
      y = msg.y;
      startGame();
});

/*socket.on('update_field', function(msg){
      player2.x = msg.x;
      player2.y = msg.y;
});*/

