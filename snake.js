var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update});

function preload() {

 	game.load.image('ball','assets/body1.png');
    game.load.image('earth', 'assets/scorched_earth.png');
    game.load.image('bullet', 'assets/bullet.png');

}


var snakeHead;

function create() {
	land = game.add.tileSprite(0, 0, 800, 600, 'earth');

	snakeHead = game.add.sprite(400, 300, 'ball');
	game.physics.enable(snakeHead, Phaser.Physics.ARCADE);

}

function update() {
	move();
}

function move(){

	//change way
	snakeHead.rotation = game.physics.arcade.angleToPointer(snakeHead)
	//ahead
	snakeHead.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(snakeHead.angle, 150));

}