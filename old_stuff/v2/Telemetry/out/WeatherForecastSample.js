


const Reader = require('../Reader.js');


module.exports = class WeatherForecastSample extends Reader {
	constructor(buffer, pointer, header) {
		super();
		/** @private */
		this.buffer = buffer;
		/** @private */
		this.pointer = pointer;
		this.sessionType = 0;
		this.timeOffset = 0;
		this.weather = 0;
		this.trackTemperature = 0;
		this.airTemperature = 0;
	}

	parse() {
		this
			.uint8('sessionType')
			.uint8('timeOffset')
			.uint8('weather')
			.int8('trackTemperature')
			.int8('airTemperature')
	}

}

