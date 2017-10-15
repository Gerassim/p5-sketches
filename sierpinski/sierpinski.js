let maxDepth = 1;

function setup() {
    createCanvas(900, 900);
    colorMode(HSB);
}

function draw() {
    let h = 0, s=0, b = 0;

    background(51);
    fill(h,s,b);

    triangle(50, 850, 850, 850, 450, 50);
    sierpinski(50, 850, 850, 850, 450, 50, 1, h,s,b);
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        maxDepth++;
    } else if(keyCode === DOWN_ARROW) {
        maxDepth--;
    }
}

function sierpinski(x1, y1, x2, y2, x3, y3, depth, h, s, b) {
    if(Math.abs(x2 - x3) >= 1 && depth < maxDepth) {
        b += 30;
        h += 30;
        s += 20;
        fill(h,s,b);
        noStroke();

        triangle(
            Math.abs(x1 + x2)/2, Math.abs(y1 + y2)/2,
            Math.abs(x2 + x3)/2, Math.abs(y2 + y3)/2,
            Math.abs(x3 + x1)/2, Math.abs(y3 + y1)/2
        );

        sierpinski(
            x1, y1,
            Math.abs(x1 + x3) / 2, Math.abs(y1 + y3) / 2,
            Math.abs(x1 + x2) / 2, Math.abs(y1 + y2) / 2,
            depth + 1,
            h,s,b
        );
        sierpinski(
            Math.abs(x1 + x2) / 2, Math.abs(y1 + y2) / 2,
            x2, y2,
            Math.abs(x3 + x2) / 2, Math.abs(y3 + y2) / 2,
            depth + 1,
            h,s,b
        );
        sierpinski(
            Math.abs(x1 + x3) / 2, Math.abs(y1 + y3) / 2,
            Math.abs(x2 + x3) / 2, Math.abs(y2 + y3) / 2,
            x3, y3,
            depth + 1,
            h,s,b
        )
    }
}