import React from 'react';
import './App.css';
import WhichCode from './quiz/WhichCode';
import WhichColor from './quiz/WhichColor';
import { Random, shuffle } from './Utils';
import { colors, Color } from './quiz/colors';

interface AppState {
  quizType: number;
  quizCount: number;
  correct?: boolean;
  correctCount: number;
  fourColors: {
    choices: Color[];
    answer: Color;
  }
}

export default class App extends React.Component<{}, AppState> {

  private random = new Random();

  public constructor(props: {}) {
    super(props);

    const quiz = this.generateNewQuiz();
    this.state = {
      ...quiz,
      correct: undefined,
      quizCount: 0,
      correctCount: 0
    };
  }

  public render() {
    return (
      <div className="App">
        <header className="header">
          {this.state.quizCount} 問中 {this.state.correctCount} 問正解
        </header>
        <main className="main">
          {(() => {
            switch (this.state.quizType) {
              case 0:
              case 1:
                return <WhichCode choices={this.state.fourColors.choices} answer={this.state.fourColors.answer} correct={this.state.correct} onAnswer={e => this.handleAnswer(e)} />
              case 1:
                return <WhichColor choices={this.state.fourColors.choices} answer={this.state.fourColors.answer} correct={this.state.correct} onAnswer={e => this.handleAnswer(e)} />
            }
          })()}
        </main>
        <footer className="footer">
          <button className="next-quiz-button" disabled={this.state.correct === undefined} onClick={() => this.handleNextQuizButton()}>
            次のクイズへ
          </button>
        </footer>
      </div>
    );
  }

  private generateNewQuiz() {
    const quizType = this.random.nextInt(2);
    const choices = shuffle(colors, this.random).slice(0, 4);
    const answer = choices[this.random.nextInt(choices.length)];
    return {
      quizType,
      correct: undefined,
      fourColors: {
        choices,
        answer
      }
    };
  }

  private nextQuiz() {
    const quiz = this.generateNewQuiz();
    const correct = this.state.correct;
    this.setState({
      ...quiz,
      quizCount: this.state.quizCount + 1,
      correctCount: this.state.correctCount + (correct ? 1 : 0)
    });
  }

  private handleAnswer(correct: boolean) {
    this.setState({
      correct
    });
  }

  private handleNextQuizButton() {

    this.nextQuiz();
  }
}

