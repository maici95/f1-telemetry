


const Reader = require('./Reader');
const lapData = require('./out/LapData');
const marshalZone = require('./out/MarshalZone');
const weatherForecastSample = require('./out/WeatherForecastSample');
const carMotionData = require('./out/CarMotionData');
const participantData = require('./out/ParticipantData');
const carSetupData = require('./out/CarSetupData');
const carTelemetryData = require('./out/CarTelemetryData');
const carStatusData = require('./out/CarStatusData');

module.exports = class Packet extends Reader {
    constructor(buffer) {
        super();
        this.buffer = buffer;
        this.pointer = 0;
    }

    getHeader() {
        return ({
            packetFormat: this.packetFormat,
            gameMajorVersion: this.gameMajorVersion,
            gameMinorVersion: this.gameMinorVersion,
            packetVersion: this.packetVersion,
            packetId: this.packetId,
            sessionUID: this.sessionUID,
            sessionTime: this.sessionTime,
            frameIdentifier: this.frameIdentifier,
            playerCarIndex: this.playerCarIndex,
            secondaryPlayerCarIndex: this.secondaryPlayerCarIndex,
        });
    }

    /** @private */
    LapData(key, length) {
        this.readSubPacket(lapData, key, length);
        return this;
    }

    /** @private */
    MarshalZone(key, length) {
        this.readSubPacket(marshalZone, key, length);        
        return this;
    }

    /** @private */
    WeatherForecastSample(key, length) {
        this.readSubPacket(weatherForecastSample, key, length);        
        return this;
    }

    /** @private */
    CarMotionData(key, length) {
        this.readSubPacket(carMotionData, key, length);
        return this;
    }

    /** @private */
    ParticipantData(key, length) {
        this.readSubPacket(participantData, key, length);
        return this;
    }

    /** @private */
    CarSetupData(key, length) {
        this.readSubPacket(carSetupData, key, length);
        return this;
    }

    /** @private */
    CarTelemetryData(key, length) {
        this.readSubPacket(carTelemetryData, key, length);
        return this;
    }

    /** @private */
    CarStatusData(key, length) {
        this.readSubPacket(carStatusData, key, length);
        return this;
    }

    /** @private */
    readSubPacket(type, key, length) {
        for (let i = 0; i < length; i++) {
            const subPacket = new type(this.buffer, this.pointer);
            subPacket.parse(this);
            this.pointer = subPacket.pointer;
            delete subPacket.buffer;
            delete subPacket.pointer;
            this[key].push(subPacket);
        }
    }

}
