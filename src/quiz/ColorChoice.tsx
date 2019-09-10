import React from 'react';
import { PccsColor } from './PccsColors';
import { blackOrWhite } from '../Utils';
import { QuizComponentProps, QuizStatus, ColorChoiceQuiz } from './Quiz';

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
        const answerColor = status === QuizStatus.Thinking && quiz.subType === "ColorChoice" ? "transparent" : quiz.answer.hexCode;

        return (
            <div className="color-choice">
                <div className="question">
                    <div className="color" style={{ color: blackOrWhite(answerColor), background: answerColor }}>
                        {quiz.subType === "CodeChoice" && status === QuizStatus.Thinking ? "" : quiz.answer.pccsCode}
                    </div>
                    <div className="message">
                        {quiz.question}<br />
                        {this.props.message}
                    </div>
                </div>
                <div className="choices">
                    {quiz.choices.map(color => {
                        const buttonText = status === QuizStatus.Thinking && quiz.subType === "ColorChoice" ? "" : color.pccsCode;
                        const buttonBackground = status === QuizStatus.Thinking && quiz.subType === "CodeChoice" ? "#ffffff" : color.hexCode;
                        const choiseClassNames = "choice" +
                            ((status !== QuizStatus.Thinking && quiz.answer === color) ? " answer" : "");
                        return (
                            <div key={color.pccsCode} className={choiseClassNames}>
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

    private handleChooseButtonClick(selected: PccsColor) {
        const correct = selected.pccsCode === this.props.quiz.answer.pccsCode;
        this.props.onAnswer(correct);
    }
}