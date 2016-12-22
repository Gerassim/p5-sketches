var inc = 0.001;
var noiseScale = inc * 50;
var pos = 1000;
var speed = 0.1;
var alpha = 0;

function setup() {
    createCanvas(1200, 400);
    stroke(255);
    noFill();
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        noiseScale += inc;
        speed *=2;
    } else if (keyCode === DOWN_ARROW) {
        noiseScale -= inc;
        speed /=2;
    }
}

function draw() {
    background(51);
    beginShape();
    var start = pos - width / 2 * noiseScale;
    var end = pos + width / 2 * noiseScale;
    for (var x = 0; x < width; x++) {
        vertex(x, noise(map(x, 0, width, start, end)) * height);
    }
    endShape();
    pos += speed;
}