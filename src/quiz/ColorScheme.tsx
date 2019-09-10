import React from "react";
import { QuizComponentProps, QuizStatus, ColorSchemeQuiz, drawBackground } from "./Quiz";

interface ColorSchemeProps extends QuizComponentProps {
    quiz: ColorSchemeQuiz;
    message: string;
}

export default class ColorScheme extends React.Component<ColorSchemeProps> {

    public constructor(props: ColorSchemeProps) {
        super(props);
    }

    public render() {

        const status = this.props.quizStatus;
        document.querySelector("button");
        return (
            <div className="which-dyads">
                <div className="question">
                    <div className="message">
                        {this.props.quiz.question}<br />
                        {this.props.message}
                    </div>
                </div>
                <div className="choices">
                    {this.props.quiz.choices.map((choice, i) => {
                        const choiseClassNames = "choice" +
                            ((status !== QuizStatus.Thinking && i === this.props.quiz.answer) ? " answer" : "");
                        return (
                            <div key={i} className={choiseClassNames}>
                                <div className="colors">
                                    {choice.map(color => (
                                        <div key={color.pccsCode} className="color" style={drawBackground(color)}>
                                            {(status === QuizStatus.Thinking) ? "" : color.pccsCode}
                                        </div>
                                    ))}
                                </div>
                                <button
                                    className="choice-button"
                                    disabled={status !== QuizStatus.Thinking}
                                    onClick={() => { this.handleChooseButtonClick(i); }}
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

    private handleChooseButtonClick(selected: number) {
        const correct = selected === this.props.quiz.answer;
        this.props.onAnswer(correct);
    }
}