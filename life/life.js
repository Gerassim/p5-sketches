let grid = new Grid;

function setup() {
    createCanvas(grid.width, grid.height);
    frameRate(5);
}

function keyPressed() {
    if (keyCode === ENTER) {
        grid.process = !grid.process;
    }
}

function mouseClicked() {
    grid.invertCell(mouseX, mouseY);
    draw();
}

function draw() {
    if (grid.process) {
        grid.recalculate();
    }
    grid.render();
}