const WebSocket = require('ws');
const URL = require('url');

module.exports = function (wss) {

    wss.on('connection', function (ws, req) {
        var ip = req.connection.remoteAddress;
        ip = ip ? ip : req.headers['x-forwarded-for'];
        print(ip);

        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
            ws.send('Hello back!!! %s', message);
        });

        ws.send('Connection accepted.');

        wss.clients.forEach(function each(client) {
            if (client != ws && client.readyState === WebSocket.OPEN) {
                client.send('New client joined us - ' + ip);
            }
        });
    });

    function print(data) {
        console.log(data);
    };
};