


const Packet = require('../Packet.js');

const CarStatusData = require('./CarStatusData.js');

module.exports = class PacketCarStatusData extends Packet {
	constructor(buffer, pointer, header) {
		super();
		/** @private */
		this.buffer = buffer;
		/** @private */
		this.pointer = pointer;
		this.header = header;
		/** @type {Array.<CarStatusData> */
		this.carStatusData = [];
	}

	parse() {
		this
//			.PacketHeader('header')
			.CarStatusData('carStatusData', 22)
	}

}

