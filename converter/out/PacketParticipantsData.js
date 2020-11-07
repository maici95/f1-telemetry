// packet : PacketParticipantsData


export default function PacketParticipantsData(struct) {
struct
    .uint8('numActiveCars')
    .ParticipantData('participants', 22)
}
