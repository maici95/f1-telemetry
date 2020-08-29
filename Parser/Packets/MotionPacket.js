


// motion packet
module.exports = function MotionPacket(p) {
    for (let i = 0; i < 22; i++) {
        p
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
        .toArray()
    }
    
    p
        .saveArray('carMotionData')
        .arr('suspensionPosition', 'float', 4)
        .arr('suspensionVelocity', 'float', 4)
        .arr('suspensionAcceleration', 'float', 4)
        .arr('wheelSpeed', 'float', 4)
        .arr('wheelSlip', 'float', 4)
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
        .saveObject('PacketMotionData')
}
