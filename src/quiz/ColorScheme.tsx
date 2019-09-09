import React from "react";
import { Color } from "./colors";
import { blackOrWhite } from "../Utils";
import { QuizComponentProps, QuizStatus } from "./Quiz";

export type ColorSchemeQuizSubType = "Dyads";
export interface ColorSchemeQuiz {
    type: "ColorSchemeQuiz",
    subType: ColorSchemeQuizSubType,
    choices: { key: string, colors: Color[] }[];
    answer: string;
}

interface ColorSchemeProps extends QuizComponentProps {
    quiz: ColorSchemeQuiz;
}

export default class ColorScheme extends React.Component<ColorSchemeProps> {

    public constructor(props: ColorSchemeProps) {
        super(props);
    }

    public render() {

        const status = this.props.quizStatus;

        return (
            <div className="which-dyads">
                <div className="question">
                    <div className="message">
                        {this.props.message}
                    </div>
                </div>
                <div className="choices">
                    {this.props.quiz.choices.map(choice => {
                        const choiseClassNames = "choice" +
                            ((status !== QuizStatus.Thinking && this.props.quiz.answer === choice.key) ? " answer" : "");
                        return (
                            <div key={choice.key} className={choiseClassNames}>
                                <div className="colors">
                                    {choice.colors.map(color => (
                                        <div className="color" style={{ background: color.color, color: blackOrWhite(color.color) }}>
                                            {(status === QuizStatus.Thinking) ? "" : color.code}
                                        </div>
                                    ))}
                                </div>
                                <button
                                    className="choice-button"
                                    disabled={status !== QuizStatus.Thinking}
                                    onClick={() => { this.handleChooseButtonClick(choice); }}
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
        const correct = tuple.key === this.props.quiz.answer;
        this.props.onAnswer(correct);
    }
}