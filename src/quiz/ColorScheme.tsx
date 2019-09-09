import React from "react";
import { Color } from "./colors";
import { blackOrWhite } from "../Utils";

export type ColorSchemeQuizSubType = "Dyads";
export interface ColorSchemeQuiz {
    type: "ColorSchemeQuiz",
    subType: ColorSchemeQuizSubType,
    choices: { key: string, colors: Color[] }[];
    answer: string;
}

interface ColorSchemeProps {
    quiz: ColorSchemeQuiz;
    correct?: boolean;
    onAnswer: (correct: boolean) => void;
}

export default class ColorScheme extends React.Component<ColorSchemeProps> {

    public constructor(props: ColorSchemeProps) {
        super(props);
    }

    public render() {

        const correct = this.props.correct;

        return (
            <div className="which-dyads">
                <div className="question">
                    <div className="message">
                        {this.beforeAnswer ?
                            "ダイアード配色はどれ？" :
                            correct ? "🎉正解！🎉" : "残念...😢"}
                    </div>
                </div>
                <div className="choices">
                    {this.props.quiz.choices.map(tuple => {
                        const choiseClassNames = "choice" +
                            ((!this.beforeAnswer && this.props.quiz.answer === tuple.key) ? " answer" : "");
                        return (
                            <div key={tuple.key} className={choiseClassNames}>
                                <div className="colors">
                                    {tuple.colors.map(color => (
                                        <div className="color" style={{ background: color.color, color: blackOrWhite(color.color) }}>
                                            {(this.beforeAnswer) ? "" : color.code}
                                        </div>
                                    ))}
                                </div>
                                <button
                                    className="choice-button"
                                    disabled={!this.beforeAnswer}
                                    onClick={() => { this.handleChooseButtonClick(tuple); }}
                                >
                                    &nbsp;
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

    private handleChooseButtonClick(tuple: { key: string }) {
        const correct = tuple.key === this.props.quiz.answer;
        this.props.onAnswer(correct);
    }
}