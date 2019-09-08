import React from 'react';
import colors from './colors';
import { RandomGenerator, random, shuffle } from '../Utils';

interface WhichCodeProps {
    randomGenerator: RandomGenerator;
    onAnswer: (collect: boolean) => void;
}

export default function WhichCode(props: WhichCodeProps) {

    const choices = shuffle(colors, props.randomGenerator).slice(0, 4);

    const answer = choices[random(choices.length, props.randomGenerator)];

    return (
        <div className="which-code">
            <div className="color" style={{ backgroundColor: answer.color, width: '100%', height: '50vh' }}>

            </div>
            <div>
                <p>
                    この色はどれ？
                </p>
                {choices.map(color => (
                    <button
                        className="choice"
                        key={color.code}
                        onClick={() => { props.onAnswer(answer.code == color.code); }}
                    >
                        {color.code}
                    </button>
                ))}
            </div>
        </div>
    );
}