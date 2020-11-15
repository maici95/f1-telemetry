


const Struct = require('./index.js');


/** @param {Struct} struct */
const readUInt8 = function(struct) {
    const value = struct.buffer.readUInt8(struct.pointer);
    struct.pointer++;
    return value;
}

/** @param {Struct} struct */
const readInt8 = function(struct) {
    const value = struct.buffer.readInt8(struct.pointer);
    struct.pointer++;
    return value;
}

/** @param {Struct} struct */
const readUInt16 = function(struct) {
    const value = struct.buffer.readUInt16LE(struct.pointer);
    struct.pointer += 2;
    return value;
}

/** @param {Struct} struct */
const readInt16 = function(struct) {
    const value = struct.buffer.readInt16LE(struct.pointer);
    struct.pointer += 2;
    return value;
}

/** @param {Struct} struct */
const readUInt32 = function(struct) {
    const value = struct.buffer.readUInt32LE(struct.pointer);
    struct.pointer += 4;
    return value;
}

/** @param {Struct} struct */
const readInt32 = function(struct) {
    const value = struct.buffer.readInt32LE(struct.pointer);
    struct.pointer += 4;
    return value;
}

/** @param {Struct} struct */
const readInt64 = function(struct) {
    const value = 0;
    struct.pointer += 8;
    return value;
}

/** @param {Struct} struct */
const readUInt64 = function(struct) {
    const value = 0;
    struct.pointer += 8;
    return value;
}

/** @param {Struct} struct */
const readFloat = function(struct) {
    const value = struct.buffer.readFloatLE(struct.pointer);
    struct.pointer += 4;
    return value;
}

/** @param {Struct} struct */
const readDouble = function(struct) {
    const value = struct.buffer.readDoubleLE(struct.pointer);
    struct.pointer += 8;
    return value;
}

/** @param {Struct} struct */
const readChar = function(struct, length) {
    const value = struct.buffer.slice(struct.pointer, struct.pointer + length).toString().split('\x00')[0];
    struct.pointer += length;
    return value;
}

module.exports = {
    readUInt8,
    readInt8,
    readUInt16,
    readInt16,
    readUInt32,
    readInt32,
    readUInt64,
    readInt64,
    readFloat,
    readDouble,
    readChar
}
