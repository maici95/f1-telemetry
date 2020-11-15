


const Reader = require('../Reader.js');


module.exports = class ParticipantData extends Reader {
	constructor(buffer, pointer, header) {
		super();
		/** @private */
		this.buffer = buffer;
		/** @private */
		this.pointer = pointer;
		this.aiControlled = 0;
		this.driverId = 0;
		this.teamId = 0;
		this.raceNumber = 0;
		this.nationality = 0;
		this.name = [];
		this.yourTelemetry = 0;
	}

	parse() {
		this
			.uint8('aiControlled')
			.uint8('driverId')
			.uint8('teamId')
			.uint8('raceNumber')
			.uint8('nationality')
			.char('name', 48)
			.uint8('yourTelemetry')
	}

}

