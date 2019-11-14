import {Vector} from "p5";

class Ray {
  static MODE_SHOW_RAY = 1;
  static MODE_SHOW_DOT = 2;

  constructor(x, y, angle, p5) {
    this.p5 = p5;
    this.pos = p5.createVector(x, y);
    this.direction = angle;
    this.mode = Ray.MODE_SHOW_RAY;
  }

  rotate(angle) {
    this.direction = Vector.fromAngle(angle);
  }

  setDirection(vector) {
    this.direction = vector;
  }

  move(x, y) {
    this.pos.x = x;
    this.pos.y = y;
  }

  cast(boundaries, color) {
    const {pos} = this;
    let closestPoint = null;
    let minDist = Infinity;

    for (let boundary of boundaries) {
      const pt = this.getIntersectionPoint(boundary);

      if (pt) {
        const dist = Vector.dist(pos, pt);
        if (dist < minDist) {
          minDist = dist;
          closestPoint = pt;
        }
      }
    }

    if (closestPoint) {
      this.draw(closestPoint, color);
    }

    return closestPoint;
  }

  draw(point, color) {
    const {p5, pos, mode} = this;

    switch (mode) {
      case Ray.MODE_SHOW_RAY:
        p5.stroke(color ? color : 255);
        p5.line(pos.x, pos.y, point.x, point.y);
        break;
      case Ray.MODE_SHOW_DOT:
        p5.fill(255, 0, 0);
        p5.noStroke();
        p5.ellipse(point.x, point.y, 2, 2);
        break;
    }
  }

  getIntersectionPoint(boundary) {
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

    const t = (((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den).toFixed(6);
    const u = (-((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den).toFixed(6);

    if (t >= 0 && t <= 1 && u >= 0) {
      const pt = p5.createVector();
      pt.x = x1 + t * (x2 - x1);
      pt.y = y1 + t * (y2 - y1);

      return pt;
    }
  }
}

export default Ray;