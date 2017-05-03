'use strict';

class Cell {

    constructor(value) {
        this.val = value;
        this.acceptMerge = true;
    }

    setVal(value) {
        this.val = value;
    };

    isEmpty() {
        return !this.val > 0;
    };
}

module.exports = Cell;