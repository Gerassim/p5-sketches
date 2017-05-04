/**
 * Created by gerassum on 5/4/17.
 */
'use strict';
const Field = require('./Field');


class Player {
    constructor() {
        let date = new Date();
        this.id = date.getTime();
        this.field = new Field();
    }
}

module.exports = Player;