/**
 * Created by gerassum on 5/2/17.
 */
const WebSocket = require('ws');
const Rooms = require('./Rooms');
const Player = require('./Player');

const wss = new WebSocket.Server({port: 8081});

const rooms = new Rooms();

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

wss.broadcastToRoom = function broadcast(data, roomId) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN &&
            client.room.id === roomId
        ) {
            client.send(data);
        }
    });
};

wss.on('connection', function connection(ws) {
    let player = new Player();
    ws.room = rooms.assignNewPlayer(player);
    ws.player = player;

    ws.send(JSON.stringify({playerId: ws.player.id, roomId: ws.room.id}));
    wss.broadcastToRoom(JSON.stringify({fields: ws.room.getFields()}), ws.room.id);

    ws.on('message', function (data) {
        let moved = ws.player.move(data);

        if (moved) {
            let field = {};
            field[ws.player.id] = ws.player.field;
            
            let message = JSON.stringify({fields: field});
            wss.broadcastToRoom(message, ws.room.id);
        }
    });

    ws.on("close", function close() {
        rooms.removePlayerFromRoom(ws.player);

        let message = JSON.stringify({delete: ws.player.id});
        wss.broadcastToRoom(message, ws.room.id);
    });
});