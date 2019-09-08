import React from 'react';
import './App.css';
import WhichCode from './quiz/WhichCode';
import WhichColor from './quiz/WhichColor';
import { Random, shuffle } from './Utils';
import { colors, Color } from './quiz/colors';

interface AppState {
  questionType: number,
  fourColors: {
    choices: Color[];
    answer: Color;
  }
}

export default class App extends React.Component<{}, AppState> {

  private random = new Random();

  public constructor(props: {}) {
    super(props);

    this.state = this.generateNewState();
  }

  public render() {
    return (
      <div className="App">
        {(() => {
          switch (this.state.questionType) {
            case 0:
              return <WhichCode choices={this.state.fourColors.choices} answer={this.state.fourColors.answer} onAnswer={() => this.handleAnswer()} />
            case 1:
              return <WhichColor choices={this.state.fourColors.choices} answer={this.state.fourColors.answer} onAnswer={() => this.handleAnswer()} />
          }
        })()}
      </div>
    );
  }

  private generateNewState() {
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

  private resetGame() {
    const state = this.generateNewState();
    this.setState(state);
  }

  private handleAnswer() {
    this.resetGame();
  }
}

