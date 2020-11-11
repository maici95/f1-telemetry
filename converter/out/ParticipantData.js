// packet : ParticipantData


module.exports = function ParticipantData(struct) {
struct
	.uint8('aiControlled')
	.uint8('driverId')
	.uint8('teamId')
	.uint8('raceNumber')
	.uint8('nationality')
	.char('name', 48)
	.uint8('yourTelemetry')
}
