import React from 'react';
import './App.css';
import WhichCode from './quiz/WhichCode';
import { Random } from './Utils';

interface AppState {
  random: Random
}

export default class App extends React.Component<{}, AppState> {

  public constructor(props: {}) {
    super(props);

    this.state = {
      random: new Random()
    };
  }
  public render() {
    return (
      <div className="App">
        <WhichCode random={this.state.random} onAnswer={(e) => this.handleAnswer(e)} />
      </div>
    );
  }

  private handleAnswer(collect: boolean) {
    alert(collect ? "正解！" : "残念...");
  }
}

