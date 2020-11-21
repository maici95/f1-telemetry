// packet : CarSetupData


module.exports = function CarSetupData(struct) {
struct
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
