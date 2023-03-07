


const Packet = require('../Packet.js');

const LapData = require('./LapData.js');

module.exports = class PacketLapData extends Packet {
	constructor(buffer, pointer, header) {
		super();
		/** @private */
		this.buffer = buffer;
		/** @private */
		this.pointer = pointer;
		this.header = header;
		/** @type {Array.<LapData> */
		this.lapData = [];
	}

	parse() {
		this
//			.PacketHeader('header')
			.LapData('lapData', 22)
	}

}

