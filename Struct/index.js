


//const { readFloat, readInt16, readInt32, readInt64, readInt8, readUInt16, readUInt32, readUInt64, readUInt8, readChar, readDouble } = require('./read.js');

const Read = require('./read');
//const { readFloat, readInt16, readInt32, readInt64, readInt8, readUInt16, readUInt32, readUInt64, readUInt8, readChar, readDouble } = Read;

/**
 * @param {String} key
 * @returns {Function}
*/
const Reader = key => ({
    uint8: Read.readUInt8,
    int8: Read.readInt8,
    uint16: Read.readUInt16,
    int16: Read.readInt16,
    uint32: Read.readUInt32,
    int32: Read.readInt32,
    uint64: Read.readUInt64,
    int64: Read.readInt64,
    float: Read.readFloat,
    double: Read.readDouble,
    char: Read.readChar
}[key]);

module.exports = class Struct {
    /**
     * @param {Buffer} buffer 
     */
    constructor(buffer) {
        /** @type {Buffer} */
        this.buffer = buffer || null;
        /** @type {number} */
        this.pointer = 0;
        /** @type {array} */
        this.data = {};
        this.tmp = {};
    }

    reset() {
        this.buffer = null;
        this.pointer = 0;
        this.data = {};
        this.tmp = {};
    }

    setBuffer(buffer) {
        this.buffer = buffer;
    }

    /**
     * @param {Function} type 
     */
    use(type) {
        this[type.name] = (key, length) => {
            this.data['test'] = {...this.data['test'], ...this.tmp};
            this.tmp = {};

            const array = Array(length);
            for (let i = 0; i < length; i++) {
                type(this);
                array[i] = this.tmp;
                this.tmp = {};
            }
            this.data[key] = array;
            
            return this;
        };
        return this;
    }

    /**
     * @param {String} key 
     * @param {Function} struct 
     * @param {Number} length 
     */
    object(key, struct, length) {
        if (!length) {
            struct(this);
            this.data[key] = this.tmp;
            this.tmp = {};
        }
        if (length) {
            const array = Array(length);
            for (let i = 0; i < length; i++) {
                struct(this);
                array[i] = this.tmp;
                this.tmp = {};
            }
            this.data[key] = array;
        }
        return this;
    }

    /**
     * @param {String} type 
     * @param {Number} length 
     * @returns {Array}
     */
    array(type, length) {
        const array = Array(length);
        let reader = Reader(type);
        for (let i = 0; i < length; i++) {
            array[i] = reader(this);
        }
        return array;
    }

    /**
     * @param {String} key 
     * @param {Number} length 
     */
    uint8(key, length) {
        if (!length) {
            this.tmp[key] = Read.readUInt8(this);
        }
        if (length) {
            this.tmp[key] = this.array('uint8', length);
        }
        return this;
    }

    /**
     * @param {String} key 
     * @param {Number} length 
     */
    int8(key, length) {
        if (!length) {
            this.tmp[key] = Read.readInt8(this);
        }
        if (length) {
            this.tmp[key] = this.array('int8', length);
        }
        return this;
    }

    /**
     * @param {String} key 
     * @param {Number} length 
     */
    uint16(key, length) {
        if (!length) {
            this.tmp[key] = Read.readUInt16(this);
        }
        if (length) {
            this.tmp[key] = this.array('uint16', length);
        }
        return this;
    }

    /**
     * @param {String} key 
     * @param {Number} length 
     */
    int16(key, length) {
        if (!length) {
            this.tmp[key] = Read.readInt16(this);
        }
        if (length) {
            this.tmp[key] = this.array('int16', length);
        }
        return this;
    }
    
    /**
     * @param {String} key 
     * @param {Number} length 
     */
    uint32(key, length) {
        if (!length) {
            this.tmp[key] = Read.readUInt32(this);
        }
        if (length) {
            this.tmp[key] = this.array('uint32', length);
        }
        return this;
    }

    /**
     * @param {String} key 
     * @param {Number} length 
     */
    int32(key, length) {
        if (!length) {
            this.tmp[key] = Read.readInt32(this);
        }
        if (length) {
            this.tmp[key] = this.array('int32', length);
        }
        return this;
    }

    /**
     * @param {String} key 
     * @param {Number} length 
     */
    uint64(key, length) {
        if (!length) {
            this.tmp[key] = Read.readUInt64(this);
        }
        if (length) {
            this.tmp[key] = this.array('uint64', length);
        }
        return this;
    }

    /**
     * @param {String} key 
     * @param {Number} length 
     */
    int64(key, length) {
        if (!length) {
            this.tmp[key] = Read.readInt64(this);
        }
        if (length) {
            this.tmp[key] = this.array('int64', length);
        }
        return this;
    }

    /**
     * @param {String} key 
     * @param {Number} length 
     */
    float(key, length) {
        if (!length) {
            this.tmp[key] = Read.readFloat(this);
        }
        if (length) {
            this.tmp[key] = this.array('float', length);
        }
        return this;
    }

    double(key, length) {
        if (!length) {
            this.tmp[key] = Read.readDouble(this);
        }
        return this;
    }

    /**
     * @param {String} key 
     * @param {Number} length 
     */
    char(key, length) {
        if (length) {
            this.tmp[key] = Read.readChar(this, length);
        }
        return this;
    }


}
