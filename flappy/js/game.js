let scene;
let bird;

function setup() {
  scene = new Scene(900, 400);
  scene.bird.setImage(bird);
  createCanvas(scene.width, scene.height);
}

function preload() {
  bird = loadImage('img/bird-icon-small.png');
}

function keyPressed() {
  if(keyCode === 32) {
    if(scene.isGameRunning) {
      scene.bird.jump();
    } else {
      scene.reset();
      loop();
    }
  }
}


function draw() {
  fill(255);
  background(51);
  noStroke();

  scene.draw();
  scene.update();
}