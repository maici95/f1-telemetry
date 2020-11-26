# F1 2020 Game - Data Telemetry Application

Telemetry application for F1 2020 game from Codemasters.


&nbsp;

## **Telemetry**
*telemetry_example.js*

``` javascript
const Telemetry = require('./Telemetry');

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
```

## **Server** working with **Telemetry**
*index.js*
``` javascript
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
```


# Experimental telemetry
*index.js*
<img src="https://i.ibb.co/PFd1JhP/tele.png">

# Old version

## Steering wheel display

<img src="https://i.ibb.co/SVbNKZ4/demo.png">

## Display show following information "features"
- RPM lights
  - Green lights reserved for DRS
- Current lap number / total laps
- Session time
- Current lap delta
  - On *tap/ click* change between **Best** and **Last** lap
- Gear
- Current lap time
- Last lap time
- Tyres information
  - On *tap/ click* change between **Wear** and **temperature**
- Speed
  - ERS Overtake mode active
- Waved flag
- Fuel mix
  - Laps fuel remaining
- ERS 
  - Energy stored
  - Energy remaining for lap
- Warning texts
  - Engine temperature
  - Tyres temperature
  - Frontwing damage
  - Tyre wear

## How to use display
- Download files to your computer
- Install **NodeJS**
- Open cmd and run **npm install** in f1-2020-telemetry directory
- Run **telemetry_old.js** with NodeJS
- Open browser and go to **localhost:3000**

### How to use smartphone as display
- open **cmd**
- type **ipconfig** and press enter
- Check IPv4 address example **192.168.0.105**
- Open **192.168.0.105:3000** on your smartphone's browser
