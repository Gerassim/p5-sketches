import Ray from "./Ray";
import {Vector} from "p5";

class Dot {
  constructor(x, y, p5) {
    this.pos = p5.createVector(x, y);
    this.p5 = p5;
    this.d = 4;
    this.ray = new Ray(x, y, 0, p5);
    this.rotateIncrement = 0.005;
  }

  cast(boundaries) {
    const {ray, p5, pos, rotateIncrement} = this;
    for (let i = 0; i < 2 * Math.PI; i += rotateIncrement) {
      let closestPoint = null;
      let minDist = Infinity;
      for (let boundary of boundaries) {
        const pt = ray.cast(boundary);

        if (pt) {
          const dist = Vector.dist(pos, pt);
          if (dist < minDist) {
            minDist = dist;
            closestPoint = pt;
          }
        }
      }

      if (closestPoint) {
        p5.fill(255);
        p5.line(this.pos.x, this.pos.y, closestPoint.x, closestPoint.y);
      }
      ray.rotate(i);
    }
  }

  draw() {
    const {p5, pos, d} = this;
    p5.fill(255);
    p5.ellipse(pos.x, pos.y, d, d);
  }

  move(x, y) {
    const {pos, ray} = this;
    pos.x = x;
    pos.y = y;
    ray.move(x, y)
  }
}

export default Dot;