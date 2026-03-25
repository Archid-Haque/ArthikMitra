import Phaser from "phaser";

const LANES = [90, 180, 270];

export default class SubwayScene extends Phaser.Scene {
  constructor() {
    super("SubwayScene");
  }

  init(data) {
    this.setScore = data.setScore;
    this.setMoney = data.setMoney;
    this.setGameOver = data.setGameOver;
  }

  create() {
    this.playerLane = 1;
    this.speed = 5;
    this.isJumping = false;

    // BACKGROUND
    this.add.rectangle(180, 270, 360, 540, 0x0b1220);

    // ROAD
    this.add.rectangle(180, 270, 360, 540, 0x111827);

    // MOVING LINES
    this.lines = [];
    for (let i = 0; i < 10; i++) {
      const line = this.add.rectangle(180, i * 60, 4, 40, 0xffffff);
      this.lines.push(line);
    }

    // PLAYER
    this.player = this.add.rectangle(LANES[1], 450, 50, 60, 0x3b82f6);

    // ARRAYS (no physics dependency)
    this.coins = [];
    this.obstacles = [];

    // CONTROLS
    this.cursors = this.input.keyboard.createCursorKeys();

    // 🔥 FORCE SPAWN LOOP
    this.time.addEvent({
      delay: 400,
      loop: true,
      callback: this.spawnObjects,
      callbackScope: this
    });
  }

  spawnObjects() {
    const lane = Phaser.Math.Between(0, 2);

    // 💰 COIN (ALWAYS SPAWN)
    const coin = this.add.circle(LANES[lane], -20, 12, 0xffd700);
    this.coins.push(coin);

    // 🚧 OBSTACLE (ALWAYS SPAWN)
    const lane2 = Phaser.Math.Between(0, 2);
    const obs = this.add.rectangle(LANES[lane2], -40, 50, 50, 0xef4444);
    this.obstacles.push(obs);
  }

  update() {
    // ROAD MOVEMENT
    this.lines.forEach((line) => {
      line.y += this.speed;
      if (line.y > 600) line.y = 0;
    });

    // PLAYER MOVEMENT
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
      this.playerLane = Math.max(0, this.playerLane - 1);
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
      this.playerLane = Math.min(2, this.playerLane + 1);
    }

    // JUMP
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && !this.isJumping) {
      this.isJumping = true;

      this.tweens.add({
        targets: this.player,
        y: 350,
        duration: 250,
        yoyo: true,
        onComplete: () => (this.isJumping = false)
      });
    }

    this.player.x = Phaser.Math.Linear(
      this.player.x,
      LANES[this.playerLane],
      0.3
    );

    // 💰 MOVE COINS
    this.coins.forEach((coin, i) => {
      coin.y += this.speed + 2;

      // collision
      if (
        coin.y > this.player.y &&
        coin.y < this.player.y + 60 &&
        Math.abs(coin.x - this.player.x) < 30
      ) {
        coin.destroy();
        this.coins.splice(i, 1);
        this.setScore((s) => s + 10);
        this.setMoney((m) => m + 100);
      }

      if (coin.y > 600) {
        coin.destroy();
        this.coins.splice(i, 1);
      }
    });

    // 🚧 MOVE OBSTACLES
    this.obstacles.forEach((obs, i) => {
      obs.y += this.speed + 3;

      if (
        !this.isJumping &&
        obs.y > this.player.y &&
        obs.y < this.player.y + 60 &&
        Math.abs(obs.x - this.player.x) < 30
      ) {
        this.setGameOver(true);
        this.scene.pause();
      }

      if (obs.y > 600) {
        obs.destroy();
        this.obstacles.splice(i, 1);
      }
    });
  }
}