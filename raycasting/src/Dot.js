import Ray from "./Ray";
import {Vector} from "p5";

class Dot {
  static MODE_SHOW_RAY = 1;
  static MODE_SHOW_DOT = 2;

  constructor(x, y, p5) {
    this.pos = p5.createVector(x, y);
    this.p5 = p5;
    this.d = 4;
    this.ray = new Ray(x, y, 0, p5);
    this.rotateIncrement = 0.001;
    this.speed = 4;
    this.topVector = Vector.fromAngle(3 * p5.HALF_PI, this.speed);
    this.rightVector = Vector.fromAngle(0, this.speed);
    this.downVector = Vector.fromAngle(p5.HALF_PI, this.speed);
    this.leftVector = Vector.fromAngle(p5.PI, this.speed);
    this.fov = p5.HALF_PI;
    this.viewDirection = Vector.fromAngle(0);
    this.mode = Dot.MODE_SHOW_RAY;
  }

  cast(boundaries) {
    const {ray, pos, rotateIncrement, fov, viewDirection} = this;
    const viewAngle = viewDirection.heading();
    for (let i = viewAngle; i < fov + viewAngle; i += rotateIncrement) {
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
        this.drawRay(closestPoint);
      }
      ray.rotate(i);
    }
  }

  draw() {
    const {p5, pos, d} = this;
    p5.fill(255, 0, 0);
    p5.noStroke();
    p5.ellipse(pos.x, pos.y, d, d);
  }

  drawRay(point) {
    const {p5, pos, mode} = this;

    switch (mode) {
      case Dot.MODE_SHOW_RAY:
        p5.stroke(255);
        p5.line(pos.x, pos.y, point.x, point.y);
        break;
      case Dot.MODE_SHOW_DOT:
        p5.fill(255, 0, 0);
        p5.noStroke();
        p5.ellipse(point.x, point.y, 2, 2);
        break;
    }
  }

  move(x, y) {
    const {pos, ray} = this;
    pos.x = x;
    pos.y = y;
    ray.move(x, y)
  }

  incrementalMove(v) {
    const {pos, ray} = this;
    this.pos = pos.add(v);
    ray.move(pos.x, pos.y);
  }

  handleMove() {
    const {p5, topVector, rightVector, downVector, leftVector} = this;

    if(p5.keyIsDown(87)) {
      this.incrementalMove(topVector);
    }
    if(p5.keyIsDown(68)) {
      this.incrementalMove(rightVector);
    }
    if(p5.keyIsDown(83)) {
      this.incrementalMove(downVector);
    }
    if(p5.keyIsDown(65)) {
      this.incrementalMove(leftVector);
    }

    this.viewDirection = p5.createVector(p5.mouseX - this.pos.x, p5.mouseY - this.pos.y);
  }
}

export default Dot;