


const express = require('express');
const http = require('http');
const io = require('socket.io');

module.exports = class TeleLink {
    constructor(port) {
        /** @private */
        this.app = express();
        /** @private */
        this.http = http.createServer(this.app);
        /** @private */
        this.io = io(this.http);

        if (port) {
            this.listen(port);
        }
    }

    /**
     * @param {Number} port Start server in given port
     */
    listen(port) {
        if (!port) {
            console.log('Could not start server missing port.');
            return;
        }
        this.app.use(express.static(__dirname + '/public'));

        this.app.get('/', (req, res) => {
            res.sendFile(__dirname + '/index.html');
        });

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
