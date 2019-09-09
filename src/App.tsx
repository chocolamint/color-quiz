import React from 'react';
import './App.css';
import WhichCode from './quiz/WhichCode';
import WhichColor from './quiz/WhichColor';
import { Random, shuffle } from './Utils';
import { colors, Color } from './quiz/colors';
import WhichIsTheXads, { WhichIsTheXadsQuiz } from './quiz/WhichIsTheXads';

type Quiz = WhichIsTheXadsQuiz | WhichCodeQuiz | WhichColorQuiz;

interface WhichCodeQuiz {
  type: "WhichCodeQuiz",
  choices: Color[];
  answer: Color;
}

interface WhichColorQuiz {
  type: "WhichColorQuiz",
  choices: Color[];
  answer: Color;
}

interface AppState {
  quiz: Quiz;
  correct?: boolean;
  quizCount: number;
  correctCount: number;
}

export default class App extends React.Component<{}, AppState> {

  private random = new Random();

  public constructor(props: {}) {
    super(props);

    const quiz = this.generateNewQuiz();
    this.state = {
      quiz,
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
            switch (this.state.quiz.type) {
              case "WhichCodeQuiz":
                return <WhichCode choices={this.state.quiz.choices} answer={this.state.quiz.answer} correct={this.state.correct} onAnswer={e => this.handleAnswer(e)} />
              case "WhichColorQuiz":
                return <WhichColor choices={this.state.quiz.choices} answer={this.state.quiz.answer} correct={this.state.correct} onAnswer={e => this.handleAnswer(e)} />
              case "WhichIsTheXadsQuiz":
                return <WhichIsTheXads quiz={this.state.quiz} correct={this.state.correct} onAnswer={e => this.handleAnswer(e)} />
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

  private generateNewQuiz(): Quiz {
    const quizType = "WhichIsTheXadsQuiz";//this.random.nextInt(2);
    const choices = shuffle(colors, this.random).slice(0, 4);
    const answer = choices[this.random.nextInt(choices.length)];
    return {
      type: quizType,
      choices: [
        { key: "1", colors: [colors[0], colors[1]] },
        { key: "2", colors: [colors[2], colors[3]] },
        { key: "3", colors: [colors[4], colors[5]] },
        { key: "4", colors: [colors[6], colors[7]] },
      ],
      answer: "2"
      // correct: undefined,
      // fourColors: {
      //   choices,
      //   answer
      // },
      // quizWhichDyads: {
      // }
    };
  }

  private nextQuiz() {
    const quiz = this.generateNewQuiz();
    const correct = this.state.correct;
    this.setState({
      quiz,
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

