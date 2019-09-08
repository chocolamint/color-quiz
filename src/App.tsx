import React from 'react';
import './App.css';
import WhichCode from './quiz/WhichCode';
import WhichColor from './quiz/WhichColor';
import { Random, shuffle } from './Utils';
import { colors, Color } from './quiz/colors';

interface AppState {
  questionType: number;
  questionCount: number;
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

    const question = this.generateNewQuestion();
    this.state = {
      ...question,
      questionCount: 0,
      correctCount: 0
    };
  }

  public render() {
    return (
      <div className="App">
        <header className="header">
          {this.state.questionCount} 問中 {this.state.correctCount} 問正解
        </header>
        <main className="main">
          {(() => {
            switch (this.state.questionType) {
              case 0:
                return <WhichCode choices={this.state.fourColors.choices} answer={this.state.fourColors.answer} onQuizEnd={e => this.handleQuizEnd(e)} />
              case 1:
                return <WhichColor choices={this.state.fourColors.choices} answer={this.state.fourColors.answer} onQuizEnd={e => this.handleQuizEnd(e)} />
            }
          })()}
        </main>
      </div>
    );
  }

  private generateNewQuestion() {
    const questionType = this.random.nextInt(2);
    const choices = shuffle(colors, this.random).slice(0, 4);
    const answer = choices[this.random.nextInt(choices.length)];
    return {
      questionType,
      fourColors: {
        choices,
        answer
      }
    };
  }

  private resetQuiz(correct: boolean) {
    const question = this.generateNewQuestion();
    this.setState({
      ...question,
      questionCount: this.state.questionCount + 1,
      correctCount: this.state.correctCount + (correct ? 1 : 0)
    });
  }

  private handleQuizEnd(correct: boolean) {
    this.resetQuiz(correct);
  }
}

