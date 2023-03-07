


const Telemetry = require('./Telemetry');
const TeleLink = require('./TeleLink');

const tele = new Telemetry(20777);
const link = new TeleLink(3000);

const express = require('express');
const app = express();

// Bind function to packet
tele.addOnUpdate(teleData, ['lapData']);

// Current lap distance
let lapDistance = null;

// Send data to client when new packet received from game
function teleData() {
    const pId = tele.lapData.header.playerCarIndex;

    if (lapDistance === tele.lapData.lapData[pId].lapDistance) {
        return;
    }

    const data = {
        ...tele.lapData.lapData[pId],
        ...tele.carTelemetry.carTelemetryData[pId],
        ...tele.motion.carMotionData[pId],
        ...tele.session
    }

    link.emit('teleData', data);
    lapDistance = tele.lapData.lapData[pId].lapDistance;
}

const test = app.get('/telemetry', (req, res) => {
    res.sendFile(__dirname + '/src/view/telemetry/index.html');
});

link.public(__dirname+'/src/view/telemetry');
link.route(test);
