


const Parse = require('./Parse');
const PacketHeader = require('./Packets/PacketHeader');
const MotionPacket = require('./Packets/MotionPacket');
const SessionPacket = require('./Packets/SessionPacket');
const LapData = require('./Packets/LapData');
const Participants = require('./Packets/Participants');
const CarSetups = require('./Packets/CarSetups');
const CarTelemetry = require('./Packets/CarTelemetry');
const CarStatus = require('./Packets/CarStatus');
const EventPacket = require('./Packets/EventPacket');


// Parser class
module.exports = class Parser {
    constructor(buf) {
        this.buf = buf || null;
        this.pointer = 0;

        this.data = {}
        this.temp = {}
        this.array = [];

        this.read(PacketHeader);
        this.readBody(this.data.PacketHeader.packetId);
    }

    /**
     * Read data from buffer
     */
    read(packet) {
        packet(this);
    }

    /**
     * Read packet's body
     */
    readBody(pId) {
        switch (pId) {
            case 0:
                this.read(MotionPacket);
                break;
            case 1:
                this.read(SessionPacket);
                break;
            case 2:
                this.read(LapData);
                break;
            case 3:
                this.read(EventPacket);
                break;
            case 4:
                this.read(Participants);
                break;
            case 5:
                this.read(CarSetups);
                break;
            case 6:
                this.read(CarTelemetry);
                break;
            case 7:
                this.read(CarStatus);
                break;
            default:
                console.log('no packet for id: ' + pId);
                break;
        }
    }

    /**
     * Create new object in data object
     */
    createObject(key) {
        this.data[key] = {}
        return this;
    }

    /**
     * Save temp object in data object
     */
    saveObject(key) {
        this.data[key] = this.temp;
        this.temp = {}
        return this;
    }
    /**
     * Merge data[key] and temp objects
     */
    addToObject(key) {
        this.data[key] = {
            ...this.data[key],
            ...this.temp
        }
        this.temp = {}
        return this;
    }

    /**
     * Push temp object to array
     */
    toArray() {
        this.array.push(this.temp);
        this.temp = {}
        return this;
    }

    /**
     * Add array in data object
     */
    saveArray(key) {
        this.data[key] = this.array;
        this.array = [];
        return this;
    }

    /**
     *
     */
    saveArrayTo(key, key2) {
        this.data[key] = {
            ...this.data[key],
            [key2]: this.array
        }
        this.array = [];
        return this;
    }

    int8(key) {
        this.temp[key] = Parse.int8(this);
        return this;
    }
    uint8(key) {
        this.temp[key] = Parse.uint8(this);
        return this;
    }
    int16(key) {
        this.temp[key] = Parse.int16(this);
        return this;
    }
    uint16(key) {
        this.temp[key] = Parse.uint16(this);
        return this;
    }
    float(key) {
        this.temp[key] = Parse.float(this);
        return this;
    }
    uint32(key) {
        this.temp[key] = Parse.uint32(this);
        return this;
    }
    uint64(key) {
        this.temp[key] = Parse.uint64(this);
        return this;
    }
    char(key, length) {
        this.temp[key] = Parse.char(this, length);
        return this;
    }
    arr(key, type, length) {
        const array = [];
        for (let i = 0; i < length; i++) {
            const value = arrayVal(type)(this);
            array.push(value);
        }
        this.temp[key] = array;
        return this;
    }

}

const arrayVal = type => ({
    uint8: Parse.uint8,
    uint16: Parse.uint16,
    float: Parse.float
}[type]);
