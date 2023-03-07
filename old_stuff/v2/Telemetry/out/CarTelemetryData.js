


const Reader = require('../Reader.js');


module.exports = class CarTelemetryData extends Reader {
	constructor(buffer, pointer, header) {
		super();
		/** @private */
		this.buffer = buffer;
		/** @private */
		this.pointer = pointer;
		this.speed = 0;
		this.throttle = 0;
		this.steer = 0;
		this.brake = 0;
		this.clutch = 0;
		this.gear = 0;
		this.engineRPM = 0;
		this.drs = 0;
		this.revLightsPercent = 0;
		this.brakesTemperature = [];
		this.tyresSurfaceTemperature = [];
		this.tyresInnerTemperature = [];
		this.engineTemperature = 0;
		this.tyresPressure = [];
		this.surfaceType = [];
	}

	parse() {
		this
			.uint16('speed')
			.float('throttle')
			.float('steer')
			.float('brake')
			.uint8('clutch')
			.int8('gear')
			.uint16('engineRPM')
			.uint8('drs')
			.uint8('revLightsPercent')
			.uint16('brakesTemperature', 4)
			.uint8('tyresSurfaceTemperature', 4)
			.uint8('tyresInnerTemperature', 4)
			.uint16('engineTemperature')
			.float('tyresPressure', 4)
			.uint8('surfaceType', 4)
	}

}

