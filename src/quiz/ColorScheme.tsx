import React from "react";
import { QuizComponentProps, QuizStatus, ColorSchemeQuiz, drawBackground } from "./Quiz";

interface ColorSchemeProps extends QuizComponentProps {
    quiz: ColorSchemeQuiz;
    message: string;
}

export default function ColorScheme(props: ColorSchemeProps) {

    const status = props.quizStatus;
    document.querySelector("button");
    return (
        <div className="which-dyads">
            <div className="question">
                <div className="message">
                    {props.quiz.question}<br />
                    {props.message}
                </div>
            </div>
            <div className="choices">
                {props.quiz.choices.map((choice, i) => {
                    const choiseClassNames = "choice" +
                        ((status !== QuizStatus.Thinking && i === props.quiz.answer) ? " answer" : "");
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
                                onClick={() => { handleChooseButtonClick(i); }}
                            >
                                &nbsp;
                                </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    function handleChooseButtonClick(selected: number) {
        const correct = selected === props.quiz.answer;
        props.onAnswer(correct);
    }
}