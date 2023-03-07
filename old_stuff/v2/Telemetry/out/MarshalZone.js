


const Reader = require('../Reader.js');


module.exports = class MarshalZone extends Reader {
	constructor(buffer, pointer, header) {
		super();
		/** @private */
		this.buffer = buffer;
		/** @private */
		this.pointer = pointer;
		this.zoneStart = 0;
		this.zoneFlag = 0;
	}

	parse() {
		this
			.float('zoneStart')
			.int8('zoneFlag')
	}

}

