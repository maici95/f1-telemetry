


const Packet = require('../Packet.js');

const CarMotionData = require('./CarMotionData.js');

module.exports = class PacketMotionData extends Packet {
	constructor(buffer, pointer, header) {
		super();
		/** @private */
		this.buffer = buffer;
		/** @private */
		this.pointer = pointer;
		this.header = header;
		/** @type {Array.<CarMotionData> */
		this.carMotionData = [];
		this.suspensionPosition = [];
		this.suspensionVelocity = [];
		this.suspensionAcceleration = [];
		this.wheelSpeed = [];
		this.wheelSlip = [];
		this.localVelocityX = 0;
		this.localVelocityY = 0;
		this.localVelocityZ = 0;
		this.angularVelocityX = 0;
		this.angularVelocityY = 0;
		this.angularVelocityZ = 0;
		this.angularAccelerationX = 0;
		this.angularAccelerationY = 0;
		this.angularAccelerationZ = 0;
		this.frontWheelsAngle = 0;
	}

	parse() {
		this
//			.PacketHeader('header')
			.CarMotionData('carMotionData', 22)
			.float('suspensionPosition', 4)
			.float('suspensionVelocity', 4)
			.float('suspensionAcceleration', 4)
			.float('wheelSpeed', 4)
			.float('wheelSlip', 4)
			.float('localVelocityX')
			.float('localVelocityY')
			.float('localVelocityZ')
			.float('angularVelocityX')
			.float('angularVelocityY')
			.float('angularVelocityZ')
			.float('angularAccelerationX')
			.float('angularAccelerationY')
			.float('angularAccelerationZ')
			.float('frontWheelsAngle')
	}

}

