import P5 from 'p5';
import Boundary from "./Boundary";
import Dot from "./Dot";

new P5((p5) => {
  const boundaries = [];
  const width = 1200;
  const height = 800;
  boundaries.push(new Boundary(0, 0, width, 0, p5));
  boundaries.push(new Boundary(width, 0, width, height, p5));
  boundaries.push(new Boundary(width, height, 0, height, p5));
  boundaries.push(new Boundary(0, height, 0, 0, p5));
  for(let i = 0; i<7; i++) {
    boundaries.push(new Boundary(p5.random(width), p5.random(height), p5.random(width), p5.random(height), p5));
  }
  const dot = new Dot(width/2, height/2, p5);

  p5.setup = () => {
    p5.createCanvas(width, height);
  };

  p5.draw = () => {
    p5.background(51);
    for(let boundary of boundaries) {
      boundary.draw();
    }

    dot.draw();
    dot.cast(boundaries);
    dot.move(p5.mouseX, p5.mouseY);
  };
});