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

    render() {
        return (
            <div className="which-dyads">
                <div className="question">
                    <div className="message">
                        {this.props.correct === undefined ?
                            `ダイアード配色はどれ？` :
                            this.props.correct ?
                                `正解！` :
                                `残念...`}
                    </div>
                </div>
                <div className="choices">
                    {this.props.quiz.choices.map(tuple => {
                        const choiseClassNames = "choice" +
                            ((this.props.correct !== undefined && this.props.quiz.answer === tuple.key) ? " answer" : "");
                        return (
                            <div key={tuple.key} className={choiseClassNames}>
                                <div className="colors">
                                    {tuple.colors.map(color => (
                                        <div className="color" style={{ background: color.color, color: blackOrWhite(color.color) }}>
                                            {(this.props.correct === undefined) ? "" : color.code}
                                        </div>
                                    ))}
                                </div>
                                <button
                                    className="choice-button"
                                    disabled={this.props.correct !== undefined}
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

    private handleChooseButtonClick(tuple: { key: string }) {
        this.props.onAnswer(tuple.key === this.props.quiz.answer);
    }
}