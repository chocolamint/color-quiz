import React from 'react';
import { Color } from './colors';
import { blackOrWhite } from '../Utils';

interface WhichColorProps {
    choices: Color[];
    answer: Color;
    onAnswer: () => void;
}

interface WhichColorState {
    choosen?: Color;
}

export default class WhichColor extends React.Component<WhichColorProps, WhichColorState> {

    public constructor(props: WhichColorProps) {
        super(props);

        this.state = {

        };
    }

    public render() {

        const questionBackground = this.state.choosen == null ? "#ffffff" : this.props.answer.color;
        const message = this.state.choosen == null ?
            (<div className="question">
                このコードはどの色？
            </div>) :
            (<div className="answer">
                <span>
                    {(this.state.choosen!.code === this.props.answer.code) ?
                        `正解！` :
                        `残念...(正解は ${this.props.answer.code} )`}
                </span>
                <br />
                <button onClick={() => this.endGame()} style={{ background: "#ffffff", border: "none", color: "#6666cc", fontSize: 18 }}>
                    次のゲームへ
                </button>
            </div>);

        return (
            <div className="which-color">
                <div className="color" style={{ color: blackOrWhite(questionBackground), background: questionBackground }}>
                    {this.props.answer.code}
                </div>
                <div className="q-and-a">
                    <div className="question">
                        {message}
                    </div>
                    <div className="choices">
                        {this.props.choices.map(color => {
                            const buttonText = this.state.choosen == null ? "" : color.code;
                            return (
                                <div key={color.code} className="choice">
                                    <button
                                        className="choice-button"
                                        style={{ background: color.color, color: blackOrWhite(color.color) }}
                                        disabled={this.state.choosen != null}
                                        onClick={() => { this.onClickHandle(color); }}
                                    >
                                        {buttonText}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    private onClickHandle(color: Color) {
        this.setState({
            choosen: color
        })
    }

    private endGame() {
        this.setState({
            choosen: undefined
        });
        this.props.onAnswer();
    }
}