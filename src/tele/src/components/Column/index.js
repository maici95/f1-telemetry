


import React from 'react';
import Label from '../Label';

export default function Column(props) {

    const style = {
        width: props.width || 0,
        height: props.height || '100%',
        outline: '1px solid #444'
    }

    return (
        <div style={style}>
            {props.label && <Label>{props.label}</Label>}
            {props.children}
        </div>
    );
}
