'use strict';

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y)
    }

    substr(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y)
    }
}

module.exports = Vector;