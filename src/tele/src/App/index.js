


import React from 'react';

import Display from '../components/Display';

import './style.css';

import io from 'socket.io-client';
import Column from '../components/Column';
import Row from '../components/Row';
import Cell from '../components/Cell';
import Bar from '../components/Bar';
import Led from '../components/Led';
const socket = io.connect('http://localhost:3001');

export default function App() {
    socket.on('packet', (packet) => {
        // ... do stuff
    });


    function openInFullScreen() {
        document.body.requestFullscreen();
    }


    const [load, setLoad] = React.useState(false);
    const [led, setLed] = React.useState(false);

    function leds() {
        console.log(led);

        let b = Math.random() > 0.5 ? true : false;
        setLed(b);
    }

    React.useEffect(() => {
        if (!load) {
            setInterval(() => {

                leds();
            }, 1000);
            setLoad(true);
        }
    }, [load, led])

    return (
        <Display>
            <Row height='14vh' background='#090909' style={{justifyContent: 'center'}}>
                <Led active={led} color='#66ff00'></Led>
                <Led active={led} color='#66ff00'></Led>
                <Led active={led} color='#66ff00'></Led>
                <Led active={led} color='#66ff00'></Led>
                <Led active={led} color='#66ff00'></Led>
                
                <Led active={led} color='#ff0066'></Led>
                <Led active={led} color='#ff0066'></Led>
                <Led active={led} color='#ff0066'></Led>
                <Led active={led} color='#ff0066'></Led>
                <Led active={led} color='#ff0066'></Led>

                <Led active={led} color='#ff00e6'></Led>
                <Led active={led} color='#ff00e6'></Led>
                <Led active={led} color='#ff00e6'></Led>
                <Led active={led} color='#ff00e6'></Led>
                <Led active={led} color='#ff00e6'></Led>
            </Row>
            <Row height='10vh' lineHeight='10vh'>

            </Row>
            <Row height='76vh'>
                <Column width='3vw'>
                    <Bar height='76vh' value='0.266' main='gold'></Bar>
                </Column>

                <Column width='30vw' fontSize='7vh'>
                    <Cell>1</Cell>
                    <Cell>2</Cell>
                    <Cell>3</Cell>
                    <Cell>4</Cell>

                </Column>

                <Column width='35vw'>
                    <Cell height='48vh' fontSize='50vh'
                        onClick={() => openInFullScreen()}
                        label='gear'
                    >N</Cell>
                </Column>

                <Column width='30vw'>

                </Column>

                <Column width='3vw'>
                    <Bar height='76vh' value='0.7266' main='cyan'></Bar>
                </Column>
            </Row>
        </Display>
    );
}
