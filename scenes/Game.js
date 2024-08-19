export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  init() {
  }

  preload() { }

  create() {

    //crear paleta
    this.paddle = this.add.rectangle(400, 500, 100, 20, 0x6666ff);
    this.physics.add.existing(this.paddle);
    this.paddle.body.setImmovable(true);
    this.paddle.body.setCollideWorldBounds(true);

    //crear pelota
    this.ball = this.add.circle(400, 300, 10, 0xff6666);
    this.physics.add.existing(this.ball);
    this.ball.body.setCollideWorldBounds(true);
    this.ball.body.setBounce(1, 1);
    this.ball.body.setVelocity(200, 200);

    //crear obstaculo
    this.obstacle = this.add.rectangle(400, 200, 100, 100, 0x66ff66);
    this.physics.add.existing(this.obstacle);
    this.obstacle.body.setImmovable(true);

    //reconocimiento del mouse
    this.pointer = this.input.activePointer;
    this.cursor = this.input.keyboard.createCursorKeys();

    //colision de la pelota con la paleta
    this.physics.add.collider(this.paddle, this.ball, null, null, this);

    //colision de la pelota con el obstaculo
    this.ball.body.onWorldBounds = true;
    this.physics.add.collider(
      this.obstacle,
      this.ball,
      this.handleCollision,
      null,
      this
    );

    //colision de la pelota con el limite inferior
    this.physics.world.on("worldbounds", (body, up, down, left, right) => {
      if (down) {
        this.scene.start("game");
      }
    });
  }

  update() {
    this.paddle.x = this.pointer.x;
    if (this.cursor.right.isDown) {
      this.paddle.x += 10;
    } else if (this.cursor.left.isDown) {
      this.paddle.x -= 10;
    }
  }

  handleCollision = (obstacle, ball) => {
    obstacle.destroy();
  };
}