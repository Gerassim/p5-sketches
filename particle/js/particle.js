let scene;

function setup() {
  scene = new Scene(800, 800);
  createCanvas(scene.width, scene.height);
  Array(500).fill(0).forEach(() => scene.addCell(new Cell(scene, scene.variants.getRandomGenome())));
}

function draw() {
  background(0);
  scene.draw();
}