


const socket = io();

socket.on('motion', (packet) => {
    console.log(
        packet.worldPositionX
    );
});








