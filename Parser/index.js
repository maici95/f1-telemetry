


const Parse = require('./Parse');

// Parser class
module.exports = class Parser {
    constructor(buf) {
        this.buf = buf || null;
        this.pointer = 0;

        this.data = {}
        this.temp = {}
        this.array = []
    }

    /**
     * Read data from buffer
     */
    read(packet) {
        packet(this);
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
     * Save array in data object
     */
    saveArray(key) {
        this.data[key] = this.array;
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
