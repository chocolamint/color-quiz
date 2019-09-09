import React from 'react';
import './App.css';
import WhichCode from './quiz/WhichCode';
import WhichColor from './quiz/WhichColor';
import { Random, shuffle } from './Utils';
import { colors, Color, tones, hues } from './quiz/colors';
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

  private sample<T>(array: ReadonlyArray<T>): T {
    return array[this.random.nextInt(array.length)];
  }

  private generateNewQuiz(): Quiz {
    const quizType = "WhichIsTheXadsQuiz";//this.random.nextInt(2);
    // const choices = shuffle(colors, this.random).slice(0, 4);
    // const answer = choices[this.random.nextInt(choices.length)];
    const answerHue = this.sample(hues);
    const getComplexHue = (h: number) => h > 12 ? h - 12 : h + 12
    const complexHue = getComplexHue(answerHue);
    const toSomeColor = (hue: number) => {
      const code = tones[this.random.nextInt(tones.length)] + hue;
      return colors.find(x => x.code == code)!
    };
    const randomColors = () => {
      const hue = this.sample(hues);
      const c = getComplexHue(hue);
      const pair = this.sample(hues.filter(x => x !== c));
      return [hue, pair].map(toSomeColor);
    };
    const answer = { key: "answer", colors: [answerHue, complexHue].map(toSomeColor) };
    const choices = [...Array(3)].map((_, i) => i)
      .map(x => ({ key: x.toString(), colors: randomColors() }))
      .concat(answer);

    return {
      type: quizType,
      choices: shuffle(choices, this.random),
      answer: "answer"
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

