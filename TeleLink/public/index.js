


const socket = io();

const speedElem = document.getElementById('speed');
let count = 0;

socket.on('telemetry', (packet) => {
    speedElem.value = packet.speed;
});

