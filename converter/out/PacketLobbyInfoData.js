// packet : PacketLobbyInfoData


module.exports = function PacketLobbyInfoData(struct) {
struct
	.uint8('numPlayers')
	.LobbyInfoData('lobbyPlayers', 22)
}
