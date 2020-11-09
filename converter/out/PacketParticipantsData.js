// packet : PacketParticipantsData


module.exports = function PacketParticipantsData(struct) {
struct
    .uint8('numActiveCars')
    .ParticipantData('participants', 22)
}
