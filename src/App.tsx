import React from 'react';
import './App.css';
import WhichCode from './quiz/WhichCode';
import WhichColor from './quiz/WhichColor';
import { Random, shuffle } from './Utils';
import { colors, Color } from './quiz/colors';
import WhichIsTheXads, { WhichIsTheXadsQuiz } from './quiz/WhichIsTheXads';

type Quiz = WhichIsTheXadsQuiz;

interface AppState {
  quizType: number;
  quizCount: number;
  correct?: boolean;
  correctCount: number;
  fourColors: {
    choices: Color[];
    answer: Color;
  },
  quizWhichDyads: Quiz
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
          色彩クイズ
        </header>
        <main className="main">
          {(() => {
            return <WhichIsTheXads quiz={this.state.quizWhichDyads} correct={this.state.correct} onAnswer={e => this.handleAnswer(e)} />
            switch (this.state.quizType) {
              case 0:
                return <WhichCode choices={this.state.fourColors.choices} answer={this.state.fourColors.answer} correct={this.state.correct} onAnswer={e => this.handleAnswer(e)} />
              case 1:
                return <WhichColor choices={this.state.fourColors.choices} answer={this.state.fourColors.answer} correct={this.state.correct} onAnswer={e => this.handleAnswer(e)} />
            }
          })()}
        </main>
        <footer className="footer">
          <div className="control-buttons">
            <button className="next-quiz-button" disabled={this.state.correct === undefined} onClick={() => this.handleNextQuizButton()}>
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
      },
      quizWhichDyads: {
        choices: [
          { key: "1", colors: [colors[0], colors[1]] },
          { key: "2", colors: [colors[2], colors[3]] },
          { key: "3", colors: [colors[4], colors[5]] },
          { key: "4", colors: [colors[6], colors[7]] },
        ],
        answer: "2"
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

