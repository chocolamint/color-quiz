import React from 'react';
import './App.css';
import { Random } from './Utils';
import ColorChoice from './quiz/ColorChoice';
import ColorScheme from './quiz/ColorScheme';
import { QuizStatus } from './quiz/Quiz';
import { createQuizGenerator, Quiz, QuizGenerator } from './quiz/QuizGenerator';


interface AppState {
  quiz: Quiz;
  message: string;
  quizStatus: QuizStatus;
  quizCount: number;
  correctCount: number;
}

export default class App extends React.Component<{}, AppState> {

  private generateQuiz: QuizGenerator;

  public constructor(props: {}) {
    super(props);

    this.generateQuiz = createQuizGenerator(new Random());
    const { quiz, question } = this.generateQuiz();
    this.state = {
      quiz,
      message: question,
      quizStatus: QuizStatus.Thinking,
      quizCount: 0,
      correctCount: 0
    };
  }

  public render() {
    return (
      <div className="App">
        <header className="header">
          色彩クイズ
        </header>
        <main className="main">
          {(() => {
            switch (this.state.quiz.type) {
              case "ColorChoiceQuiz":
                return <ColorChoice quiz={this.state.quiz} message={this.state.message} quizStatus={this.state.quizStatus} onAnswer={e => this.handleAnswer(e)} />
              case "ColorSchemeQuiz":
                return <ColorScheme quiz={this.state.quiz} message={this.state.message} quizStatus={this.state.quizStatus} onAnswer={e => this.handleAnswer(e)} />
            }
          })()}
        </main>
        <footer className="footer">
          <div className="control-buttons">
            <button className="next-quiz-button" disabled={this.state.quizStatus === QuizStatus.Thinking} onClick={() => this.handleNextQuizButton()}>
              次のクイズへ
          </button>
          </div>
          <div className="status">
            正解数: {this.state.correctCount} / {this.state.quizCount}
          </div>
        </footer>
      </div>
    );
  }

  private nextQuiz() {
    const { quiz, question } = this.generateQuiz();
    this.setState({
      quiz,
      message: question,
      quizStatus: QuizStatus.Thinking,
      quizCount: this.state.quizCount + 1,
      correctCount: this.state.correctCount + (this.state.quizStatus === QuizStatus.Correct ? 1 : 0)
    });
  }

  private handleAnswer(correct: boolean) {
    this.setState({
      message: correct ? "🎉正解！🎉" : "残念...😢",
      quizStatus: correct ? QuizStatus.Correct : QuizStatus.Incorrect
    });
  }

  private handleNextQuizButton() {

    this.nextQuiz();
  }
}

