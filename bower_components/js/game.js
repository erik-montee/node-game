function startGame() {
    $("#name_select_form").remove();	
    $("#canvas").append("<p class='.lead' style='float:left;'>Welcome " + name + "<br> Score : <span id='score'>" + Score + "</span> </p>");
    width = document.getElementById("canvas").offsetWidth * 0.9;
    height = document.getElementById("canvas").offsetHeight * 0.9;
    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
	parent : "canvas",
        physics: {
          default: 'arcade'
        },
        dom: {
          createContainer: true
             },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };
    var game = new Phaser.Game(config);
}

function preload ()
{
    this.load.image('top_bar', '/assests/grey-bar.png');
    this.load.spritesheet('bird', '/assests/redbird_4.png', { frameWidth: 75, frameHeight: 75 });
    this.load.spritesheet('orange_bird', '/assests/orangebird_1.png', { frameWidth: 75, frameHeight: 75 });
    this.load.image('star', '/assests/coin.png');
}

function create ()
{
    scene = this;
    //top = this.physics.add.staticGroup();
    //top.create(0, 0, 'top_bar');
    bird = this.physics.add.sprite(x, y, 'bird');
    //player2 = this.physics.add.sprite(-1000,-1000,'orange_bird');
    bird.setCollideWorldBounds(true);
    //player2.setCollideWorldBounds(true);
    //player2.visible = false;
    star_group = this.physics.add.group();

    stars.forEach(function(star) {
        createStar(star);
    });


    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('bird', { start: 17, end: 32 }),
        frameRate: 20,
        repeat: -1
    });
    this.anims.create({
        key: 'star_turn',
        frames: this.anims.generateFrameNumbers('star', { start: 0, end: 6 }),
        frameRate: 20,
        repeat: -1
    });


    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 16 }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'orange_left',
        frames: this.anims.generateFrameNumbers('orange_bird', { start: 17, end: 32 }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'orange_right',
        frames: this.anims.generateFrameNumbers('orange_bird', { start: 0, end: 16 }),
        frameRate: 20,
        repeat: -1
    });
    bird.anims.play('right', true);
   // player2.anims.play('orange_right', true);
   // stars.anims.play('star_turn', true);
    cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.overlap(bird, star_group, collectStar, null, this);
    

   
}

function update() 
{
    if(cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown ){
	    if (cursors.left.isDown)
	    {
		bird.setVelocityX(-100);
                bird.anims.play('left', true);
	    }
	    if (cursors.right.isDown)
	    {
		bird.setVelocityX(100);
		bird.anims.play('right', true);
	    }
	    if (cursors.up.isDown)
	    {
		bird.setVelocityY(-100);
	    }
	    if (cursors.down.isDown)
	    {
		bird.setVelocityY(100);
	    }
    }
    else
    {
        bird.setVelocityX(0);
	bird.setVelocityY(0);
    }

     var msg = { "name" : name, "x" : Math.ceil(bird.x), "y" : Math.ceil(bird.y) }
     socket.emit('update_location', msg);
     
   // topPlayerText.setText(topPlayer.name + " : " + topPlayer.Score);
}

function createStar (star)
{
    var star = scene.physics.add.sprite(star.x, star.y, 'star');
    star.setDisplaySize(20,20);
    star_group.add(star);
}

function collectStar (player, star)
{
     var msg = { "name" : name, "x" : star.x, "y" : star.y, "star" : star}
     socket.emit('collect_star', msg);
    
}

function removeStar(star)
{
    star_group.children.entries.forEach(function(starObject){
        if (starObject.x == star.x && starObject.y == star.y){ 
            starObject.disableBody(true, true);
        }
    });
}


