import React from 'react';
import './App.css';
import WhichCode from './quiz/WhichCode';
import { Random, shuffle } from './Utils';
import { colors, Color } from './quiz/colors';

interface AppState {
  whichCode: {
    choices: Color[];
    answer: Color;
  }
}

export default class App extends React.Component<{}, AppState> {

  public constructor(props: {}) {
    super(props);

    this.state = {
      whichCode: this.generateState()
    };
  }

  public render() {
    return (
      <div className="App">
        <WhichCode choices={this.state.whichCode.choices} answer={this.state.whichCode.answer} onAnswer={() => this.handleAnswer()} />
      </div>
    );
  }

  private generateState() {
    const random = new Random();
    const choices = shuffle(colors, random).slice(0, 4);
    const answer = choices[random.nextInt(choices.length)];
    return { choices, answer };
  }

  private resetGame() {
    const state = this.generateState();
    this.setState({
      whichCode: state
    });
  }

  private handleAnswer() {
    this.resetGame();
  }
}

