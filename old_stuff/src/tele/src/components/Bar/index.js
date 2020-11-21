


import React from 'react';

export default function Bar(props) {

    const style1 = {
        width: '100%',
        height: (1 - props.value) * 100 + '%',
        background: `repeating-linear-gradient(
            0,
            ${props.secondary || '#222'},
            ${props.secondary || '#222'} 4px,
            #111 4px,
            #111 6px`
    }
    const style2 = {
        width: '100%',
        height: (props.value * 100) + '%',
        background: `repeating-linear-gradient(
            0,
            ${props.main || '#FF00FF'},
            ${props.main || '#FF00FF'} 4px,
            #111 4px,
            #111 6px`
    }

    return (
        <div style={{height: '100%'}}>
            <div style={style1}></div>
            <div style={style2}></div>
        </div>
    );
}
