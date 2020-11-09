


const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const Parser = require('../../Parser');
const parser = new Parser();

const PORT = 20777;

server.on('message', (buffer, rinfo) => {
    parser.parse(buffer);


    io.emit('packet', { data: parser.data})
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

http.listen(3000);
server.bind(PORT);





