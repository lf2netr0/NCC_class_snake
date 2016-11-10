var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update});

function preload() {

 	game.load.image('ball','assets/body1.png');
    game.load.image('earth', 'assets/scorched_earth.png');
    game.load.image('bullet', 'assets/bullet.png');

}


var snakeHead;
var snakesection = new Array(); //array of sprites that make the snake body sections
var snakePath = new Array();
var oldPath = []; //arrary of positions(points) that have to be stored for the path the sections follow
var numSnakeSections = 5; //number of snake body sections
var snakeSpacer = 12; //parameter that sets the spacing between sections

function create() {
	land = game.add.tileSprite(0, 0, 800, 600, 'earth');

	snakeHead = game.add.sprite(400, 300, 'ball');
	game.physics.enable(snakeHead, Phaser.Physics.ARCADE);

	//  Init snakeSection array//
    for (var i = 1; i <= numSnakeSections-1; i++)
    {
        snakesection[i] = game.add.sprite(400, 300, 'ball');
        game.physics.enable(snakesection[i], Phaser.Physics.ARCADE);
        snakesection[i].anchor.setTo(0.5, 0.5);
    }
    
    //  Init snakePath array
    for (var i = 0; i <= numSnakeSections * snakeSpacer; i++)
    {
        snakePath[i] = new Phaser.Point(400, 300);
        oldPath[i] = new Phaser.Point(400,300);
    }
}

function update() {
	move();
}

function move(){

	//change way
	snakeHead.rotation = game.physics.arcade.angleToPointer(snakeHead);
	//ahead
	snakeHead.body.velocity.copyFrom(game.physics.arcade.velocityFromRotation(snakeHead.rotation, 150));

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