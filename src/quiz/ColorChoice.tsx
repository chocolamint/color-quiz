import React from 'react';
import { QuizComponentProps, QuizStatus, ColorChoiceQuiz, drawBackground } from './Quiz';

export default function ColorChoice(props: QuizComponentProps<ColorChoiceQuiz>) {

    const quiz = props.quiz;
    const status = props.quizStatus;
    const answerColor = status === QuizStatus.Thinking && quiz.subType === "ColorChoice" ? "transparent" : quiz.choices[quiz.answer].hexCode;

    return (
        <div className="color-choice">
            <div className="question">
                <div className="color" style={drawBackground(answerColor)}>
                    {quiz.subType === "CodeChoice" && status === QuizStatus.Thinking ? "" : quiz.choices[quiz.answer].pccsCode}
                </div>
                <div className="message">
                    {quiz.question}<br />
                    {props.message}
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
                                onClick={() => { handleChooseButtonClick(i); }}
                            >
                                {buttonText}
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