


const Reader = require('../Reader.js');


module.exports = class LapData extends Reader {
	constructor(buffer, pointer, header) {
		super();
		/** @private */
		this.buffer = buffer;
		/** @private */
		this.pointer = pointer;
		this.lastLapTime = 0;
		this.currentLapTime = 0;
		this.sector1TimeInMS = 0;
		this.sector2TimeInMS = 0;
		this.bestLapTime = 0;
		this.bestLapNum = 0;
		this.bestLapSector1TimeInMS = 0;
		this.bestLapSector2TimeInMS = 0;
		this.bestLapSector3TimeInMS = 0;
		this.bestOverallSector1TimeInMS = 0;
		this.bestOverallSector1LapNum = 0;
		this.bestOverallSector2TimeInMS = 0;
		this.bestOverallSector2LapNum = 0;
		this.bestOverallSector3TimeInMS = 0;
		this.bestOverallSector3LapNum = 0;
		this.lapDistance = 0;
		this.totalDistance = 0;
		this.safetyCarDelta = 0;
		this.carPosition = 0;
		this.currentLapNum = 0;
		this.pitStatus = 0;
		this.sector = 0;
		this.currentLapInvalid = 0;
		this.penalties = 0;
		this.gridPosition = 0;
		this.driverStatus = 0;
		this.resultStatus = 0;
	}

	parse() {
		this
			.float('lastLapTime')
			.float('currentLapTime')
			.uint16('sector1TimeInMS')
			.uint16('sector2TimeInMS')
			.float('bestLapTime')
			.uint8('bestLapNum')
			.uint16('bestLapSector1TimeInMS')
			.uint16('bestLapSector2TimeInMS')
			.uint16('bestLapSector3TimeInMS')
			.uint16('bestOverallSector1TimeInMS')
			.uint8('bestOverallSector1LapNum')
			.uint16('bestOverallSector2TimeInMS')
			.uint8('bestOverallSector2LapNum')
			.uint16('bestOverallSector3TimeInMS')
			.uint8('bestOverallSector3LapNum')
			.float('lapDistance')
			.float('totalDistance')
			.float('safetyCarDelta')
			.uint8('carPosition')
			.uint8('currentLapNum')
			.uint8('pitStatus')
			.uint8('sector')
			.uint8('currentLapInvalid')
			.uint8('penalties')
			.uint8('gridPosition')
			.uint8('driverStatus')
			.uint8('resultStatus')
	}

}

