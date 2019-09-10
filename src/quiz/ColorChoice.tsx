import React from 'react';
import { blackOrWhite } from '../Utils';
import { QuizComponentProps, QuizStatus, ColorChoiceQuiz, drawBackground } from './Quiz';

interface ColorChoiceProps extends QuizComponentProps {
    quiz: ColorChoiceQuiz;
    message: string;
}

export default class ColorChoice extends React.Component<ColorChoiceProps> {

    public constructor(props: ColorChoiceProps) {
        super(props);
    }

    public render() {

        const quiz = this.props.quiz;
        const status = this.props.quizStatus;
        const answerColor = status === QuizStatus.Thinking && quiz.subType === "ColorChoice" ? "transparent" : quiz.choices[quiz.answer].hexCode;

        return (
            <div className="color-choice">
                <div className="question">
                    <div className="color" style={drawBackground(answerColor)}>
                        {quiz.subType === "CodeChoice" && status === QuizStatus.Thinking ? "" : quiz.choices[quiz.answer].pccsCode}
                    </div>
                    <div className="message">
                        {quiz.question}<br />
                        {this.props.message}
                    </div>
                </div>
                <div className="choices">
                    {quiz.choices.map((color, i) => {
                        const buttonText = status === QuizStatus.Thinking && quiz.subType === "ColorChoice" ? "" : color.pccsCode;
                        const buttonColor = status === QuizStatus.Thinking && quiz.subType === "CodeChoice" ? "#ffffff" : color.hexCode;
                        const choiseClassNames = "choice" +
                            ((status !== QuizStatus.Thinking && i === quiz.answer) ? " answer" : "");
                        return (
                            <div key={color.pccsCode} className={choiseClassNames}>
                                <button
                                    className="choice-button"
                                    style={drawBackground(buttonColor)}
                                    disabled={status !== QuizStatus.Thinking}
                                    onClick={() => { this.handleChooseButtonClick(i); }}
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

    private handleChooseButtonClick(selected: number) {
        const correct = selected === this.props.quiz.answer;
        this.props.onAnswer(correct);
    }
}