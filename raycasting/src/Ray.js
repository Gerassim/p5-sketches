import {Vector} from "p5";
class Ray {
  constructor(x, y, angle, p5) {
    this.p5 = p5;
    this.pos = p5.createVector(x, y);
    this.angle = angle;
    this.direction = Vector.fromAngle(angle);
  }

  rotate(angle) {
    this.direction = Vector.fromAngle(angle);
  }

  move(x,y) {
    this.pos.x = x;
    this.pos.y = y;
  }

  cast(boundary) {
    const {p5, pos, direction} = this;
    const x1 = boundary.a.x;
    const y1 = boundary.a.y;
    const x2 = boundary.b.x;
    const y2 = boundary.b.y;

    const x3 = pos.x;
    const y3 = pos.y;
    const x4 = pos.x + direction.x;
    const y4 = pos.y + direction.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den === 0) {
      return;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

    if (t > 0 && t < 1 && u > 0) {
      const pt = p5.createVector();
      pt.x = x1 + t * (x2 - x1);
      pt.y = y1 + t * (y2 - y1);
      return pt;
    }
  }
}

export default Ray;