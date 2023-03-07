


const Packet = require('../Packet.js');

const CarTelemetryData = require('./CarTelemetryData.js');

module.exports = class PacketCarTelemetryData extends Packet {
	constructor(buffer, pointer, header) {
		super();
		/** @private */
		this.buffer = buffer;
		/** @private */
		this.pointer = pointer;
		this.header = header;
		/** @type {Array.<CarTelemetryData> */
		this.carTelemetryData = [];
		this.buttonStatus = 0;
		this.mfdPanelIndex = 0;
		this.mfdPanelIndexSecondaryPlayer = 0;
		this.suggestedGear = 0;
	}

	parse() {
		this
//			.PacketHeader('header')
			.CarTelemetryData('carTelemetryData', 22)
			.uint32('buttonStatus')
			.uint8('mfdPanelIndex')
			.uint8('mfdPanelIndexSecondaryPlayer')
			.int8('suggestedGear')
	}

}

