import React from 'react';
import { Color } from './colors';
import { blackOrWhite } from '../Utils';

interface WhichCodeProps {
    choices: Color[];
    answer: Color;
    correct?: boolean;
    onAnswer: (correct: boolean) => void;
}

export default class WhichCode extends React.Component<WhichCodeProps> {

    public constructor(props: WhichCodeProps) {
        super(props);
    }

    public render() {

        return (
            <div className="which-code">
                <div className="question">
                    <div className="color" style={{ backgroundColor: this.props.answer.color }}>

                    </div>
                    <div className="message">
                        {this.props.correct === undefined ?
                            `この色はどれ？` :
                            this.props.correct ?
                                `正解！` :
                                `残念...(正解は ${this.props.answer.code} )`}
                    </div>
                </div>
                <div className="choices">
                    {this.props.choices.map(color => {

                        const buttonBackground = this.props.correct === undefined ? "#ffffff" : color.color;

                        return (
                            <div key={color.code} className="choice">
                                <button
                                    className="choice-button"
                                    style={{ background: buttonBackground, color: blackOrWhite(buttonBackground) }}
                                    disabled={this.props.correct !== undefined}
                                    onClick={() => { this.handleChooseButtonClick(color); }}
                                >
                                    {color.code}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    private handleChooseButtonClick(color: Color) {
        this.props.onAnswer(color.code === this.props.answer.code);
    }
}