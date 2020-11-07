// packet : PacketFinalClassificationData


export default function PacketFinalClassificationData(struct) {
struct
    .uint8('numCars')
    .FinalClassificationData('classificationData', 22)
}
