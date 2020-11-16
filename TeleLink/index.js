


const express = require('express');
const http = require('http');
const io = require('socket.io');

const options = {
    cors: true
}

module.exports = class TeleLink {
    /**
     * @param {Number} port Port number for server to be run
     * @param {String} dir Directory for client files. Directory needs to have index.html file.
     */
    constructor(port, dir) {
        /** @private */
        this.app = express();
        /** @private */
        this.http = http.createServer(this.app);
        /** @private */
        this.io = io(this.http, options);

        if (port && dir) {
            this.listen(port, dir);
        }
    }

    /**
     * @param {Number} port Port number for server to be run
     * @param {String} dir Directory for client files. Directory needs to have index.html file.
     */
    listen(port, dir) {
        if (!port) {
            console.log('Could not start server missing port.');
            return;
        }
        if (!dir) {
            console.log('Could not start http server Missing directory path.');
            return;
        }
        //this.app.use(express.static(__dirname + '/public'));
        this.app.use(express.static(dir));

        this.app.get('/', (req, res) => {
            res.sendFile(dir + '/index.html');
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
