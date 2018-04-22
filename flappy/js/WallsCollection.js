class WallsCollection {
  constructor(scene, shift) {
    this.wallsGap = 200;
    this.walls = [];
    this.scene = scene;
    this.shift = shift;
  }

  addWall(wall) {
    let lastWall = this.getLastWall();

    if(lastWall) {
      wall.x = lastWall.x + this.wallsGap;
    } else {
      wall.x = this.shift;
    }
    this.walls.push(wall);
  }

  getLastWall() {
    return this.walls[this.walls.length - 1];
  }

  getFirstWall() {
    return this.walls[0];
  }

  draw() {
    for (let wall of this.walls) {
      wall.draw();
    }
  }

  update() {
    if(this.getLastWall().x < this.scene.width) {
      this.addWall(new Wall(this.scene));
    }

    if(this.walls[0].x < - Wall.width / 2) {
      this.walls.shift();
    }

    for (let wall of this.walls) {
      wall.update();
    }
  }
}