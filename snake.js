var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update});

function preload() {

 	game.load.image('ball','assets/body1.png');
    game.load.image('earth', 'assets/scorched_earth.png');
    game.load.image('bullet', 'assets/bullet.png');

}


var snakeHead;
var snakesection = []; //array of sprites that make the snake body sections
var snakePath = [];
var oldPath = []; //arrary of positions(points) that have to be stored for the path the sections follow
var numSnakeSections = 5; //number of snake body sections
var snakeSpacer = 6; //parameter that sets the spacing between sections
var foods = []

function create() {
	land = game.add.tileSprite(0, 0, 4000, 4000, 'earth');

	game.world.setBounds(0, 0, 4000, 4000);

	snakeHead = game.add.sprite(400, 300, 'ball');
	snakeHead.anchor.setTo(0.5, 0.5);
	game.physics.enable(snakeHead, Phaser.Physics.ARCADE);
	snakeHead.body.collideWorldBounds = true;

	cursors = game.input.keyboard.createCursorKeys();

	//  Init snakeSection array//
    for (var i = 1; i <= numSnakeSections-1; i++)
    {
        snakesection[i] = game.add.sprite(400, 300, 'ball');
        snakesection[i].anchor.setTo(0.5, 0.5);
    }
    
    //  Init snakePath array
    for (var i = 0; i <= numSnakeSections * snakeSpacer; i++)
    {
        snakePath[i] = new Phaser.Point(400, 300);
        oldPath[i] = new Phaser.Point(400,300);
    }

    //  make a group of stars//
    foods = game.add.group(); 
    foods.enableBody = true;
    for (var i = 0; i < 50; i++) {
        createfood();
    }

    game.camera.follow(snakeHead);
}

function update() {
	move();
	snakeHead.body.angularVelocity = 0;
	game.physics.arcade.overlap(snakeHead, foods, eat);

	if(cursors.left.isDown)
    {
        snakeHead.body.angularVelocity = -300;
    }else if (cursors.right.isDown)
    {
        snakeHead.body.angularVelocity = 300;
    }
}

function move(){

	//ahead
	snakeHead.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(snakeHead.angle, 200));

	//body copy
	oldPath.unshift(snakePath.pop());
    oldPath.pop();

    var part = new Phaser.Point(snakeHead.x, snakeHead.y);

    snakePath.unshift(part);

    for (var i = 1; i <= numSnakeSections - 1; i++)
    {
        snakesection[i].x = (snakePath[i * snakeSpacer]).x;
        snakesection[i].y = (snakePath[i * snakeSpacer]).y;
    }
}

function createfood() {
	var food = foods.create(Math.random() * 4000, Math.random() * 4000, 'bullet');
	food.body.bounce.y = Math.random();
	food.body.bounce.x = Math.random();
}

function eat(snakeHead, food) {
	food.destroy(); // remove the star that has collided with the player
	createfood();
}