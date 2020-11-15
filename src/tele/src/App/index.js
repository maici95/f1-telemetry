


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
    const [test, setTest] = React.useState({
        gear:0,
        leds: [1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
        tyreTemps: [0, 0, 0, 0]
    });

    const [tyreTemps, setTyreTemps] = React.useState([0,0,0,0]);

    const [l, setL] = React.useState([]);
    const [ini, setIni] = React.useState(false);

    const [packetN, setPacketN] = React.useState(0);

    if (!ini) {
        socket.on('packet', (packet) => {
            setPacketN(packetN => packetN + 1);
            setTest({...test, ...packet});
            setL(packet.test);

            setTyreTemps(packet.tyreTemps);
        });
        setIni(true);
    }

    function openInFullScreen() {
        document.body.requestFullscreen();
    }


    return (
        <Display>
            <Row height='14vh' background='#090909' style={{justifyContent: 'center'}}>
                {led_array.map((e, i) => {
                    return (
                        <Led key={i} color={e.color} active={l[i]} />
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
                    <Row border>
                        <Cell>{packetN}</Cell>
                    </Row>

                    <Row label='c'>
                        <Cell>{tyreTemps[0]}</Cell>
                        <Cell>{tyreTemps[1]}</Cell>
                    </Row>
                    <Row border>
                        <Cell>{tyreTemps[2]}</Cell>
                        <Cell>{tyreTemps[3]}</Cell>
                    </Row>
                    
                </Column>

                <Column width='40vw'>
                    <Cell height='48vh' fontSize='50vh'
                        onClick={() => openInFullScreen()}
                        label='gear'
                    >{test.gear}</Cell>
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
