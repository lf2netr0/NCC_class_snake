var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update});

function preload() {

    game.load.image('ball','assets/sprites/body1.png');
    game.load.image('earth', 'assets/sprites/scorched_earth.png');
    game.load.image('bullet', 'assets/sprites/bullet.png');

}

function create() {

}

function update() {

}