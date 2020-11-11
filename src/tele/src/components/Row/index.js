


import React from 'react';
import Label from '../Label';


export default function Row(props) {

    const style = {
        ...props.style,
        display: 'flex',
        height: props.height || '10vh',
        width: props.width || '100%',
        lineHeight: props.lineHeight,
        background: props.background,
        fontSize: props.fontSize,
        borderBottom: props.border && '1px solid #444',
    }

    return (
        <div style={style}>
            {props.label && <Label>{props.label}</Label>}
            {props.children}
        </div>
    );
}
