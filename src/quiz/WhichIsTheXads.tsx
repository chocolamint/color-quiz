import React from "react";
import { Color } from "./colors";

export interface WhichIsTheXadsQuiz {
    choices: { key: string, colors: Color[] }[];
    answer: string;
}
interface WhichIsTheXadsProps {
    quiz: WhichIsTheXadsQuiz;
    correct?: boolean;
    onAnswer: (correct: boolean) => void;
}

export default class WhichIsTheXads extends React.Component<WhichIsTheXadsProps> {

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

                        return (
                            <div key={tuple.key} className="choice">
                                <div className="colors">
                                    {tuple.colors.map(color => (
                                        <div className="color" style={{ background: color.color }}>
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