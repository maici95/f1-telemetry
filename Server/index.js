


const express = require('express');
/* import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);*/



module.exports = class Server {
    constructor() {
        this.app = express();
        this.routes();
        this.packets = [];
    }

    /** @param {Number} port */
    start(port) {
        this.app.use(express.static(__dirname + '/public'));
        this.app.listen(port);
        console.log('Server running... Head to localhost:'+port);
    }

    // Update parsed packet
    setPacket(packet) {
        const packetId = packet.PacketHeader.packetId;

        if (packetId || packetId === 0) {
            this.packets[packetId] = packet;
/*             {
                updateTimestamp: new Date().getTime(),
                lastFetchTimestamp: null,
                data: packet
            } */
        }
    }

    // api routes
    routes() {
        // Get html page -- Proto version of HUD
        this.app.get('/', (req, res) => {
            res.sendFile(__dirname + '/public/index.html');
        });

        // New version of HUD
        this.app.get('/hud', (req, res) => {
            res.sendFile(__dirname + '/public/HUD/index.html');
        });

        // Get data
        this.app.get('/data', (req, res) => {
            res.send(this.packets);
        });

        // Get packet by id
        this.app.get('/data/:id/:timeStamp', (req, res) => {
            const packetId = req.params.id;
            const timeStamp = parseInt(req.params.timeStamp);

            let result = { msg: 'no newer version available' };

            if (this.packets[packetId]) {
                if (this.packets[packetId].updateTimestamp !== timeStamp) {
                    this.packets[packetId].lastFetchTimestamp = timeStamp;
                    result = this.packets[packetId];
                }

            } else {
                result = { msg: 'could not fetch packet' }
            }

            res.send(result);
        });

        // Testing
        this.app.get('/test', (req, res) => {
            res.send({msg: 'test'});
        });

    }

}
