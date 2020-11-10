


import React from 'react';

export default function Led(props) {

    const style = {
        width: '8vh',
        height: '8vh',
        margin: '3vh 1vh',
        borderRadius: '100%'
    }


    const color = {
        background: props.active ? props.color || 'red' : '#161616',
        boxShadow:
            props.active ?
            `
            0 0 10px ${props.color || 'red'},
            0 0 20px ${props.color || 'red'},
            0 0 50px ${props.color || 'red'},
            0 0 100px ${props.color || 'red'},
            0 0 250px ${props.color || 'red'}
            ` : 'none'
    }

    return (
        <div style={{...style, ...color}}>
            
        </div>
    );
}
