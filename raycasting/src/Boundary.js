class Boundary {
  static MODE_SHOW = 1;
  static MODE_HIDE = 2;

  constructor(x1, y1, x2, y2, p5) {
    this.a = p5.createVector(x1, y1);
    this.b = p5.createVector(x2, y2);
    this.p5 = p5;
    this.mode = Boundary.MODE_SHOW;
  }

  draw() {
    switch (this.mode) {
      case Boundary.MODE_SHOW:
        this.p5.stroke(255);
        this.p5.line(this.a.x, this.a.y, this.b.x, this.b.y);
        break;
      case Boundary.MODE_HIDE:
        break;
    }
  }
}

export default Boundary;