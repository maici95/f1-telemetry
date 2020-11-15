


const Reader = require('../Reader.js');


module.exports = class CarSetupData extends Reader {
	constructor(buffer, pointer, header) {
		super();
		/** @private */
		this.buffer = buffer;
		/** @private */
		this.pointer = pointer;
		this.frontWing = 0;
		this.rearWing = 0;
		this.onThrottle = 0;
		this.offThrottle = 0;
		this.frontCamber = 0;
		this.rearCamber = 0;
		this.frontToe = 0;
		this.rearToe = 0;
		this.frontSuspension = 0;
		this.rearSuspension = 0;
		this.frontAntiRollBar = 0;
		this.rearAntiRollBar = 0;
		this.frontSuspensionHeight = 0;
		this.rearSuspensionHeight = 0;
		this.brakePressure = 0;
		this.brakeBias = 0;
		this.rearLeftTyrePressure = 0;
		this.rearRightTyrePressure = 0;
		this.frontLeftTyrePressure = 0;
		this.frontRightTyrePressure = 0;
		this.ballast = 0;
		this.fuelLoad = 0;
	}

	parse() {
		this
			.uint8('frontWing')
			.uint8('rearWing')
			.uint8('onThrottle')
			.uint8('offThrottle')
			.float('frontCamber')
			.float('rearCamber')
			.float('frontToe')
			.float('rearToe')
			.uint8('frontSuspension')
			.uint8('rearSuspension')
			.uint8('frontAntiRollBar')
			.uint8('rearAntiRollBar')
			.uint8('frontSuspensionHeight')
			.uint8('rearSuspensionHeight')
			.uint8('brakePressure')
			.uint8('brakeBias')
			.float('rearLeftTyrePressure')
			.float('rearRightTyrePressure')
			.float('frontLeftTyrePressure')
			.float('frontRightTyrePressure')
			.uint8('ballast')
			.float('fuelLoad')
	}

}

