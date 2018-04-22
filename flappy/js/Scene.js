class Scene {

  static get g() { return 0.3 };

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.walls = new WallsCollection(this, this.width / 2);
    this.wallSpeed = 3;
    this.bird = new Bird(this);
    this.isGameRunning = true;
    this.generateInitialWalls();
  }

  draw() {
    this.walls.draw();
    this.bird.draw();
  }

  reset() {
    this.generateInitialWalls();
    this.isGameRunning = true;
    this.bird.reset();
  }

  generateInitialWalls() {
    this.walls.walls = [];
    do {
      this.walls.addWall(new Wall(this))
    } while (this.walls.getLastWall().x < width);
  }

  update() {
    this.walls.update();
    if (this.bird.y > height || this.walls.getFirstWall().collision(this.bird)) {
      noLoop();
      this.isGameRunning = false;
      background('#e82c0b');
      textSize(32);
      // rectMode(CENTER);
      textAlign(CENTER, CENTER);
      text('Game Over', this.width / 2, this.height / 2);
      text('Press space to retry', this.width / 2, this.height / 2 + 50);
    }
    this.bird.update();
  }
}