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

  getBorderIntersectionPoints(borders) {
    const {p5} = this;
    const points = [];

    for(let i = 0; i < borders.length; i++) {
      for(let j = i; j < borders.length; j++) {
        const x1 = borders[i].a.x;
        const y1 = borders[i].a.y;
        const x2 = borders[i].b.x;
        const y2 = borders[i].b.y;

        const x3 = borders[j].a.x;
        const y3 = borders[j].a.y;
        const x4 = borders[j].b.x;
        const y4 = borders[j].b.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den === 0) {
          continue;
        }

        const t = (((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den).toFixed(6);
        const u = (-((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den).toFixed(6);

        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
          const pt = p5.createVector();
          pt.x = x1 + t * (x2 - x1);
          pt.y = y1 + t * (y2 - y1);

          points.push(pt);
        }
      }
    }
    // console.log(points);
    return points;
  }
}

export default Boundary;