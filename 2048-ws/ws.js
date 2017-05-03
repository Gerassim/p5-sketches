/**
 * Created by gerassum on 5/2/17.
 */
const WebSocket = require('ws');
const Field = require('./Field');
const Vector = require('./Vector');

const wss = new WebSocket.Server({port: 8081});
let field;

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

wss.on('connection', function connection(ws) {
    if (field === undefined) {
        field = new Field();
    }

    wss.broadcast(JSON.stringify(field.field));

    ws.on('message', function (data) {
        switch (data) {
            case 'up':
                field.move(new Vector(-1, 0));
                console.log('Moving up');
                break;
            case 'down':
                field.move(new Vector(1, 0));
                console.log('Moving down');
                break;
            case 'left':
                field.move(new Vector(0, -1));
                console.log('Moving left');
                break;
            case 'right':
                field.move(new Vector(0, 1));
                console.log('Moving right');
                break;
        }
        wss.broadcast(JSON.stringify(field.field));
    });
});