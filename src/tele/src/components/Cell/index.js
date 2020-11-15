


import React from 'react';
import Label from '../Label';

export default function Cell(props) {

    const style = {
        width: props.width || '100%',
        height: props.height || '10vh',
        lineHeight: props.height || '10vh',
        textAlign: props.textAlign || 'center',
        //boxShadow: !props.noBorder && '0px 1px 0px #444',
        //borderBottom: props.border && '1px solid #444',
        fontSize: props.fontSize || parseFloat(props.height) * 0.8 + 'vh' || '10vh',
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

