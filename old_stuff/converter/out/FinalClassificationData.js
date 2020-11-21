// packet : FinalClassificationData


module.exports = function FinalClassificationData(struct) {
struct
	.uint8('position')
	.uint8('numLaps')
	.uint8('gridPosition')
	.uint8('points')
	.uint8('numPitStops')
	.uint8('resultStatus')
	.float('bestLapTime')
	.double('totalRaceTime')
	.uint8('penaltiesTime')
	.uint8('numPenalties')
	.uint8('numTyreStints')
	.uint8('tyreStintsActual', 8)
	.uint8('tyreStintsVisual', 8)
}
