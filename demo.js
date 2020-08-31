


console.clear();

const fs = require('fs');
const Parser = require('./Parser');
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const express = require('express');
const app = express();

const PORT = 20777;
const EXPRESSPORT = 3000;

const packets = {}

//fs.readFile('./data/data_251.buf', (error, data) => {
//const msg = data;
server.on('message', (msg, rinfo) => {
    const p = new Parser(msg).data;

    packets[p.PacketHeader.packetId] = {
        timeStamp: (new Date().getTime()).toString(),
        data: p
    }


    
});


// Start listening
server.bind(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('server running...');
    }
});


app.use(express.static('public'));

/**
 * App get index.html
 */
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.get('/packet/:id/:timeStamp', (req, res) => {
    const id = (req.params.id).toString();
    const timeStamp = (req.params.timeStamp).toString();
    const pTimeStamp = packets[id] && packets[id].timeStamp;

    if (!pTimeStamp) {
        res.send({ msg: 'NO PACKET FOR GIVEN ID' });
    } else {
        if (timeStamp !== pTimeStamp) {
            const packet = packets[id];
            if (packet) {
                res.send({ msg: 'ok', ...packet });
            } else {
                res.send({ msg: 'packet not found' });
            }
        } else {
            res.send({ msg: 'no new packet available' });
        }
    }
});


app.listen(EXPRESSPORT);
