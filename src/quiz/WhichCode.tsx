import React from 'react';
import colors from './colors';
import { shuffle, Random } from '../Utils';

interface WhichCodeProps {
    random: Random;
    onAnswer: (collect: boolean) => void;
}

export default function WhichCode(props: WhichCodeProps) {

    const choices = shuffle(colors, props.random).slice(0, 4);

    const answer = choices[props.random.nextInt(choices.length)];

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