# F1 2020 Game - Data Telemetry Application



## How to use:
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

## Prototype:
- Current gear
- Speed
- Current lap delta to last lap
- ERS energy bar

&nbsp;

<img src="https://i.ibb.co/SPXXpHx/demo.png">

