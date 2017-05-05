/**
 * Created by gerassum on 5/4/17.
 */
'use strict';

class Room {
    constructor() {
        this.limit = 3;
        this.players = {};
        let date = new Date();
        this.id = date.getTime();
    }

    addPlayer(player) {
        this.players[player.id] = player;
    }

    removePlayer(player) {
        delete this.players[player.id];
    }

    hasPlayer(player) {
        for (let playerId in this.players) {
            if (player.id === playerId) {
                return true;
            }
        }

        return true;
    }

    isFull() {
        return Object.keys(this.players).length >= this.limit
    }

    isEmpty() {
        return Object.keys(this.players).length === 0;
    }

    getFields() {
        let res = {};
        for (let playerId in this.players) {
            res[playerId] = this.players[playerId];
        }

        return res;
    }
}

module.exports = Room;