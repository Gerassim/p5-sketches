'use strict';

class Field {
    constructor() {
        this.rows = 4;
        this.cols = 4;
        this.field = [];
        this.generateEmpty();
    };

    generateEmpty() {
        for (let i = 0; i < this.rows; i++) {
            this.field[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.field[i][j] = new Cell(0);
            }
        }
    }

    spawnNew = function (amount) {
        for (let i = 0; i < amount; i++) {
            let emptyCell = this.getRandomEmptyCell();

            if (emptyCell)
                emptyCell.setVal(Math.floor(Math.random()) + 1);
        }
    };

    getRandomEmptyCell = function () {
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
}

module.exports = Field;