


const Packet = require('../Packet.js');

const ParticipantData = require('./ParticipantData.js');

module.exports = class PacketParticipantsData extends Packet {
	constructor(buffer, pointer, header) {
		super();
		/** @private */
		this.buffer = buffer;
		/** @private */
		this.pointer = pointer;
		this.header = header;
		this.numActiveCars = 0;
		/** @type {Array.<ParticipantData> */
		this.participants = [];
	}

	parse() {
		this
//			.PacketHeader('header')
			.uint8('numActiveCars')
			.ParticipantData('participants', 22)
	}

}

