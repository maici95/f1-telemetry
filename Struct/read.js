


import Struct from './index.js';


/** @param {Struct} struct */
export function readUInt8(struct) {
    const value = struct.buffer.readUInt8(struct.pointer);
    struct.pointer++;
    return value;
}

/** @param {Struct} struct */
export function readInt8(struct) {
    const value = struct.buffer.readInt8(struct.pointer);
    struct.pointer++;
    return value;
}

/** @param {Struct} struct */
export function readUInt16(struct) {
    const value = struct.buffer.readUInt16LE(struct.pointer);
    struct.pointer += 2;
    return value;
}

/** @param {Struct} struct */
export function readInt16(struct) {
    const value = struct.buffer.readInt16LE(struct.pointer);
    struct.pointer += 2;
    return value;
}

/** @param {Struct} struct */
export function readUInt32(struct) {
    const value = struct.buffer.readUInt32LE(struct.pointer);
    struct.pointer += 4;
    return value;
}

/** @param {Struct} struct */
export function readInt32(struct) {
    const value = struct.buffer.readInt32LE(struct.pointer);
    struct.pointer += 4;
    return value;
}

/** @param {Struct} struct */
export function readInt64(struct) {
    const value = struct.buffer.readBigInt64LE(sturct.pointer);
    struct.pointer += 8;
    return value;
}

/** @param {Struct} struct */
export function readUInt64(struct) {
    const value = struct.buffer.readBigUInt64LE(struct.pointer);
    struct.pointer += 8;
    return value;
}

/** @param {Struct} struct */
export function readFloat(struct) {
    const value = struct.buffer.readFloatLE(struct.pointer);
    struct.pointer += 4;
    return value;
}

/** @param {Struct} struct */
export function readDouble(struct) {
    const value = struct.buffer.readDoubleLE(struct.pointer);
    struct.pointer += 8;
    return value;
}

/** @param {Struct} struct */
export function readChar(struct, length) {
    const value = struct.buffer.slice(struct.pointer, struct.pointer + length).toString().split('\x00')[0];
    struct.pointer += length;
    return value;
}
