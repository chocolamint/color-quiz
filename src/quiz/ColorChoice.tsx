import React from 'react';
import { Color } from './colors';
import { blackOrWhite } from '../Utils';

interface ColorChoiceProps {
    choices: Color[];
    answer: Color;
    correct?: boolean;
    onAnswer: (correct: boolean) => void;
}

export default class ColorChoice extends React.Component<ColorChoiceProps> {

    public constructor(props: ColorChoiceProps) {
        super(props);
    }

    public render() {

        const answerColor = this.props.correct === undefined ? "transparent" : this.props.answer.color;

        return (
            <div className="color-choice">
                <div className="question">
                    <div className="color" style={{ color: blackOrWhite(answerColor), background: answerColor }}>
                        {this.props.answer.code}
                    </div>
                    <div className="message">
                        {this.props.correct === undefined ?
                            `このコードはどの色？` :
                            this.props.correct ?
                                `正解！` :
                                `残念...(正解は ${this.props.answer.code} )`}
                    </div>
                </div>
                <div className="choices">
                    {this.props.choices.map(color => {
                        const buttonText = this.props.correct === undefined ? "" : color.code;
                        const choiseClassNames = "choice" +
                            ((this.props.correct !== undefined && this.props.answer === color) ? " answer" : "");
                        return (
                            <div key={color.code} className={choiseClassNames}>
                                <button
                                    className="choice-button"
                                    style={{ background: color.color, color: blackOrWhite(color.color) }}
                                    disabled={this.props.correct !== undefined}
                                    onClick={() => { this.handleChooseButtonClick(color); }}
                                >
                                    {buttonText}
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