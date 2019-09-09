import React from 'react';
import { Color } from './colors';
import { blackOrWhite } from '../Utils';

export interface ColorChoiceQuiz {
    type: "ColorChoiceQuiz",
    choices: Color[];
    answer: Color;
}

interface ColorChoiceProps {
    quiz: ColorChoiceQuiz;
    correct?: boolean;
    onAnswer: (correct: boolean) => void;
}

export default class ColorChoice extends React.Component<ColorChoiceProps> {

    public constructor(props: ColorChoiceProps) {
        super(props);
    }

    public render() {

        const quiz = this.props.quiz;
        const correct = this.props.correct;
        const answerColor = correct === undefined ? "transparent" : quiz.answer.color;

        return (
            <div className="color-choice">
                <div className="question">
                    <div className="color" style={{ color: blackOrWhite(answerColor), background: answerColor }}>
                        {quiz.answer.code}
                    </div>
                    <div className="message">
                        {correct === undefined ?
                            `このコードはどの色？` :
                            correct ?
                                `正解！` :
                                `残念...(正解は ${quiz.answer.code} )`}
                    </div>
                </div>
                <div className="choices">
                    {quiz.choices.map(color => {
                        const buttonText = correct === undefined ? "" : color.code;
                        const choiseClassNames = "choice" +
                            ((correct !== undefined && quiz.answer === color) ? " answer" : "");
                        return (
                            <div key={color.code} className={choiseClassNames}>
                                <button
                                    className="choice-button"
                                    style={{ background: color.color, color: blackOrWhite(color.color) }}
                                    disabled={correct !== undefined}
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
        this.props.onAnswer(color.code === this.props.quiz.answer.code);
    }
}