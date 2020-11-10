


import React from 'react';
import Label from '../Label';

export default function Cell(props) {

    const style = {
        width: props.width || '100%',
        height: props.height || '10vh',
        lineHeight: props.height,
        textAlign: props.textAlign || 'center',
        //outline: '1px solid #444',
        borderBottom: props.border && '1px solid #444',
        fontSize: props.fontSize || parseFloat(props.height) * 0.6 + 'vh' || '6vh',
        position: 'relative'
    }


    return (
        <div style={style}
            onClick={props.onClick}
        >
            {props.label && <Label>{props.label}</Label>}
            {props.children}
        </div>
    );
}

