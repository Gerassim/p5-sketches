class Wall {
  static get width() {
    return 75
  };

  constructor(scene) {
    this.verticalGap = 100;
    this.gapPosition = random(this.verticalGap, scene.height - this.verticalGap);
    this.scene = scene;
  }

  draw() {
    rect(this.getBeginX(), 0, Wall.width, this.getUpGapY());
    rect(this.getBeginX(), this.gapPosition + this.verticalGap / 2, Wall.width, this.scene.height - this.getDownGapY());
  }

  getUpGapY() {
    return this.gapPosition - this.verticalGap / 2;
  }

  getDownGapY() {
    return this.gapPosition + this.verticalGap / 2;
  }

  getBeginX() {
    return this.x - Wall.width / 2;
  }

  getEndX() {
    return this.getBeginX() + Wall.width;
  }

  update() {
    this.x -= scene.wallSpeed;
  }

  collision(bird) {
    if (Bird.x > this.getBeginX() && Bird.x < this.getEndX()) {
      // bird.color = Bird.inPipeColor;
      if (bird.y + Bird.d / 2 > this.getDownGapY() || bird.y - Bird.d / 2 < this.getUpGapY()) {
        bird.color = Bird.collisionColor;
        return true;
      }
    } else {
      bird.color = Bird.normalColor;
    }

    return false;
  }
}