


const Reader = require('../Reader.js');


module.exports = class LobbyInfoData extends Reader {
	constructor(buffer, pointer, header) {
		super();
		/** @private */
		this.buffer = buffer;
		/** @private */
		this.pointer = pointer;
		this.aiControlled = 0;
		this.teamId = 0;
		this.nationality = 0;
		this.name = [];
		this.readyStatus = 0;
	}

	parse() {
		this
			.uint8('aiControlled')
			.uint8('teamId')
			.uint8('nationality')
			.char('name', 48)
			.uint8('readyStatus')
	}

}

