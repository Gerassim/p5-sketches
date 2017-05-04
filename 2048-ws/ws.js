/**
 * Created by gerassum on 5/2/17.
 */
const WebSocket = require('ws');
const Field = require('./Field');
const Vector = require('./Vector');

const wss = new WebSocket.Server({port: 8081});
let fields = {};

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

wss.on('connection', function connection(ws) {
    let date = new Date();
    ws.id = date.getTime();

    fields[ws.id] = new Field();

    ws.send(JSON.stringify({connectionId:ws.id}));
    wss.broadcast(JSON.stringify({fields: fields}));

    ws.on('message', function (data) {
        switch (data) {
            case 'up':
                fields[ws.id].move(new Vector(-1, 0));
                break;
            case 'down':
                fields[ws.id].move(new Vector(1, 0));
                break;
            case 'left':
                fields[ws.id].move(new Vector(0, -1));
                break;
            case 'right':
                fields[ws.id].move(new Vector(0, 1));
                break;
        }

        let message = JSON.stringify({fields:fields});

        wss.broadcast(message);
    });

    ws.on("close", function close() {
        delete fields[ws.id];
        let message = JSON.stringify({delete:ws.id});
        wss.broadcast(message);
    });
});