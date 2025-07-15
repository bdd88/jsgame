import {WebSocketServer} from "ws";

class GameServer {
    server;
    options;

    constructor(host, port) {
        const options = {
            host: host,
            port: port
        }
        this.server = new WebSocketServer({ port: 8080 });

        this.terminalMessage('Server started');
        this.server.on('connection', this.connection);
    }

    connection(websocket) {
        websocket.on('error', this.error);
        websocket.on('message', this.receive);
    }

    error(message) {
        this.terminalMessage('Error message: %s', message);
    }

    receive(message) {
        this.terminalMessage('Recieved message: %s', message);
    }

    send(message) {
        this.terminalMessage('Sending message: %s', message);
    }

    terminalMessage(message) {
        console.log('%s: %s', new Date().toLocaleTimeString(), message);
    }
}

const server = new GameServer('0.0.0.0', 8080)