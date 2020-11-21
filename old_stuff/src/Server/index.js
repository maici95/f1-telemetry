


const options = {
    cors: true
}

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, options);
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const cors = require('cors');

const Parser = require('../../Parser');
const parser = new Parser();

const PORT = 20777;

let gear = 0;

/**
 * 0 - motion
 * 1 - session
 * 2 - lap data
 * 3 - event
 * 4 - participants
 * 5 - car setup
 * 6 - car telemetry
 * 7 - car status
 * 8 - final classification
 * 9 - lobby info
 */

// Parse packet
server.on('message', (buffer, rinfo) => {
    parser.parse(buffer);
    //io.emit('packet', {...parser.data})
    //io.emit('packet', { gear: 3 });

    const packetId = parser.data.PacketHeader.packetId;
    const pId = parser.data.PacketHeader.playerCarIndex;

    const rpms = [0,0,0,0,0,
        10500,
        10500,
        10500,
        10500,
        10500,
        10700,
        10900,
        11100,
        11300,
        11500
    ];
    
    switch (packetId) {
        case 6:
            const rpm = parser.data.carTelemetryData[pId].engineRPM;
            const gear = parser.data.carTelemetryData[pId].gear;
            const tyreTemps = parser.data.carTelemetryData[pId].tyresInnerTemperature;

            io.emit('packet', {
                tyreTemps: tyreTemps,
                gear: gear,
                test: Array(15).fill(0).map((e, i) => {
                    if (i < 5)
                        return e;
                    if (rpm > rpms[i]) {
                        return 1;
                    }
                })
            });

        break;
    }



});

app.use(cors());
app.use(express.static(__dirname + '/public/build'));

// Send html page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/build/index.html');
})

// Start server
http.listen(3001);
server.bind(PORT);

