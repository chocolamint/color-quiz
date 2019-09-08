import React from 'react';
import colors from './colors';

export default function WhichCode(props: { random: (max: number) => number }) {

    const color = colors[props.random(colors.length)];

    return (
        <div className="which-code">
            <div className="color" style={{ backgroundColor: color.color, width: '100%', height: '50vh' }}>

            </div>
            <div>
                <p>
                    この色はどれ？
                </p>
            </div>
        </div>
    );
}