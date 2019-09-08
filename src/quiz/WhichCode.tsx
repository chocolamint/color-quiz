import React from 'react';
import { Color } from './colors';
import { blackOrWhite } from '../Utils';

interface WhichCodeProps {
    choices: Color[];
    answer: Color;
    onAnswer: () => void;
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
            <div className="which-code" style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}>
                <div className="color" style={{ flexGrow: 1, flexShrink: 1, backgroundColor: this.props.answer.color, width: '100%', height: "30%" }}>

                </div>
                <div style={{ flexGrow: 1, flexShrink: 1 }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", height: "4em", verticalAlign: "middle", fontSize: 18 }}>
                        {message}
                    </div>
                    <div className="choices" style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", padding: "0 5vw" }}>
                        {this.props.choices.map(color => {

                            const buttonBackground = this.state.choosen == null ? "#ffffff" : color.color;
                            const buttonStyle: React.CSSProperties = {
                                width: "100%",
                                height: "100%",
                                background: buttonBackground,
                                color: blackOrWhite(buttonBackground),
                                border: "solid 1px #999999",
                                fontSize: 20,
                                borderRadius: 4
                            };

                            return (
                                <div style={{ display: "flex", width: "40vw", height: "20vh", padding: "1vh 0" }}>
                                    <button
                                        className="choice"
                                        key={color.code}
                                        style={buttonStyle}
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