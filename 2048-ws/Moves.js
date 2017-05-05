/**
 * Created by gerassum on 05.05.17.
 */
'use strict';

const Vector = require('./Vector');

class Moves {
    static getMoves() {
        return  {
            up: new Vector(-1, 0),
            down: new Vector(1, 0),
            left: new Vector(0, -1),
            right: new Vector(0, 1)
        };
    }
}

module.exports = Moves;