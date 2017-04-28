/**
 * Created by gerassum on 26.04.17.
 */

field = new Field(400, 400);
field1 = new Field(400, 400);

function keyPressed() {
    if (keyCode === UP_ARROW) {
        field.move(createVector(-1, 0));
    } else if (keyCode === DOWN_ARROW) {
        field.move(createVector(1, 0));
    } else if (keyCode === LEFT_ARROW) {
        field.move(createVector(0, -1));
    } else if (keyCode === RIGHT_ARROW) {
        field.move(createVector(0, 1));
    }

    if (keyCode === 87) {
        field1.move(createVector(-1, 0));
    } else if (keyCode === 83) {
        field1.move(createVector(1, 0));
    } else if (keyCode === 65) {
        field1.move(createVector(0, -1));
    } else if (keyCode === 68) {
        field1.move(createVector(0, 1));
    }
}

function setup() {
    createCanvas(900, 400);
    field.init(false);
    field1.init(false);
}

function draw() {
    background(51);
    field.draw(0);
    field1.draw(500)
}

function Field(fieldWidth, fieldHeight) {
    this.field = [];
    this.rows = 4;
    this.cols = 4;
    this.hasMoves = true;

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

    this.draw = function (yOffset) {
        if(yOffset === undefined) {
            yOffset = 0;
        }

        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                fill(this.field[i][j].getColor());
                noStroke();
                rectMode(CORNER);
                rect(j * this.cellWidth + yOffset, i * this.cellHeight,
                    this.cellWidth, this.cellHeight);
                fill(this.field[i][j].getTextColor());
                textSize(30);
                textAlign(CENTER, CENTER);
                rectMode(RADIUS);
                if (this.field[i][j].val > 0) {
                    text(this.field[i][j].getText(), j * this.cellWidth + yOffset, i * this.cellHeight,
                        this.cellWidth, this.cellHeight)
                }
            }
        }

        if(!this.hasMoves) {
            fill(0);
            textSize(70);
            textAlign(CENTER, CENTER);
            rectMode(RADIUS);
            text("GAME OVER", yOffset, 0, this.fieldWidht, this.fieldHeight)
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
            this.spawnNew(1);
        }

        this.hasMoves = this.hasMovesLeft();
    };

    this.hasMovesLeft = function () {
        var moves = [
            createVector(-1, 0),
            createVector(1, 0),
            createVector(0, -1),
            createVector(0, 1)
        ];

        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                for (var k = 0; k < moves.length; k++) {
                    if(this.canMove(createVector(i, j), moves[k])) {
                        return true;
                    }
                }
            }
        }

        return false;
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
            this.field[initialX][initialY].val = 0;
        }
    }
}

function Cell(value) {
    this.val = value;
    this.acceptMerge = true;

    this.colorPalette = [
        new Color('#000000', '#000000'),
        new Color('#1E90FF', '#000000'),
        new Color('#FF00FF', '#000000'),
        new Color('#FFD700', '#000000'),
        new Color('#008000', '#000000'),
        new Color('#98FB98', '#000000'),
        new Color('#FF8C00', '#000000'),
        new Color('#DC143C', '#000000'),
        new Color('#808000', '#000000'),
        new Color('#800080', '#000000'),
        new Color('#FF0000', '#000000'),
    ];

    this.getColor = function () {
        return this.colorPalette[this.val].cellColor;
    };

    this.setVal = function (value) {
        this.val = value;
    };

    this.getText = function () {
        return Math.pow(2, this.val);
    };

    this.isEmpty = function () {
        return !this.val > 0;
    };

    this.getTextColor = function () {
        return this.colorPalette[this.val].textColor;
    }
}

function Color(cellColor, textColor) {
    this.cellColor = cellColor;
    this.textColor = textColor;
}