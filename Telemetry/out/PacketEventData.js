


const Packet = require('../Packet.js');


module.exports = class PacketEventData extends Packet {
	constructor(buffer, pointer, header) {
		super();
		/** @private */
		this.buffer = buffer;
		/** @private */
		this.pointer = pointer;
		this.header = header;
		this.eventStringCode = [];
	}

	parse() {
		this
//			.PacketHeader('header')
			.uint8('eventStringCode', 4)
	}

}

