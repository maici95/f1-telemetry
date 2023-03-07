


console.clear();

const dgram = require('dgram');
const Parser = require('./old_stuff/Parser/index.js');
const Server = require('./old_stuff/Server/index.js');

const server = dgram.createSocket('udp4');
const PORT = 20777;
const parser = new Parser();
const app = new Server();

app.start(3000);

server.on('message', (buffer, rinfo) => {
    parser.parse(buffer);
    app.setPacket(parser.data);
});

server.bind(PORT);
