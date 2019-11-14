import P5 from 'p5';
import Boundary from "./Boundary";
import Dot from "./Dot";
import Ray from "./Ray";

new P5((p5) => {
  const boundaries = [];
  const width = 1200;
  const height = 800;
  boundaries.push(new Boundary(0, 0, width, 0, p5));
  boundaries.push(new Boundary(width, 0, width, height, p5));
  boundaries.push(new Boundary(width, height, 0, height, p5));
  boundaries.push(new Boundary(0, height, 0, 0, p5));
  for (let i = 0; i < 15; i++) {
    boundaries.push(new Boundary(p5.random(width), p5.random(height), p5.random(width), p5.random(height), p5));
  }
  const dot = new Dot(width / 2, height / 2, p5);

  p5.setup = () => {
    p5.createCanvas(width, height);
  };

  p5.draw = () => {
    p5.background(51);
    dot.handleMove();
    for (let boundary of boundaries) {
      boundary.draw();
    }
    dot.cast(boundaries);
    dot.draw();
  };

  p5.keyPressed = () => {
    switch (p5.keyCode) {
      case 49:
        dot.ray.mode = Ray.MODE_SHOW_RAY;
        break;
      case 50:
        dot.ray.mode = Ray.MODE_SHOW_DOT;
        break;
      case 51:
        boundaries.forEach(boundary => boundary.mode = boundary.mode === Boundary.MODE_SHOW ? Boundary.MODE_HIDE : Boundary.MODE_SHOW);
        break;
    }
  }
});