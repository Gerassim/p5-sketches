/**
 * Created by gerassum on 5/2/17.
 */
const WebSocket = require('ws');
const Field = require('./Field');

const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', function connection(ws) {

    console.log(wss.clients.size);
    if(wss.clients.size < 2) {
        console.log("Waiting for second player")
    } else if (wss.clients.size > 2) {
        console.log("To many players. Disconnecting...");
        ws.send("To many players. Disconnecting...");
        ws.close();
    }
});



wss.on('close', function (ws) {
    console.log("Client disconnected...")
});