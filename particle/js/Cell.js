class Cell {
  static width = 6;
  static height = 6;

  constructor(scene, genome, pos) {
    if(pos) {
      this.pos = pos;
    } else {
      this.pos = createVector(
        map(Math.random(), 0, 1, 0, scene.width),
        map(Math.random(), 0, 1, 0, scene.height)
      )
    }

    this.force = createVector(0, 0);
    this.velocity = createVector(0, 0);

    this.genome = genome;
    this.scene = scene;
  }

  applyForces() {
    const friction = this.velocity.copy().setMag(0.35);
    this.velocity = this.velocity.add(this.force).sub(friction);
    this.pos = this.pos.add(this.velocity);
  }

  addForce(force) {
    this.force.add(force);
  }

  addForceFromOtherCell(otherCell) {
    const distance = this.pos.dist(otherCell.pos);
    const magnitude = otherCell.genome.getRelation(this.genome.id).calculateForce(distance);
    const force = createVector(this.pos.x - otherCell.pos.x, this.pos.y - otherCell.pos.y).setMag(magnitude);
    this.addForce(force);
  }

  draw() {
    fill(this.genome.color);
    noStroke();
    ellipse(this.pos.x, this.pos.y, Cell.width, Cell.height);
    this.applyForces();
    this.force.setMag(0);
  }
}