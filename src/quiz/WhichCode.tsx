import React from 'react';
import { Color } from './colors';

interface WhichCodeProps {
    choices: Color[];
    answer: Color;
    onAnswer: () => void;
}

interface WitchCodeState {
    choosen?: Color;
}

export default class WhichCode extends React.Component<WhichCodeProps, WitchCodeState> {

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
                    {(this.state.choosen!.code === this.props.answer.code) ?
                        `正解！` :
                        `残念...(正解は ${this.props.answer.code} )`}
                </span>
                <button onClick={() => this.endGame()}>
                    次のゲームへ
                </button>
            </div>);

        return (
            <div className="which-code" style={{ display: "flex", flexDirection: "column" }}>
                <div className="color" style={{ backgroundColor: this.props.answer.color, width: '100%', height: '50vh' }}>

                </div>
                <div>
                    <div style={{ height: "2em", lineHeight: "2em", verticalAlign: "middle" }}>
                        {message}
                    </div>
                    <div className="choices" style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
                        {this.props.choices.map(color => (
                            <div style={{ display: "flex", width: "40vw", height: "20vh", padding: "0.5vh 0.5vw" }}>
                                <button
                                    className="choice"
                                    key={color.code}
                                    style={{ width: "100%", height: "100%", background: "#ffffff", border: "solid 1px #999999", borderRadius: 4 }}
                                    onClick={() => { this.onClickHandle(color); }}
                                >
                                    {color.code}
                                </button>
                            </div>
                        ))}
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