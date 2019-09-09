import React from 'react';
import { Color } from './colors';
import { blackOrWhite } from '../Utils';

export type ColorChoiceQuizSubType = "ColorChoice" | "CodeChoice";
export interface ColorChoiceQuiz {
    type: "ColorChoiceQuiz",
    subType: ColorChoiceQuizSubType,
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
        const answerColor = this.beforeAnswer && quiz.subType === "ColorChoice" ? "transparent" : quiz.answer.color;

        return (
            <div className="color-choice">
                <div className="question">
                    <div className="color" style={{ color: blackOrWhite(answerColor), background: answerColor }}>
                        {quiz.subType === "CodeChoice" && this.beforeAnswer ? "" : quiz.answer.code}
                    </div>
                    <div className="message">
                        {(() => {
                            if (this.beforeAnswer) {
                                switch (quiz.subType) {
                                    case "CodeChoice":
                                        return "この色はどれ？";
                                    case "ColorChoice":
                                        return "このコードはどの色？";
                                }
                            }
                            return correct ? "🎉正解！🎉" : "残念...😢";
                        })()}
                    </div>
                </div>
                <div className="choices">
                    {quiz.choices.map(color => {
                        const buttonText = this.beforeAnswer && quiz.subType === "ColorChoice" ? "" : color.code;
                        const buttonBackground = this.beforeAnswer && quiz.subType === "CodeChoice" ? "#ffffff" : color.color;
                        const choiseClassNames = "choice" +
                            ((!this.beforeAnswer && quiz.answer === color) ? " answer" : "");
                        return (
                            <div key={color.code} className={choiseClassNames}>
                                <button
                                    className="choice-button"
                                    style={{ background: buttonBackground, color: blackOrWhite(buttonBackground) }}
                                    disabled={!this.beforeAnswer}
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

    private get beforeAnswer() {
        return this.props.correct === undefined;
    }

    private handleChooseButtonClick(color: Color) {
        const correct = color.code === this.props.quiz.answer.code;
        this.props.onAnswer(correct);
    }
}