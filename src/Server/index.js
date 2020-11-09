


const options = {
    cors: true
}

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, options);
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const cors = require('cors');

const Parser = require('../../Parser');
const parser = new Parser();

const PORT = 20777;

// Parse packet
server.on('message', (buffer, rinfo) => {
    parser.parse(buffer);
    io.emit('packet', { data: parser.data})
});

app.use(cors());
app.use(express.static(__dirname + '/public/build'));

// Send html page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/build/index.html');
})

// Start server
http.listen(3001);
server.bind(PORT);


// test
setInterval(() => {
    io.emit('packet', { msg: Array(10).fill(0).map(e => Math.floor(Math.random() * 10)) });
}, 1000);
