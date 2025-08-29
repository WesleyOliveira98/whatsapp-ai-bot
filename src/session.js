const { onQRCode, onReady, onDisconnected, onMessage } = require('./methods');

function initSession(client) {
    client.on('qr', onQRCode);

    client.on('ready', onReady);

    client.on('disconnected', reason => onDisconnected(reason,client));

    client.on('message', message => onMessage(message, client));

    client.initialize();
}

module.exports = initSession;