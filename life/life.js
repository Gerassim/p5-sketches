let grid = new Grid;

function setup() {
    createCanvas(grid.width, grid.height);
    frameRate(5)
}

function draw() {
    grid.render();
    grid.recalculate();
    // console.log(123)
    // noLoop();
}