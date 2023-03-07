


const express = require('express');
const http = require('http');
const io = require('socket.io');

const options = {
    cors: true
}

module.exports = class TeleLink {
    /**
     * @param {Number} port Port number for server to be run
     */
    constructor(port) {
        /** @private */
        this.app = express();
        /** @private */
        this.http = http.createServer(this.app);
        /** @private */
        this.io = io(this.http, options);

        if (port) {
            this.listen(port);
        }
    }

    route(route) {
        this.app.use(route);
    }

    public(dir) {
        this.app.use(express.static(dir));
    }

    /**
     * @param {Number} port Port number for server to be run
     */
    listen(port) {
        if (!port) {
            console.log('Could not start server missing port.');
            return;
        }

        this.http.listen(port);
        console.log('Server running port: ' + port);
    }

    /**
     * @param {String} emitName Name of emit data
     * @param {Object} data Data to be send to client
     * @description Send data to client
     */
    emit(emitName, data) {
        this.io.emit(emitName, data);
    }

}
