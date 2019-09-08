import React from 'react';
import colors from './colors';
import { RandomGenerator, random, shuffle } from '../Utils';

export default function WhichCode(props: { randomGenerator: RandomGenerator }) {

    const choices = shuffle(colors, props.randomGenerator).slice(0, 4);

    const answer = colors[random(choices.length, props.randomGenerator)];

    return (
        <div className="which-code">
            <div className="color" style={{ backgroundColor: answer.color, width: '100%', height: '50vh' }}>

            </div>
            <div>
                <p>
                    この色はどれ？
                </p>
                {choices.map(color => (
                    <button key={color.code}>{color.code}</button>
                ))}
            </div>
        </div>
    );
}