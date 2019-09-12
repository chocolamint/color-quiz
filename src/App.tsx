import React, { useState } from 'react';
import './App.css';
import { Random } from './Utils';
import ColorChoice from './quiz/ColorChoice';
import ColorScheme from './quiz/ColorScheme';
import { QuizStatus } from './quiz/Quiz';
import { createQuizGenerator } from './quiz/QuizGenerator';

export default function App() {

  const generateQuiz = createQuizGenerator(new Random());
  const [quiz, setQuiz] = useState(generateQuiz());
  const [message, setMessage] = useState("");
  const [quizStatus, setQuizStatus] = useState(QuizStatus.Thinking);
  const [count, setCount] = useState({ quiz: 0, correct: 0 });

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
    setMessage("");
    setQuizStatus(QuizStatus.Thinking);
  }

  function handleAnswer(correct: boolean) {
    setMessage(correct ? "🎉正解！🎉" : "残念...😢");
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

