


const dgram = require('dgram');
//const server = dgram.createSocket('udp4');

const PacketHeader = require('./out/PacketHeader');
const PacketCarStatusData = require('./out/PacketCarStatusData');
const PacketCarSetupData = require('./out/PacketCarSetupData');
const PacketCarTelemetryData = require('./out/PacketCarTelemetryData');
const PacketEventData = require('./out/PacketEventData');
const PacketFinalClassificationData = require('./out/PacketFinalClassificationData');
const PacketLapData = require('./out/PacketLapData');
const PacketLobbyInfoData = require('./out/PacketLobbyInfoData');
const PacketMotionData = require('./out/PacketMotionData');
const PacketParticipantsData = require('./out/PacketParticipantsData');
const PacketSessionData = require('./out/PacketSessionData');

class OnUpdateItem {
    constructor(f, packets) {
        this.f = f;
        this.packets = packets || '*';
    }
}

module.exports = class Telemetry {
    /**
     * @param {Number} port Port number for receiving packets. If port number present, start server.
     * @description 
     */
    constructor(port) {
        /** @private */
        this.server = dgram.createSocket('udp4');
        /**
         * @type {Array.<OnUpdateItem>}
         * @private
         */
        this.onUpdateList = [];

        /** @type {PacketMotionData} */
        this.motion = {};
        /** @type {PacketSessionData} */
        this.session = {};
        /** @type {PacketLapData} */
        this.lapData = {};
        /** @description nothing here */
        this.event = {};
        /** @type {PacketParticipantsData} */
        this.participants = {};
        /** @type {PacketCarSetupData} */
        this.carSetups = {};
        /** @type {PacketCarTelemetryData} */
        this.carTelemetry = {};
        /** @type {PacketCarStatusData} */
        this.carStatus = {};
        /** @description nothing here */
        this.finalClassification = {};
        /** @description nothing here */
        this.lobbyInfo = {};
        
        if (port) {
            this.bind(port);
        }

    }

    /**
     * @param {Function} f 
     * @param {Array.<String>} packets 
     * @description This function will be called when given packet or packets are received from game.
     *              If packets parameter is not present, function will be called on every packet.
     */
    addOnUpdate(f, packets) {
        this.onUpdateList.push(
            new OnUpdateItem(f, packets)
        );
    }

    /** @private */
    onUpdate(packetName) {
        for (let i of this.onUpdateList) {
            if (i.packets === '*') {
                i.f(packetName);
                continue;                
            }
            for (let j of i.packets) {
                if (packetName === j) {
                    i.f(packetName);
                }
            }
        }
    }

    bind(port) {
        if (!port) {
            console.log('Could not start server! Port missing.');
            return;
        }
        this.server.bind(port);

        this.server.on('message', (buffer, rinfo) => {
            let packet = new PacketHeader(buffer);
            packet.parse();
            let p;
        
            switch (packet.getHeader().packetId) {
                case 0:
                    p = new PacketMotionData(packet.buffer, packet.pointer, packet.getHeader());
                    p.parse();
                    this.motion = p;
                    this.onUpdate('motion');
                break;
                case 1:
                    p = new PacketSessionData(packet.buffer, packet.pointer, packet.getHeader());
                    p.parse();
                    this.session = p;
                    this.onUpdate('session');
                break;
                case 2:
                    p = new PacketLapData(packet.buffer, packet.pointer, packet.getHeader());
                    p.parse();
                    this.lapData = p;
                    this.onUpdate('lapData');
                break;
                case 3:
                    // Missing
                break;
                case 4:
                    p = new PacketParticipantsData(packet.buffer, packet.pointer, packet.getHeader());
                    p.parse();
                    this.participants = p;
                    this.onUpdate('participants');
                break;
                case 5:
                    p = new PacketCarSetupData(packet.buffer, packet.pointer, packet.getHeader());
                    p.parse();
                    this.carSetups = p;
                    this.onUpdate('carSetups');
                break;
                case 6:
                    p = new PacketCarTelemetryData(packet.buffer, packet.pointer, packet.getHeader());
                    p.parse();
                    this.carTelemetry = p;
                    this.onUpdate('carTelemetry');
                break;
                case 7:
                    p = new PacketCarStatusData(packet.buffer, packet.pointer, packet.getHeader());
                    p.parse();
                    this.carStatus = p;
                    this.onUpdate('carStatus');
                break;
                case 8:
                    // Missing
                break;
                case 9:
                    // Missing
                break;
                default:
                    console.log('error: unidentified packet.');
                break;
            } 
        });

        console.log('Server listening port: ' + port);
    }
}
