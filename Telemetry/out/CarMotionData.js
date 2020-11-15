


const Reader = require('../Reader.js');


module.exports = class CarMotionData extends Reader {
	constructor(buffer, pointer, header) {
		super();
		/** @private */
		this.buffer = buffer;
		/** @private */
		this.pointer = pointer;
		this.worldPositionX = 0;
		this.worldPositionY = 0;
		this.worldPositionZ = 0;
		this.worldVelocityX = 0;
		this.worldVelocityY = 0;
		this.worldVelocityZ = 0;
		this.worldForwardDirX = 0;
		this.worldForwardDirY = 0;
		this.worldForwardDirZ = 0;
		this.worldRightDirX = 0;
		this.worldRightDirY = 0;
		this.worldRightDirZ = 0;
		this.gForceLateral = 0;
		this.gForceLongitudinal = 0;
		this.gForceVertical = 0;
		this.yaw = 0;
		this.pitch = 0;
		this.roll = 0;
	}

	parse() {
		this
			.float('worldPositionX')
			.float('worldPositionY')
			.float('worldPositionZ')
			.float('worldVelocityX')
			.float('worldVelocityY')
			.float('worldVelocityZ')
			.int16('worldForwardDirX')
			.int16('worldForwardDirY')
			.int16('worldForwardDirZ')
			.int16('worldRightDirX')
			.int16('worldRightDirY')
			.int16('worldRightDirZ')
			.float('gForceLateral')
			.float('gForceLongitudinal')
			.float('gForceVertical')
			.float('yaw')
			.float('pitch')
			.float('roll')
	}

}

