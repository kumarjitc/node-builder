const { Server } = require('socket.io');
const Select = require('../db/select');
const { build } = require('../db/load');

class Socket {
    constructor() {
        this.io = new Server({
            path: '/build/status',
            cors: {
                origin: '*'
            }
        });
        // Test
        this.io.listen(8001);
    }

    async init() {
        await this.io.on("connection", socket => {
            // Log whenever a user connects
            console.log("User connected to root");

            this.io.emit('progress', new Select(build).execute());

            // Log whenever a client disconnects from our websocket server
            socket.on("disconnect", (reason) => {
                console.log("user disconnected from root", reason);
            });

            this.socket = socket;
        });

        return this;
    }

    // Send Message
    send(event, message) {
        this.io.emit(event, {
            'message': message
        });
    }

    terminate() {
        if (this.socket) {
            this.socket.disconnect(true);
        }
        this.io.close((error) => {
            if (error) {
                console.log('Error occurred during close');
            }
        })
    }
}

module.exports = {
    Socket: Socket
};
