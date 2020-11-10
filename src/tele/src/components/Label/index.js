


import React from 'react';

export default function Label(props) {
    
    const style = {
        fontSize: '4vh',
        position: 'absolute',
        height: '4vh',
        lineHeight: '4vh',
        margin: '1vh',
        color: '#555'
    }

    return (
        <div style={style}>
            {props.children}
        </div>
    );
}