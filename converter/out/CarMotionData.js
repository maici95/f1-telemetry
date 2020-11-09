// packet : CarMotionData


module.exports = function CarMotionData(struct) {
struct
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
