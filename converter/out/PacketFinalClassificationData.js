// packet : PacketFinalClassificationData


module.exports = function PacketFinalClassificationData(struct) {
struct
    .uint8('numCars')
    .FinalClassificationData('classificationData', 22)
}
