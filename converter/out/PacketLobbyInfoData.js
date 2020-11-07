// packet : PacketLobbyInfoData


export default function PacketLobbyInfoData(struct) {
struct
    .uint8('numPlayers')
    .LobbyInfoData('lobbyPlayers', 22)
}
