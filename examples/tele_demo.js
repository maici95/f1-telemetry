


const Telemetry = require('../Telemetry');
const TeleLink = require('../TeleLink');

// Start telemetry and telelink
const tele = new Telemetry(20777);
const link = new TeleLink(3000);

// Bind function to car telemetry packet
tele.addOnUpdate(telemetryData, ['carTelemetry']);

// Binded function will be called on every carTelemetry packet received from game
function telemetryData() {
    const pId = tele.motion.header.playerCarIndex;
    // Player car speed
    const speed = tele.carTelemetry.carTelemetryData[pId].speed;
    // Send speed value to client
    link.emit('telemetry', { speed: speed });
}

