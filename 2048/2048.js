/**
 * Created by gerassum on 26.04.17.
 */
var field = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

// var field = [
//     [1, 2, 1, 2],
//     [2, 1, 2, 1],
//     [1, 2, 1, 2],
//     [2, 1, 2, 1],
// ];

var emptyField = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

var directions = ['up', 'right', 'down', 'left'];

var colors = [
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

function keyPressed() {
    if (keyCode === BACKSPACE) {
        spawnNew();
    } else if (keyCode === UP_ARROW) {
        move(directions[0]);
    } else if (keyCode === DOWN_ARROW) {
        move(directions[2]);
    } else if (keyCode === LEFT_ARROW) {
        move(directions[3]);
    } else if (keyCode === RIGHT_ARROW) {
        move(directions[1]);
    }
}

function setup() {
    createCanvas(800, 800);
    rows = field.length;
    colls = field[0].length;
    cellWidth = width / 4;
    cellHeight = height / 4;
    spawnNew(2);

    movesLeft = isMovesLeft();
}

function draw() {

    background(51);
    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < colls; i++) {
            fill(colors[field[i][j]]);
            noStroke();
            rectMode(CORNER);
            rect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
            fill(0);
            textSize(50);
            textAlign(CENTER, CENTER);
            rectMode(RADIUS);

            if (field[i][j] > 0) {
                text(Math.pow(2, field[i][j]), (j) * cellWidth, (i) * cellHeight, cellWidth, cellHeight)
            }
        }
    }

    if(!movesLeft) {
        fill(0);
        textSize(150);
        textAlign(CENTER, CENTER);
        rectMode(RADIUS);
        text("GAME OVER", 0, 0, width, height)
    }
}

function spawnNew(amount) {
    for (var i = 0; i < amount; i++) {
        spawnCell(floor(random(2)) + 1);
    }
}

function spawnCell(value) {
    var row, coll, tries = 0, place = false, placesCount = 0;

    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < colls; i++) {
            if (field[i][j] === 0) {
                place = true;
                placesCount++;
            }
        }
    }

    if (place) {
        do {
            row = floor(random(rows));
            coll = floor(random(colls));
            tries++;
        } while (field[row][coll] > 0);

        field[row][coll] = value;
    }
}

function move(moveName) {
    var newField = emptyField.clone();
    var moveDirection;

    switch (moveName) {
        case 'up':
            moveDirection = createVector(-1, 0);
            break;
        case 'down':
            moveDirection = createVector(1, 0);
            break;
        case 'left':
            moveDirection = createVector(0, -1);
            break;
        case 'right':
            moveDirection = createVector(0, 1);
            break;
    }

    if (moveName === 'up' || moveName === "left") {
        for (var j = 0; j < rows; j++) {
            for (var i = 0; i < rows; i++) {
                moveCell(j, i, moveDirection, newField);
            }
        }
    } else {
        for (j = rows - 1; j >= 0; j--) {
            for (i = rows - 1; i >= 0; i--) {
                moveCell(j, i, moveDirection, newField);
            }
        }
    }

    field = newField;
    spawnNew(floor(random(2)) + 1);

    movesLeft = isMovesLeft();
}

function moveCell(j, i, moveDirection, newField) {
    var moving = true;
    var point = createVector(j, i);
    var value = field[point.x][point.y];

    if (value > 0) {
        while (moving) {
            var newPos = point.add(moveDirection);
            if (field[newPos.x] === undefined || field[newPos.y] === undefined || (newField[newPos.x][newPos.y] !== value && newField[newPos.x][newPos.y] !== 0)) {
                newPos.sub(moveDirection);
                moving = false;
            } else if (newField[newPos.x][newPos.y] === value) {
                value++;
                moving = false;
            }
        }

        newField[newPos.x][newPos.y] = value;
    }
}

function isMovesLeft() {
    var isMovesLeft = false;

    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < rows; i++) {
            if (field[j - 1] !== undefined) {
                if (field[i] !== undefined) {
                    if (field[j][i] === field[j - 1][i] || field[j - 1][i] === 0) {
                        isMovesLeft = true;
                    }
                }
            }

            if (field[j + 1] !== undefined) {
                if (field[i] !== undefined) {
                    if (field[j][i] === field[j + 1][i] || field[j + 1][i] === 0) {
                        isMovesLeft = true;
                    }
                }
            }

            if (field[j] !== undefined) {
                if (field[i + 1] !== undefined) {
                    if (field[j][i] === field[j][i + 1] || field[j][i + 1] === 0) {
                        isMovesLeft = true;
                    }
                }
            }

            if (field[j] !== undefined) {
                if (field[i - 1] !== undefined) {
                    if (field[j][i] === field[j][i - 1] || field[j][i - 1] === 0) {
                        isMovesLeft = true;
                    }
                }
            }

        }
    }

    return isMovesLeft;
}
Array.prototype.clone = function () {
    var arr = this.slice(0);
    for (var i = 0; i < this.length; i++) {
        if (this[i].clone) {
            //recursion
            arr[i] = this[i].clone();
        }
    }
    return arr;
};