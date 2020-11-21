


import React from 'react';
import Label from '../Label';

export default function Column(props) {

    const style = {
        width: props.width || '100%',
        height: props.height,
        outline: '1px solid #444',
        fontSize: props.fontSize,
        lineHeight: props.lineHeight,
        overflow: 'auto'
    }

    return (
        <div style={style}>
            {props.label && <Label>{props.label}</Label>}
            {props.children}
        </div>
    );
}
