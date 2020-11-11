// packet : LobbyInfoData


module.exports = function LobbyInfoData(struct) {
struct
	.uint8('aiControlled')
	.uint8('teamId')
	.uint8('nationality')
	.char('name', 48)
	.uint8('readyStatus')
}
