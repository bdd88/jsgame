class websocket {
    socket;

    constructor(host, port) {
        this.socket = new WebSocket("ws://" + host + ":" + port);
        this.socket.addEventListener("open", (e) => this.open(e));
        this.socket.addEventListener("message", (e) => this.message(e));
    }

    open(e) {
        socket.send("Hello Server!");
    }

    message(e) {
        console.log("Message from server ", e.data);
    }

}