/**
 * Created by gerassum on 5/14/17.
 */
new p5();
let scene = new Scene(600, 800);

function setup() {
    createCanvas(scene.width, scene.height);
}

/*TODO add score system*/
/*TODO add different speed and angle when reflect from platform*/
function draw() {
    if (keyIsDown(LEFT_ARROW)) {
        scene.platform.moveLeft();
    }

    if (keyIsDown(RIGHT_ARROW)) {
        scene.platform.moveRight();
    }

    background(51);
    scene.draw();
}
