const WebSocket = require('ws');

class WebSocketServer {
    constructor(port = 8080) {
        this.port = port;

        this.serverOptions = {
            perMessageDeflate: null,          // Default: true
            maxPayload: null,                 // Default: 16MB
            clientTracking: null,             // Default: true
            handleProtocols: null,            // Default: null
            noServer: null,                   // Default: false
            verifyClient: null,               // Default: null
            host: null,                       // Default: '0.0.0.0' or undefined
            path: null,                       // Default: null
            backlog: null,                    // Default: 511
            port: null,                       // Port is already passed, set to null
            server: null,                     // Default: null
            perMessageDeflateOptions: null,   // Default: { serverNoContextTakeover: false, clientNoContextTakeover: false, zlibDeflateOptions: {} }
            compress: null,                   // Default: true
            pingInterval: null,               // Default: 10000 (10 seconds)
            pingTimeout: null,                // Default: 5000 (5 seconds)
            key: null,                        // Default: null (for secure WSS connections)
            cert: null,                       // Default: null (for secure WSS connections)
            ca: null,                         // Default: null (for secure WSS connections)
            rejectUnauthorized: null,         // Default: true (for secure WSS connections)
        };

        // Initialize the WebSocket server with the defined options
        this.wss = new WebSocket.Server({
            port: this.port,
            ...this.serverOptions // Spread in all the options directly
        });

        this.main();
    }

    main() {
        this.wss.on('connection', (connection) => {
            this.handleConnection(connection);
        });

        console.log(`WebSocket server running on ws://localhost:${this.port}`);
    }

    handleConnection(connection) {
        console.log('A new client connected!');
        this.sendMessage(connection, 'Welcome to the server!');
        connection.on('message', (message) => this.handleMessage(connection, message));
        connection.on('close', () => this.handleClose(connection));
    }

    sendMessage(connection, message) {
        connection.send(message);
    }

    handleMessage(connection, message) {
        console.log(`Received: ${message}`);
    }

    handleClose(connection) {
        console.log('A client disconnected!');
    }
}

// Instantiate the server with no options passed, everything is predefined in the class
const server = new WebSocketServer(8080);
