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
        const questionStyle = {
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexGrow: 1,
            flexShrink: 1,
            color: blackOrWhite(questionBackground),
            backgroundColor: questionBackground,
            fontSize: 30,
            width: '100%',
            height: "30%"
        };
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
            <div className="which-code" style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}>
                <div className="color" style={questionStyle}>
                    {this.props.answer.code}
                </div>
                <div style={{ flexGrow: 1, flexShrink: 1 }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", height: "4em", verticalAlign: "middle", fontSize: 18 }}>
                        {message}
                    </div>
                    <div className="choices" style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", padding: "0 5vw" }}>
                        {this.props.choices.map(color => {

                            const buttonText = this.state.choosen == null ? "" : color.code;
                            const buttonStyle: React.CSSProperties = {
                                width: "100%",
                                height: "100%",
                                background: color.color,
                                color: blackOrWhite(color.color),
                                border: "solid 1px #999999",
                                fontSize: 20,
                                borderRadius: 4
                            };

                            return (
                                <div key={color.code} style={{ display: "flex", width: "40vw", height: "20vh", padding: "1vh 0" }}>
                                    <button
                                        className="choice"
                                        style={buttonStyle}
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