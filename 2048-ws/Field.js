'use strict';
const Cell = require('./Cell');
const Vector = require('./Vector');


class Field {
    constructor() {
        this.rows = 4;
        this.cols = 4;
        this.field = [];
        this.generateEmpty();
        this.spawnNew(2);
    };

    generateEmpty() {
        for (let i = 0; i < this.rows; i++) {
            this.field[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.field[i][j] = new Cell(0);
            }
        }
    }

    spawnNew(amount) {
        for (let i = 0; i < amount; i++) {
            let emptyCell = this.getRandomEmptyCell();

            if (emptyCell)
                emptyCell.setVal(Math.floor(Math.random() * 2 + 1));
        }
    };

    getRandomEmptyCell() {
        let places = 0, row, col;

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.field[i][j].isEmpty()) {
                    places++;
                    break;
                }
            }
            if (places > 0) break;
        }

        if (places > 0) {
            do {
                row = Math.floor(Math.random() * this.rows);
                col = Math.floor(Math.random() * this.cols);
            } while (!this.field[row][col].isEmpty());

            return this.field[row][col];
        } else {
            return false;
        }
    };

    move(direction) {
        let noChanges, counter = -1;

        do {
            counter++;
            noChanges = true;

            if (direction.x > 0 || direction.y > 0) {
                for (let i = this.rows - 1; i >= 0; i--) {
                    for (let j = this.cols - 1; j >= 0; j--) {
                        if (this.canMove(new Vector(i, j), direction)) {
                            this.performMove(new Vector(i, j), direction);
                            noChanges = false;
                        }
                    }
                }
            } else {
                for (let i = 0; i < this.rows; i++) {
                    for (let j = 0; j < this.cols; j++) {
                        if (this.canMove(new Vector(i, j), direction)) {
                            this.performMove(new Vector(i, j), direction);
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

        return counter > 0;
    }

    canMove(cell, direction) {
        let newPos = cell.add(direction);

        if (!this.field[cell.x][cell.y].isEmpty()) {
            if (this.field[newPos.x] !== undefined && this.field[newPos.y] !== undefined) {
                if ((this.field[newPos.x][newPos.y].val === this.field[cell.x][cell.y].val
                    && this.field[newPos.x][newPos.y].acceptMerge && this.field[cell.x][cell.y].acceptMerge)
                    || this.field[newPos.x][newPos.y].val === 0) {
                    return true;
                }
            }
        }

        return false;
    }

    performMove(cell, direction) {
        let newPos = cell.add(direction);

        if (this.field[newPos.x][newPos.y].val === this.field[cell.x][cell.y].val) {
            this.field[cell.x][cell.y].val = 0;
            this.field[newPos.x][newPos.y].val++;
            this.field[newPos.x][newPos.y].acceptMerge = false;
        } else {
            this.field[newPos.x][newPos.y].val = this.field[cell.x][cell.y].val;
            this.field[cell.x][cell.y].val = 0;
        }
    }

    resetMergeConditions() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.field[i][j].acceptMerge = true;
            }
        }
    };
}

module.exports = Field;