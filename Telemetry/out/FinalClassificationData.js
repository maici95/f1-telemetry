


const Reader = require('../Reader.js');


module.exports = class FinalClassificationData extends Reader {
	constructor(buffer, pointer, header) {
		super();
		/** @private */
		this.buffer = buffer;
		/** @private */
		this.pointer = pointer;
		this.position = 0;
		this.numLaps = 0;
		this.gridPosition = 0;
		this.points = 0;
		this.numPitStops = 0;
		this.resultStatus = 0;
		this.bestLapTime = 0;
		this.totalRaceTime = 0;
		this.penaltiesTime = 0;
		this.numPenalties = 0;
		this.numTyreStints = 0;
		this.tyreStintsActual = [];
		this.tyreStintsVisual = [];
	}

	parse() {
		this
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

}

