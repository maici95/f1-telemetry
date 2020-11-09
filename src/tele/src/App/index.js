


import React from 'react';

import Display from '../components/Display';


import io from 'socket.io-client';
const socket = io.connect('http://localhost:3001');

export default function App() {
    socket.on('packet', (packet) => {
        // ... do stuff
    });


    return (
        <Display>

        </Display>
    );
}
