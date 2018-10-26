export class GameScene extends Phaser.Scene {

  private ship: Phaser.Physics.Arcade.Image;
  private boxes: Phaser.Physics.Arcade.StaticGroup;
  private ball: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  preload() {
    this.load.spritesheet('ball', 'assets/sprites/ball.png', { frameWidth: 100, frameHeight: 100, endFrame: 648 });
    this.load.image('box_red', 'assets/sprites/box_red.png');
    this.load.image('ship', 'assets/sprites/ship.png');
  }

  create() {
    this.ship = this.physics.add.image(400, 500, 'ship');
    this.ship.body.immovable = true;

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
      repeat: -1
    });

    this.boxes = this.physics.add.staticGroup();
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 7; j++) {
        this.boxes.create((30 * i) + 15, (30 * j) + 15, 'box_red')
      }
    }

    this.ball = this.physics.add.sprite(400, 400, 'ball');
    this.ball.body.bounce.set(1);
    this.ball.setCollideWorldBounds(true);
    this.ball.setDisplaySize(25, 25);
    this.ball.setVelocityX(0);
    this.ball.setVelocityY(300);
    this.ball.anims.play('ball-rotate-right');

    this.physics.add.overlap(this.ball, this.boxes, this.destroyBox, null, this);
    this.physics.add.overlap(this.ball, this.ship, this.shipBallCollide, null, this);
  }

  update() {
    this.ship.x = this.input.mousePointer.x
  }

  private shipBallCollide(ball: Phaser.Physics.Arcade.Sprite, ship: Phaser.Physics.Arcade.Image) {
    let ballLeft = ball.x - ball.width;
    let ballRight = ball.x + ball.width;
    let shipLeft = ship.x - ship.width;
    let shipRight = ship.x + ship.width;

    ball.setVelocityY((ball.body.velocity.y * -1) - 100);
    if (ballLeft < shipLeft) {
      ball.setVelocityX(ball.body.velocity.x - 30);
    }
    if (ballRight > shipRight) {
      ball.setVelocityX(ball.body.velocity.x + 30);
    }
  }

  private destroyBox(ball: Phaser.Physics.Arcade.Sprite, box: Phaser.Physics.Arcade.Image) {
    box.disableBody(true, true);
  }
}