


console.clear();

const fs = require('fs');
const Parser = require('./Parser');
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const PORT = 20777;

const PacketHeader = require('./Parser/Packets/PacketHeader');
const MotionPacket = require('./Parser/Packets/MotionPacket');
const SessionPacket = require('./Parser/Packets/SessionPacket');
const LapData = require('./Parser/Packets/LapData');
const Participants = require('./Parser/Packets/Participants');
const CarSetups = require('./Parser/Packets/CarSetups');
const CarTelemetry = require('./Parser/Packets/CarTelemetry');
const CarStatus = require('./Parser/Packets/CarStatus');

//fs.readFile('./data/data_1344.buf', (error, data) => {
//const msg = data;

server.on('message', (msg, rinfo) => {
    const p = new Parser(msg);

    p.read(PacketHeader);

    const pId = p.data.PacketHeader.packetId;

    switch (pId) {
        case 0:
            p.read(MotionPacket);
            break;
        case 1:
            p.read(SessionPacket);
            break;
        case 2:
            p.read(LapData);
            break;
        case 4:
            p.read(Participants);
            break;
        case 5:
            p.read(CarSetups);
            break;
        case 6:
            p.read(CarTelemetry);
            break;
        case 7:
            p.read(CarStatus);
            break;
        default:
            console.log('no packet for id: ' + pId);
            break;
    }

    console.log(p);

});

server.bind(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('server running...');
    }
});
