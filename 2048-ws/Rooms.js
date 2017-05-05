'use strict';

const Room = require('./Room');

class Rooms {
    constructor() {
        this.rooms = {};
    }

    addRoom() {
        let room = new Room();
        this.rooms[room.id] = room;

        return room;
    }

    removeRoom(room) {
        delete this.rooms[room.id];
    }

    removePlayerFromRoom(player) {
        for (let roomId in this.rooms) {
            if (this.rooms[roomId].hasPlayer(player)) {
                this.rooms[roomId].removePlayer(player);
                if (this.rooms[roomId].isEmpty()) {
                    this.removeRoom(this.rooms[roomId]);
                }
            }
        }
    }

    assignNewPlayer(player) {
        let assigned = false;

        for (let roomId in this.rooms) {
            if (!this.rooms[roomId].isFull()) {
                this.rooms[roomId].addPlayer(player);
                return this.rooms[roomId];
            }
        }

        if (!assigned) {
            let newRoom = this.addRoom();
            newRoom.addPlayer(player);
            return newRoom;
        }
    }
}

module.exports = Rooms;