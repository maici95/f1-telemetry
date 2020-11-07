



console.clear();

import dgram from 'dgram';
import Parser from './Parser/index.js';


const server = dgram.createSocket('udp4');
const PORT = 20777;
const parser = new Parser();

server.on('message', (msg, rinfo) => {
    parser.parse(msg)



});

server.bind(PORT);
