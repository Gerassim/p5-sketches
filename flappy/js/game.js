let scene;

function setup() {
  scene = new Scene(900, 400);
  createCanvas(scene.width, scene.height);
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