/**
 * Created by gerassum on 04.01.17.
 */
var grid;

function setup() {
    grid = new Field(400, 600);
}

function draw() {
    background(51);
    grid.draw();
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        grid.activeShape.rotateCounterclockwise();
    } else if (keyCode === DOWN_ARROW) {
        grid.activeShape.move(0, 1);
    } else if (keyCode === LEFT_ARROW) {
        grid.activeShape.move(-1, 0);
    } else if (keyCode === RIGHT_ARROW) {
        grid.activeShape.move(1, 0);
    }
}

function Field(width, heigth) {
    this.shapes = [
        [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ],
        [
            [1, 1, 0],
            [1, 1, 0],
            [0, 0, 0]
        ]
    ];

    this.width = width;
    this.height = heigth;
    createCanvas(width, heigth);
    this.cellSize = 20;
    this.rows = this.width / this.cellSize;
    this.cols = this.height / this.cellSize;
    this.activeShape = new Shape(this.rows / 2, this.cols / 2, this);


    this.draw = function () {
        this.activeShape.draw();
    }
}

function Shape(posX, posY, field) {
    this.grid = field;
    this.posX = posX;
    this.posY = posY;
    this.shape = [];
    this.shapeIndex = floor(random(this.grid.shapes.length));
    for (var i = 0; i < this.grid.shapes[this.shapeIndex].length; i++) {
        this.shape.push(this.grid.shapes[this.shapeIndex][i].slice(0));
    }

    this.draw = function () {

        fill(255);
        noStroke();

        for (var i = 0; i < this.shape.length; i++) {
            for (var j = 0; j < this.shape[i].length; j++) {
                if (this.shape[i][j] > 0) {
                    var cellIndexY = i + this.offset();
                    var cellIndexX = j + this.offset();
                    rect((this.posX + cellIndexX) * this.grid.cellSize, (this.posY + cellIndexY) * this.grid.cellSize, this.grid.cellSize, this.grid.cellSize);
                }
            }
        }
    };

    this.offset = function () {
        return -floor(this.shape.length / 2);
    };

    this.rotateCounterclockwise = function () {
        for (var i = 0; i < this.shape.length / 2; i++) {
            for (var j = i; j < this.shape.length - i - 1; j++) {
                var temp = this.shape[i][j];

                this.shape[i][j] = this.shape[j][this.shape.length - 1 - i];
                this.shape[j][this.shape.length - 1 - i] = this.shape[this.shape.length - 1 - i][this.shape.length - 1 - j];
                this.shape[this.shape.length - 1 - i][this.shape.length - 1 - j] = this.shape[this.shape.length - 1 - j][i];
                this.shape[this.shape.length - 1 - j][i] = temp;
            }
        }
    };

    this.move = function (dx, dy) {
        this.posX += dx;
        this.posY += dy;
    }
}