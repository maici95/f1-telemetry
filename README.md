# F1 2020 Game - Data Telemetry Application




&nbsp;

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
- ERS store remaining


&nbsp;

## How to use display
- Run demo.js
- Open browser and go to **localhost:3000**

### How to use smartphone as display
- open **cmd**
- type **ipconfig** and press enter
- Check IPv4 address example **192.168.0.105**
- Open **192.168.0.105:3000** on your smartphone's browser


&nbsp;

## How to use parser
``` javascript
import dgram from 'dgram';
import Parser from './Parser/index.js';

const server = dgram.createSocket('udp4');
const PORT = 20777;
const parser = new Parser();

server.on('message', (buffer, rinfo) => {
    // Parse packet
    parser.parse(buffer);

    // Parsed data
    console.log(buffer.data);
});

server.bind(PORT);
```

&nbsp;

## Current display view

&nbsp;

<img src="https://i.ibb.co/LvnKVZw/demo.png">
