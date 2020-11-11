// packet : PacketMotionData


module.exports = function PacketMotionData(struct) {
struct
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
