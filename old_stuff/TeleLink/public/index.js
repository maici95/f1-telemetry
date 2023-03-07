


const socket = io();

socket.on('telemetry', (packet) => {
    console.log(
        packet.speed
    );
});
