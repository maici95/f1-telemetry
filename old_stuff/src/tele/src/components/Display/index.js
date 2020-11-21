


import React from 'react';


export default function Display(props) {

    const style = {
        width: '100vw',
        height: '100vh',
        background: '#111'
    }

    return (
        <div style={style}>
            {props.children}
        </div>
    );
}
