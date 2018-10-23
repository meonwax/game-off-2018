/// <reference path="phaser.d.ts"/>

import "phaser";
import { Demo } from "./demo";

const config: GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 550,
  parent: "game",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var cursors;
var ball;
var boxes;
var ship;

function preload() {
  this.load.spritesheet('ball', 'assets/sprites/ball.png', { frameWidth: 100, frameHeight: 100, endFrame: 648 });
  this.load.image('box_red', 'assets/sprites/box_red.png');
  this.load.image('ship', 'assets/sprites/ship.png');
}

function create() {
  cursors = this.input.keyboard.createCursorKeys();
   ship = this.physics.add.image(400,500, 'ship');
   ship.body.immovable = true;

  this.anims.create({
    key: 'ball-rotate-right',
    frames: this.anims.generateFrameNumbers('ball', { start: 0, end: 35, first: 36 }),
    frameRate: 20,
    repeat: -1
  });

  this.anims.create({
    key: 'ball-rotate-left',
    frames: this.anims.generateFrameNumbers('ball', { start: 0, end: 35, first: 36 }),
    frameRate: 20,
    repeat: -1,
    isReverse: true
  });

  boxes = this.physics.add.staticGroup();
  for(var i = 0; i < 30; i++) {
    for(var j = 0; j < 7; j++) {
      boxes.create((30 * i) + 15, (30 * j) + 15, 'box_red')
    }    
  }

  ball = this.physics.add.sprite(400, 400, 'ball');
  ball.body.bounce.set(1);
  ball.setCollideWorldBounds(true);
  ball.setDisplaySize(25,25);
  ball.setVelocityX(0);
  ball.setVelocityY(300);
  ball.anims.play('ball-rotate-right');

  this.physics.add.overlap(ball, boxes, destroyBox, null, this);
  this.physics.add.overlap(ball, ship, shipBallCollide, null, this);
}

function update ()
{
  ship.x = this.input.mousePointer.x
}

function shipBallCollide(ball, ship) {
  var ballLeft = ball.x - ball.width;
  var ballRight = ball.x + ball.width;
  var shipLeft = ship.x - ship.width;
  var shipRight = ship.x + ship.width;
  
  ball.setVelocityY((ball.body.velocity.y * -1) - 100);
  if(ballLeft < shipLeft) {
    ball.setVelocityX(ball.body.velocity.x - 30);
  }
  if(ballRight > shipRight) {
    ball.setVelocityX(ball.body.velocity.x + 30);
  }
}

function destroyBox(ball, box) {
  box.disableBody(true,true);
}

new Demo(config);
