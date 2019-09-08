import React from 'react';
import { Color } from './colors';
import { blackOrWhite } from '../Utils';

interface WhichCodeProps {
    choices: Color[];
    answer: Color;
    onAnswer: (correct: boolean) => void;
}

interface WhichCodeState {
    choosen?: Color;
}

export default class WhichCode extends React.Component<WhichCodeProps, WhichCodeState> {

    public constructor(props: WhichCodeProps) {
        super(props);

        this.state = {

        };
    }

    public render() {

        const message = this.state.choosen == null ?
            (<div className="question">
                この色はどれ？
            </div>) :
            (<div className="answer">
                <span>
                    {this.isCollect ?
                        `正解！` :
                        `残念...(正解は ${this.props.answer.code} )`}
                </span>
                <br />
                <button onClick={() => this.endGame()} style={{ background: "#ffffff", border: "none", color: "#6666cc", fontSize: 18 }}>
                    次のゲームへ
                </button>
            </div>);

        return (
            <div className="which-code">
                <div className="color" style={{ backgroundColor: this.props.answer.color }}>

                </div>
                <div className="q-and-a">
                    <div className="question">
                        {message}
                    </div>
                    <div className="choices">
                        {this.props.choices.map(color => {

                            const buttonBackground = this.state.choosen == null ? "#ffffff" : color.color;

                            return (
                                <div key={color.code} className="choice">
                                    <button
                                        className="choice-button"
                                        style={{ background: buttonBackground, color: blackOrWhite(buttonBackground) }}
                                        disabled={this.state.choosen != null}
                                        onClick={() => { this.onClickHandle(color); }}
                                    >
                                        {color.code}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    private get isCollect() {
        return this.state.choosen != null && this.state.choosen.code === this.props.answer.code;
    }

    private onClickHandle(color: Color) {
        this.setState({
            choosen: color
        })
    }

    private endGame() {
        const correct = this.isCollect;
        this.setState({
            choosen: undefined
        });
        this.props.onAnswer(correct);
    }
}