


int8 = function(p) {
    const value = p.buf.readInt8(p.pointer);
    p.pointer += 1;
    return value;
}
uint8 = function(p) {
    const value = p.buf.readUInt8(p.pointer);
    p.pointer += 1;
    return value;
}
int16 = function(p) {
    const value = p.buf.readInt16LE(p.pointer);
    p.pointer += 2;
    return value;
}
uint16 = function(p) {
    const value = p.buf.readUInt16LE(p.pointer);
    p.pointer += 2;
    return value;
}
float = function(p) {
    const value = p.buf.readFloatLE(p.pointer);
    p.pointer += 4;
    return value;
}
uint32 = function(p) {
    const value = p.buf.readUInt32LE(p.pointer);
    p.pointer += 4;
    return value;
}
uint64 = function(p) {
    p.pointer += 8;
    return 0;
}
char = function(p, length) {
    const value = (p.buf.slice(p.pointer, p.pointer + length).toString()).replace(/\x00/g, '');
    p.pointer += length;
    return value;
}

module.exports = {
    int8,
    uint8,
    int16,
    uint16,
    float,
    uint32,
    uint64,
    char
}
