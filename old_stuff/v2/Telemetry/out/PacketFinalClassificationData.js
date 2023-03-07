


const Packet = require('../Packet.js');

const FinalClassificationData = require('./FinalClassificationData.js');

module.exports = class PacketFinalClassificationData extends Packet {
	constructor(buffer, pointer, header) {
		super();
		/** @private */
		this.buffer = buffer;
		/** @private */
		this.pointer = pointer;
		this.header = header;
		this.numCars = 0;
		/** @type {Array.<FinalClassificationData> */
		this.classificationData = [];
	}

	parse() {
		this
//			.PacketHeader('header')
			.uint8('numCars')
			.FinalClassificationData('classificationData', 22)
	}

}

