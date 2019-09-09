import React from 'react';
import './App.css';
import { Random, shuffle } from './Utils';
import { colors, Color, tones, hues } from './quiz/colors';
import ColorChoice, { ColorChoiceQuiz, ColorChoiceQuizSubType } from './quiz/ColorChoice';
import ColorScheme, { ColorSchemeQuiz } from './quiz/ColorScheme';

type Quiz = ColorSchemeQuiz | ColorChoiceQuiz;

interface AppState {
  quiz: Quiz;
  message: string;
  correct?: boolean;
  quizCount: number;
  correctCount: number;
}

export default class App extends React.Component<{}, AppState> {

  private random = new Random();

  public constructor(props: {}) {
    super(props);

    const { quiz, question } = this.generateNewQuiz();
    this.state = {
      quiz,
      message: question,
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
              case "ColorChoiceQuiz":
                return <ColorChoice quiz={this.state.quiz} message={this.state.message} correct={this.state.correct} onAnswer={e => this.handleAnswer(e)} />
              case "ColorSchemeQuiz":
                return <ColorScheme quiz={this.state.quiz} message={this.state.message} correct={this.state.correct} onAnswer={e => this.handleAnswer(e)} />
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

  private generateNewQuiz(): { quiz: Quiz, question: string } {
    const generateQuiz = this.sample([
      this.generateColorChoiceQuiz.bind(this),
      this.generateXadsQuiz.bind(this)
    ]);

    return generateQuiz();
  }

  private generateColorChoiceQuiz(): { quiz: ColorChoiceQuiz, question: string } {
    const subTypes: ColorChoiceQuizSubType[] = ["ColorChoice", "CodeChoice"];
    const subType = this.sample(subTypes);
    const choices = shuffle(colors, this.random).slice(0, 4);
    const answer = this.sample(choices);
    return {
      quiz: {
        type: "ColorChoiceQuiz",
        subType,
        choices: shuffle(choices, this.random),
        answer: answer
      },
      question: subType === "ColorChoice" ? "このコードはどの色？" : "この色はどれ？"
    };
  }

  private generateXadsQuiz(): { quiz: ColorSchemeQuiz, question: string } {
    const answerHue = this.sample(hues);
    const getComplexHue = (h: number) => h > 12 ? h - 12 : h + 12
    const complexHue = getComplexHue(answerHue);
    const toSomeColor = (hue: number) => {
      const code = tones[this.random.nextInt(tones.length)] + hue;
      return colors.find(x => x.code === code)!
    };
    const randomColors = () => {
      while (true) {
        const hue = this.sample(hues);
        const c = getComplexHue(hue);
        const pair = this.sample(hues.filter(x => x !== c));
        const result = [hue, pair].map(toSomeColor);
        // 偶然同じ色になってしまったらもう1回
        if (result[0].code === result[1].code) continue;
        return result;
      }
    };
    const answer = { key: "answer", colors: [answerHue, complexHue].map(toSomeColor) };
    const choices = [...Array(3)].map((_, i) => i)
      .map(x => ({ key: x.toString(), colors: randomColors() }))
      .concat(answer);

    return {
      quiz: {
        type: "ColorSchemeQuiz",
        subType: "Dyads",
        choices: shuffle(choices, this.random),
        answer: "answer"
      },
      question: "ダイアード配色はどれ？"
    };
  }

  private nextQuiz() {
    const { quiz, question } = this.generateNewQuiz();
    const correct = this.state.correct;
    this.setState({
      quiz,
      message: question,
      correct: undefined,
      quizCount: this.state.quizCount + 1,
      correctCount: this.state.correctCount + (correct ? 1 : 0)
    });
  }

  private handleAnswer(correct: boolean) {
    this.setState({
      message: correct ? "🎉正解！🎉" : "残念...😢",
      correct
    });
  }

  private handleNextQuizButton() {

    this.nextQuiz();
  }
}

