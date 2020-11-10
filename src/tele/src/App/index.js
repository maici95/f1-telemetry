


import React from 'react';

import Display from '../components/Display';

import './style.css';

import io from 'socket.io-client';
import Column from '../components/Column';
import Row from '../components/Row';
import Cell from '../components/Cell';
const socket = io.connect('http://localhost:3001');

export default function App() {
    socket.on('packet', (packet) => {
        // ... do stuff
    });


    function openInFullScreen() {
        document.body.requestFullscreen();
    }


    return (
        <Display>
            <Row height='14vh' background='#000'>

            </Row>
            <Row height='10vh' lineHeight='10vh'>

            </Row>
            <Row height='76vh'>
                <Column width='5vw'>

                </Column>
                <Column width='30vw'>

                    <Column label='C' width='100%' height='30vh'>
                        <Row height='15vh' lineHeight='15vh' border>
                            <Cell>1</Cell>
                            <Cell label="y">2</Cell>
                            <Cell>2</Cell>
                        </Row>
                        <Row height='15vh' lineHeight='15vh'>
                            <Cell>3</Cell>
                        </Row>
                    </Column>


                </Column>
                <Column width='35vw'>
                    <Cell height='50vh' fontSize='60vh' border
                        onClick={() => openInFullScreen()}
                        label='gear'
                    >N</Cell>
                </Column>
                <Column width='30vw'>
                    <Cell height='12vh' label='best' border>1:25.243</Cell>
                    <Cell height='10vh' border textAlign='left'>111</Cell>

                    <Row height='12vh' lineHeight='12vh' border fontSize='5vh'>
                        <Cell label='c'>63</Cell>
                        <Cell label='2'>122</Cell>
                        <Cell>122</Cell>
                    </Row>

                </Column>
                <Column width='5vw'>

                </Column>
            </Row>
        </Display>
    );
}
