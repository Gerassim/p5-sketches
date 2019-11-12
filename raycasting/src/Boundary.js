class Boundary {
  constructor(x1, y1, x2, y2, sk) {
    this.a = sk.createVector(x1, y1);
    this.b = sk.createVector(x2, y2);
    this.sk = sk;
  }

  draw() {
    this.sk.stroke(255);
    this.sk.line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}

export default Boundary;