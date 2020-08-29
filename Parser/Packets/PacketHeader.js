


// packet header
module.exports = function PacketHeader(p) {
    p
        .uint16('packetFormat')
        .uint8('gameMajorVersion')
        .uint8('gameMinorVersion')
        .uint8('packetVersion')
        .uint8('packetId')
        .uint64('sessionUID')
        .float('sessionTime')
        .uint32('frameIdentifier')
        .uint8('playerCarIndex')
        .uint8('secondaryPlayerCarIndex')
        .saveObject('PacketHeader');
}
