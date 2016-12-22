/**
 * Created by gerassum on 22.12.16.
 */
var maxScale = 2.0;
var iterations = 100;

function setup() {
    createCanvas(800, 800);
    frameRate(2);
    slider = createSlider(0,maxScale, maxScale, 0.01)
}

function draw() {
    loadPixels();
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var a = map(x, 0, width, -slider.value(), slider.value());
            var b = map(y, 0, height, -slider.value(), slider.value());
            var startA = a;
            var startB = b;

            for (var n = 0; n < iterations; n++) {
                var newA = a * a - b * b;
                var newB = 2 * a * b;

                if(abs(newA + newB) > 16) {
                    break;
                }

                a = newA + startA;
                b = newB + startB;
            }

            var color = map(n, 0, iterations, 0, 255);

            if(n == iterations) {
                color = 0;
            }

            var pix = (x + y * width) * 4;
            pixels[pix + 0] = color;
            pixels[pix + 1] = color;
            pixels[pix + 2] = color;
            pixels[pix + 3] = 255;
        }
    }
    updatePixels();
}