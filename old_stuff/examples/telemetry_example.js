


const Telemetry = require('../Telemetry');

// Create new telemetry and start listening port 20777
const tele = new Telemetry(20777);

// Bind function to motion packet
tele.addOnUpdate(motionPacketUpdated, ['motion']);

// Binded function will be called on every motion packet received from game
function motionPacketUpdated(packetName) {
    const pId = tele.motion.header.playerCarIndex;
    const playerCarMotion = tele.motion.carMotionData[pId]
    console.log(
        playerCarMotion
    );
}
