import React, { useState } from 'react';
import './App.css';
import { Random, assertNever } from './Utils';
import ColorChoice from './quiz/ColorChoice';
import ColorScheme from './quiz/ColorScheme';
import { QuizStatus } from './quiz/Quiz';
import { createQuizGenerator } from './quiz/QuizGenerator';

export default function App() {

  const generateQuiz = createQuizGenerator(new Random());
  const [quiz, setQuiz] = useState(generateQuiz());
  const [quizStatus, setQuizStatus] = useState(QuizStatus.Thinking);
  const [count, setCount] = useState({ quiz: 0, correct: 0 });

  const message = (() => {
    switch (quizStatus) {
      case QuizStatus.Correct: return "🎉正解！🎉";
      case QuizStatus.Incorrect: return "残念...😢";
      case QuizStatus.Thinking: return "";
      default: return assertNever(quizStatus);
    }
  })();

  return (
    <div className="App">
      <header className="header">
        色彩クイズ
      </header>
      <main className="main">
        {(() => {
          switch (quiz.type) {
            case "ColorChoiceQuiz":
              return <ColorChoice quiz={quiz} message={message} quizStatus={quizStatus} onAnswer={e => handleAnswer(e)} />
            case "ColorSchemeQuiz":
              return <ColorScheme quiz={quiz} message={message} quizStatus={quizStatus} onAnswer={e => handleAnswer(e)} />
          }
        })()}
      </main>
      <footer className="footer">
        <div className="control-buttons">
          <button className="next-quiz-button" disabled={quizStatus === QuizStatus.Thinking} onClick={() => handleNextQuizButton()}>
            次のクイズへ
          </button>
        </div>
        <div className="status">
          正解数: {count.correct} / {count.quiz}
        </div>
      </footer>
    </div >
  );

  function nextQuiz() {
    setQuiz(generateQuiz());
    setQuizStatus(QuizStatus.Thinking);
  }

  function handleAnswer(correct: boolean) {
    setQuizStatus(correct ? QuizStatus.Correct : QuizStatus.Incorrect);
    setCount({
      quiz: count.quiz + 1,
      correct: count.correct + (correct ? 1 : 0)
    });
  }

  function handleNextQuizButton() {
    nextQuiz();
  }
}

