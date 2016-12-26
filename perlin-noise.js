var inc = 0.01;
var noiseScale = inc * 50;
var pos = 1000;
var detail = 4;

function setup() {
    createCanvas(800, 800);
    stroke(255);
    noFill();
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        noiseScale += inc;
    } else if (keyCode === DOWN_ARROW) {
        noiseScale -= inc;
    } else if (keyCode === LEFT_ARROW) {
        if (detail - 1 > 0) {
            noiseDetail(--detail)
        }
    } else if (keyCode === RIGHT_ARROW) {
        // detail += 1;
        noiseDetail(++detail)
    }
}

function draw() {
    // Wave 1 dimension Perlin noise

    // background(51);
    // beginShape();
    // var start = pos - width / 2 * noiseScale;
    // var end = pos + width / 2 * noiseScale;
    // for (var x = 0; x < width; x++) {
    //     vertex(x, noise(map(x, 0, width, start, end)) * height);
    // }
    // endShape();
    var yoff = 0;
    //Canvas 2 dimensional Perlin noise
    loadPixels();
    for (var y = 0; y < height; y++) {
        var xoff = 0;
        for (var x = 0; x < width; x++) {
            var pix = (x + y * width) * 4;
            var color = noise(xoff, yoff) * 255;
            pixels[pix + 0] = color;
            pixels[pix + 1] = color;
            pixels[pix + 2] = color;
            pixels[pix + 3] = 255;

            xoff += inc;
        }

        yoff += inc;
    }
    updatePixels();
}