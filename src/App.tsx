import React from 'react';
import './App.css';
import WhichCode from './quiz/WhichCode';

export default class App extends React.Component {

  public render() {
    return (
      <div className="App">
        <WhichCode randomGenerator={Math.random} onAnswer={(e) => this.handleAnswer(e)} />
      </div>
    );
  }

  private handleAnswer(collect: boolean) {
    alert(collect ? "正解！" : "残念...");
  }
}

