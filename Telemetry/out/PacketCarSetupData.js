


const Packet = require('../Packet.js');

const CarSetupData = require('./CarSetupData.js');

module.exports = class PacketCarSetupData extends Packet {
	constructor(buffer, pointer, header) {
		super();
		/** @private */
		this.buffer = buffer;
		/** @private */
		this.pointer = pointer;
		this.header = header;
		/** @type {Array.<CarSetupData> */
		this.carSetups = [];
	}

	parse() {
		this
//			.PacketHeader('header')
			.CarSetupData('carSetups', 22)
	}

}

