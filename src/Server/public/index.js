




const socket = io();

const speedElem = document.querySelector('#speed');

socket.on('packet', (packet) => {

    const packetId = packet.data.PacketHeader.packetId;
    const pId = packet.data.PacketHeader.playerCarIndex;

    if (packetId === 6) {


        const speed = packet.data.carTelemetryData[pId].speed

        speedElem.value = speed;

    }

});

