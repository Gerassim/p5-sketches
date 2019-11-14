import Ray from "./Ray";
import {Vector} from "p5";
import Boundary from "./Boundary";

class Dot {
  constructor(x, y, p5) {
    this.pos = p5.createVector(x, y);
    this.p5 = p5;
    this.d = 4;
    this.ray = new Ray(x, y, 0, p5);
    this.speed = 4;
    this.topVector = Vector.fromAngle(3 * p5.HALF_PI, this.speed);
    this.rightVector = Vector.fromAngle(0, this.speed);
    this.downVector = Vector.fromAngle(p5.HALF_PI, this.speed);
    this.leftVector = Vector.fromAngle(p5.PI, this.speed);
    this.fov = p5.HALF_PI / 2;
    this.viewDirection = Vector.fromAngle(0);

  }

  cast(boundaries) {
    const {ray, pos, rotateIncrement, fov, viewDirection, p5} = this;
    const beginFow = viewDirection.copy().rotate(-fov/2);
    const endFow = viewDirection.copy().rotate(fov/2);
    const lightShape = [];
    const fow = [beginFow, endFow];

    lightShape.push(pos);
    fow.forEach((direction) => {
      ray.setDirection(direction);
      const point = ray.cast(boundaries, 150);
      if(point) {
        lightShape.push(point);
      }
    });


    for (const boundary of boundaries) {
      const directions = [boundary.a.copy().sub(pos), boundary.b.copy().sub(pos)];
      directions.forEach((direction) => {
        if(
          beginFow.angleBetween(direction) > 0 &&
          endFow.angleBetween(direction) < 0
        ) {
          ray.setDirection(direction.copy().rotate(-0.0001));
          const point = ray.cast(boundaries);
          if(point) {
            p5.vertex(point.x, point.y);
            lightShape.push(point);
          }
          ray.setDirection(direction.copy().rotate(0.0001));
          const point2 = ray.cast(boundaries);
          if(point2) {
            p5.vertex(point2.x, point2.y);
            lightShape.push(point2);
          }
        }
      });
    }
    p5.beginShape();
    p5.fill('rgba(0,255,0, 0.25)');
    lightShape
      .sort((a, b) => b.copy().sub(pos).angleBetween(a.copy().sub(pos))> 0 ? 1 : -1)
      .forEach((point,i) => {
        p5.vertex(point.x, point.y);
      });
    p5.endShape(p5.CLOSE);
  }

  draw() {
    const {p5, pos, d} = this;
    p5.fill(255, 0, 0);
    p5.noStroke();
    p5.ellipse(pos.x, pos.y, d, d);
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

    if (p5.keyIsDown(87)) {
      this.incrementalMove(topVector);
    }
    if (p5.keyIsDown(68)) {
      this.incrementalMove(rightVector);
    }
    if (p5.keyIsDown(83)) {
      this.incrementalMove(downVector);
    }
    if (p5.keyIsDown(65)) {
      this.incrementalMove(leftVector);
    }

    this.viewDirection = p5.createVector(p5.mouseX - this.pos.x, p5.mouseY - this.pos.y);
  }
}

export default Dot;