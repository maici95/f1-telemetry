


// Dev version

const Telemetry = require('./Telemetry');
const TeleLink = require('./TeleLink');

const tele = new Telemetry(20777);
const link = new TeleLink(3000);


const express = require('express');
const app = express();


tele.addOnUpdate(motionCap, ['motion']);

function motionCap() {



    link.emit(
        'motion',
        tele.motion.carMotionData[19]
    );
}


const test = app.get('/telemetry', (req, res) => {
    res.sendFile(__dirname + '/src/view/telemetry/index.html');
});

link.public(__dirname+'/src/view/telemetry');
link.route(test);
