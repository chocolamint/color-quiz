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

        const chooseResult = this.state.choosen == null ?
            <div></div> :
            (<div className="answer" style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, background: "pink" }}>
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
            <div className="which-code" >
                <div className="color" style={{ backgroundColor: this.props.answer.color, width: '100%', height: '50vh' }}>

                </div>
                <div>
                    <p>
                        この色はどれ？
                </p>
                    {this.props.choices.map(color => (
                        <button
                            className="choice"
                            key={color.code}
                            onClick={() => { this.onClickHandle(color); }}
                        >
                            {color.code}
                        </button>
                    ))}
                </div>
                {chooseResult}
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