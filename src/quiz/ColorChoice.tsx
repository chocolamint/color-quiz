import React from 'react';
import { Color } from './colors';
import { blackOrWhite } from '../Utils';
import { QuizComponentProps, QuizStatus } from './Quiz';

export type ColorChoiceQuizSubType = "ColorChoice" | "CodeChoice";
export interface ColorChoiceQuiz {
    type: "ColorChoiceQuiz",
    subType: ColorChoiceQuizSubType,
    choices: Color[];
    answer: Color;
}

interface ColorChoiceProps extends QuizComponentProps {
    quiz: ColorChoiceQuiz;
}

export default class ColorChoice extends React.Component<ColorChoiceProps> {

    public constructor(props: ColorChoiceProps) {
        super(props);
    }

    public render() {

        const quiz = this.props.quiz;
        const status = this.props.quizStatus;
        const answerColor = status === QuizStatus.Thinking && quiz.subType === "ColorChoice" ? "transparent" : quiz.answer.color;

        return (
            <div className="color-choice">
                <div className="question">
                    <div className="color" style={{ color: blackOrWhite(answerColor), background: answerColor }}>
                        {quiz.subType === "CodeChoice" && status === QuizStatus.Thinking ? "" : quiz.answer.code}
                    </div>
                    <div className="message">
                        {this.props.message}
                    </div>
                </div>
                <div className="choices">
                    {quiz.choices.map(color => {
                        const buttonText = status === QuizStatus.Thinking && quiz.subType === "ColorChoice" ? "" : color.code;
                        const buttonBackground = status === QuizStatus.Thinking && quiz.subType === "CodeChoice" ? "#ffffff" : color.color;
                        const choiseClassNames = "choice" +
                            ((status !== QuizStatus.Thinking && quiz.answer === color) ? " answer" : "");
                        return (
                            <div key={color.code} className={choiseClassNames}>
                                <button
                                    className="choice-button"
                                    style={{ background: buttonBackground, color: blackOrWhite(buttonBackground) }}
                                    disabled={status !== QuizStatus.Thinking}
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

    private handleChooseButtonClick(selected: Color) {
        const correct = selected.code === this.props.quiz.answer.code;
        this.props.onAnswer(correct);
    }
}