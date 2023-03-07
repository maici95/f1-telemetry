


const Read = require('./read');

const read = type => ({
    uint8: Read.readUInt8,
    int8: Read.readInt8,
    uint16: Read.readUInt16,
    int16: Read.readInt16,
    uint32: Read.readUInt32,
    uint64: Read.readUInt64,
    float: Read.readFloat,
    double: Read.readDouble,
    char: Read.readChar
}[type]);

module.exports = class Reader {
    constructor() {
        this.buffer;
        this.pointer = 0;
    }

    /** @private */
    uint8(key, length) {
        this.read('uint8', key, length);
        return this;
    }
    /** @private */
    int8(key, length) {
        this.read('int8', key, length);
        return this;
    }
    /** @private */
    uint16(key, length) {
        this.read('uint16', key, length);
        return this;
    }
    /** @private */
    int16(key, length) {
        this.read('int16', key, length);
        return this;
    }
    /** @private */
    uint32(key, length) {
        this.read('uint32', key, length);
        return this;
    }
    /** @private */
    uint64(key, length) {
        this.read('uint64', key, length);
        return this;
    }
    /** @private */
    float(key, length) {
        this.read('float', key, length);
        return this;
    }
    /** @private */
    double(key, length) {
        this.read('double', key, length);
        return this;
    }
    /** @private */
    char(key, length) {
        //this.read('char', key, length);
        this[key] = Read.readChar(this, length);
        return this;
    }

    /** @private */
    read(type, key, length) {
        if (!length) {
            this[key] = read(type)(this);
        } else {
            const array = Array(length);
            let r = read(type);
            for (let i = 0; i < length; i++) {
                array[i] = r(this);
            }
            this[key] = array;
        }
    }

}
