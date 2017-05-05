/**
 * Created by gerassum on 5/4/17.
 */
'use strict';
const Field = require('./Field');
const Vector = require('./Vector');
const Moves = require('./Moves');

class Player {
    constructor() {
        let date = new Date();
        this.id = date.getTime();
        this.field = new Field();
        this.name = '';
    }

    move(direction) {
        return this.field.move(Moves.getMoves()[direction]);
    }
}

module.exports = Player;