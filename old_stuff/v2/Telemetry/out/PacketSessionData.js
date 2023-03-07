


const Packet = require('../Packet.js');

const MarshalZone = require('./MarshalZone.js');
const WeatherForecastSample = require('./WeatherForecastSample.js');

module.exports = class PacketSessionData extends Packet {
	constructor(buffer, pointer, header) {
		super();
		/** @private */
		this.buffer = buffer;
		/** @private */
		this.pointer = pointer;
		this.header = header;
		this.weather = 0;
		this.trackTemperature = 0;
		this.airTemperature = 0;
		this.totalLaps = 0;
		this.trackLength = 0;
		this.sessionType = 0;
		this.trackId = 0;
		this.formula = 0;
		this.sessionTimeLeft = 0;
		this.sessionDuration = 0;
		this.pitSpeedLimit = 0;
		this.gamePaused = 0;
		this.isSpectating = 0;
		this.spectatorCarIndex = 0;
		this.sliProNativeSupport = 0;
		this.numMarshalZones = 0;
		/** @type {Array.<MarshalZone> */
		this.marshalZones = [];
		this.safetyCarStatus = 0;
		this.networkGame = 0;
		this.numWeatherForecastSamples = 0;
		/** @type {Array.<WeatherForecastSample> */
		this.weatherForecastSamples = [];
	}

	parse() {
		this
//			.PacketHeader('header')
			.uint8('weather')
			.int8('trackTemperature')
			.int8('airTemperature')
			.uint8('totalLaps')
			.uint16('trackLength')
			.uint8('sessionType')
			.int8('trackId')
			.uint8('formula')
			.uint16('sessionTimeLeft')
			.uint16('sessionDuration')
			.uint8('pitSpeedLimit')
			.uint8('gamePaused')
			.uint8('isSpectating')
			.uint8('spectatorCarIndex')
			.uint8('sliProNativeSupport')
			.uint8('numMarshalZones')
			.MarshalZone('marshalZones', 21)
			.uint8('safetyCarStatus')
			.uint8('networkGame')
			.uint8('numWeatherForecastSamples')
			.WeatherForecastSample('weatherForecastSamples', 20)
	}

}

