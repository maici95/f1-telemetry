


console.clear();

const fs = require('fs');
const Parser = require('./Parser');
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const PORT = 20777;



fs.readFile('./data/data_251.buf', (error, data) => {
const msg = data;
//server.on('message', (msg, rinfo) => {
    const p = new Parser(msg).data;
    console.log(p);
    
});

server.bind(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('server running...');
    }
});
