import { WebSocketServer } from 'ws';

class GameServer {
  constructor() {
    this.wss = new WebSocketServer({ port: 8080 });
    this.main();
  }

  handleConnection = (connection) => {
    connection.on('error', console.error);
    connection.on('message', this.receiveMessage);
    connection.send('Welcome message');
  };

  receiveMessage = (data) => {
    console.log('received: %s', data);
  };

  main() {
    console.log('Starting server');
    this.wss.on('connection', this.handleConnection);
  }
}

new GameServer();
