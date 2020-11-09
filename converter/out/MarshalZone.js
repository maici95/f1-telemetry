// packet : MarshalZone


module.exports = function MarshalZone(struct) {
struct
    .float('zoneStart')
    .int8('zoneFlag')
}
