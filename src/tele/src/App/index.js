


import React from 'react';

import Display from '../components/Display';

import './style.css';

import io from 'socket.io-client';
import Column from '../components/Column';
import Row from '../components/Row';
import Cell from '../components/Cell';
import Bar from '../components/Bar';
import Led from '../components/Led';
const socket = io.connect('http://192.168.0.105:3001');

const LED1_COLOR = '#66ff00';
const LED2_COLOR = '#ff0066';
const LED3_COLOR = '#ff00e6';

const led_array = [
    {active:false, color:LED1_COLOR},
    {active:true, color:LED1_COLOR},
    {active:false, color:LED1_COLOR},
    {active:true, color:LED1_COLOR},
    {active:false, color:LED1_COLOR},
    {active:true, color:LED2_COLOR},
    {active:false, color:LED2_COLOR},
    {active:true, color:LED2_COLOR},
    {active:false, color:LED2_COLOR},
    {active:true, color:LED2_COLOR},
    {active:false, color:LED3_COLOR},
    {active:true, color:LED3_COLOR},
    {active:false, color:LED3_COLOR},
    {active:true, color:LED3_COLOR},
    {active:false, color:LED3_COLOR},
];



export default function App() {
    const [leds, setLeds] = React.useState(led_array);
    const [gear, setGear] = React.useState('t');

    const [load, setLoad] = React.useState(false);
    const [packet, setPacket] = React.useState(null);

    const [test, setTest] = React.useState({
        gear:0,
        a:'test',
        b:1,
        c:2,
        d:3
    });

    React.useEffect(() => {
        socket.on('packet', (packet) => {
            // ... do stuff
            //setGear(packet.gear);
            
            setPacket(packet);
            setGear(packet.gear);

            setTest({...test, ...packet});

            console.log(packet);

        });
    }, [load]);

    function openInFullScreen() {
        document.body.requestFullscreen();
    }




    return (
        <Display>
            <Row height='14vh' background='#090909' style={{justifyContent: 'center'}}>
                {leds.map((e, i) => {
                    return (
                        <Led key={i} color={e.color} active={e.active} />
                    );
                })}
            </Row>
            <Row height='10vh' lineHeight='10vh'>

            </Row>
            <Row height='76vh'>
                <Column width='2vw'>
                    <Bar height='76vh' value='0.266' main='gold'></Bar>
                </Column>

                <Column width='30vw' fontSize='7vh'>
                    <Cell>{test.a}</Cell>
                    <Cell>{test.gear}</Cell>
                    <Cell>{test.c}</Cell>
                    <Cell>{test.d}</Cell>
                </Column>

                <Column width='40vw'>
                    <Cell height='48vh' fontSize='50vh'
                        onClick={() => openInFullScreen()}
                        label='gear'
                    >{gear}</Cell>
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
