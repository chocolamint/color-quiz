import React from 'react';
import { Color } from './colors';
import { blackOrWhite } from '../Utils';

interface WhichColorProps {
    choices: Color[];
    answer: Color;
    correct?: boolean;
    onAnswer: (correct: boolean) => void;
}

export default class WhichColor extends React.Component<WhichColorProps, {}> {

    public constructor(props: WhichColorProps) {
        super(props);

        this.state = {

        };
    }

    public render() {

        const answerColor = this.props.correct === undefined ? "#ffffff" : this.props.answer.color;

        return (
            <div className="which-color">
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
                        return (
                            <div key={color.code} className="choice">
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
        this.setState({
            choosen: color
        })
        this.props.onAnswer(color.code === this.props.answer.code);
    }
}