/**
 * Created by gerassum on 5/4/17.
 */
'use strict';

class Room {
    constructor() {
        this.limit = 2;
        this.players = {};
        let date = new Date();
        this.id = date.getTime();
        // this.id = roomCounter;
        // roomCounter++;
    }

    addPlayer(player) {
        console.log('Add player ' + player.id + ' to room ' + this.id);
        this.players[player.id] = player;
    }

    removePlayer(player) {
        console.log('Remove player ' + player.id + ' from room ' + this.id);
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
        for(let playerId in this.players) {
            res[playerId] = this.players[playerId].field;
        }

        return res;
    }
}

module.exports = Room;