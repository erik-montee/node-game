var name;
var scene;
var x;
var y;
var Score = 0;
var scoreText;
var topPlayerText;
var bird;
var cursors;
var top;
var stars;
var star_group;
var timer = 0;
var socket = io()
var player2;
var topPlayer = { "name" : "Jeoff", "Score" : "10"};
$(document).on("click", "#name_select", function (event) {
     event.preventDefault();
     name = $('#Name').val();
     socket.emit('name_select', name);
});

socket.on('setup', function(msg){
      x = msg.x;
console.log(x);
      y = msg.y;
      toplPlayer = msg.topPlayer;
      stars = msg.stars;
      startGame();
});

socket.on('update_field', function(msg){
    createStar(msg);
});

socket.on('remove_star', function(msg){
    removeStar(msg);
});

socket.on('update_score', function(msg){
console.log(msg);
    Score = msg.score;
$('#score').text(Score);
});

