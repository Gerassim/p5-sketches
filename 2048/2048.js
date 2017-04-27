/**
 * Created by gerassum on 26.04.17.
 */

field = new Field(800, 800);

function keyPressed() {
    if (keyCode === BACKSPACE) {
        spawnNew();
    } else if (keyCode === UP_ARROW) {
        field.move(createVector(-1, 0));
    } else if (keyCode === DOWN_ARROW) {
        field.move(createVector(1, 0));
    } else if (keyCode === LEFT_ARROW) {
        field.move(createVector(0, -1));
    } else if (keyCode === RIGHT_ARROW) {
        field.move(createVector(0, 1));
    }
}

function setup() {
    createCanvas(field.fieldWidht, field.fieldHeight);
    field.init(false);
}

function draw() {
    field.draw()
}

function Field(fieldWidth, fieldHeight) {
    this.field = [];
    this.rows = 4;
    this.cols = 4;

    this.fieldWidht = fieldWidth;
    this.fieldHeight = fieldHeight;
    this.cellWidth = fieldWidth / this.cols;
    this.cellHeight = fieldHeight / this.rows;

    this.init = function (empty) {

        for (var i = 0; i < this.rows; i++) {
            this.field[i] = [];
            for (var j = 0; j < this.cols; j++) {
                this.field[i][j] = new Cell(0);
            }
        }

        if (!empty) {
            this.spawnNew(floor(random(2)) + 1);
        }
    };

    this.spawnNew = function (amount) {
        for (var i = 0; i < amount; i++) {
            var emptyCell = this.getRandomEmptyCell();
            if (emptyCell)
                emptyCell.setVal(floor(random(2)) + 1);
        }
    };

    this.draw = function () {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                fill(this.field[i][j].getColor());
                noStroke();
                rectMode(CORNER);
                rect(j * this.cellHeight, i * this.cellWidth,
                    this.cellWidth, this.cellHeight);
                fill(0);
                textSize(50);
                textAlign(CENTER, CENTER);
                rectMode(RADIUS);
                if (this.field[i][j].val > 0) {
                    text(this.field[i][j].getText(), j * this.cellHeight, i * this.cellWidth,
                        this.cellWidth, this.cellHeight)
                }
            }
        }
    };

    this.getRandomEmptyCell = function () {
        var places = 0, row, col;

        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                if (this.field[i][j].isEmpty()) {
                    places++;
                    break;
                }
            }
            if (places > 0) break;
        }

        if (places > 0) {
            do {
                row = floor(random(this.rows));
                col = floor(random(this.cols));
            } while (!this.field[row][col].isEmpty());

            return this.field[row][col];
        } else {
            return false;
        }
    };

    this.move = function (direction) {
        var noChanges, counter = -1;

        do {
            counter++;
            noChanges = true;

            if (direction.x > 0 || direction.y > 0) {
                for (var i = this.rows - 1; i >= 0; i--) {
                    for (var j = this.cols - 1; j >= 0; j--) {
                        if (this.canMove(createVector(i, j), direction)) {
                            this.performMove(createVector(i, j), direction);
                            noChanges = false;
                        }
                    }
                }
            } else {
                for (i = 0; i < this.rows; i++) {
                    for (j = 0; j < this.cols; j++) {
                        if (this.canMove(createVector(i, j), direction)) {
                            this.performMove(createVector(i, j), direction);
                            noChanges = false;
                        }
                    }
                }
            }
        } while (!noChanges);

        this.resetMergeConditions();
        if (counter > 0) {
            this.spawnNew(floor(random(2)) + 1);
        }
    };

    this.hasMovesLeft = function () {

    };

    this.resetMergeConditions = function () {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                this.field[i][j].acceptMerge = true;
            }
        }
    };

    this.canMove = function (initial, direction) {
        var initialX = initial.x;
        var initialY = initial.y;

        initial.add(direction);

        if (this.field[initialX][initialY].val > 0) {
            if (this.field[initial.x] !== undefined && this.field[initial.y] !== undefined) {
                if ((this.field[initial.x][initial.y].val === this.field[initialX][initialY].val
                    && this.field[initial.x][initial.y].acceptMerge && this.field[initialX][initialY].acceptMerge)
                    || this.field[initial.x][initial.y].val === 0) {
                    return true;
                }
            }
        }

        return false;
    };

    this.performMove = function (initial, direction) {
        var initialX = initial.x;
        var initialY = initial.y;

        initial.add(direction);

        if (this.field[initial.x][initial.y].val === this.field[initialX][initialY].val) {
            this.field[initialX][initialY].val = 0;
            this.field[initial.x][initial.y].val++;
            this.field[initial.x][initial.y].acceptMerge = false;
        } else {
            this.field[initial.x][initial.y].val = this.field[initialX][initialY].val;
            this.field[initial.x][initial.y].acceptMerge = false;
            this.field[initialX][initialY].val = 0;
        }
    }
}

function Cell(value) {
    this.val = value;
    this.acceptMerge = true;

    this.colorPalette = [
        '#000000',
        '#0000FF',
        '#FF00FF',
        '#FFFF00',
        '#008000',
        '#00FF00',
        '#800000',
        '#000080',
        '#808000',
        '#800080',
        '#FF0000',
    ];

    this.getColor = function () {
        return this.colorPalette[this.val];
    };

    this.setVal = function (value) {
        this.val = value;
    };

    this.getText = function () {
        return Math.pow(2, this.val);
    };

    this.isEmpty = function () {
        return !this.val > 0;
    }
}