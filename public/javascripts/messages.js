var hostname = window.location.hostname;
var protocol = window.location.protocol.replace(/:/g, '');
var port = window.location.port || (protocol === 'https' ? '443' : '80');
var wss = (protocol === 'https' ? 'wss' : 'ws');
var webSocket = new WebSocket(wss + '://' + hostname + ':' + port);
webSocket.onmessage = handleSocket;
webSocket.onopen = print;
webSocket.onerror = print;

function print(event) {
    console.log(event);
};

function handleSocket(event) {
    onMessage(event.data);
};

Messenger.options = {
    extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
    theme: 'future'
};

function onMessage(event) {
    print(event);

    // Messenger().post({
    //     message: '' + event,
    //     type: 'info',
    //     showCloseButton: true
    // });
};