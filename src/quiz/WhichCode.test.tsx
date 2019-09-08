import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import WhichCode from './WhichCode';
import { act } from "react-dom/test-utils";
import { mockRandom } from '../TestHelper';
import { Random } from '../Utils';

describe("WhichCode.tsx", () => {

    let container: Element | null = null;
    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container!);
        container!.remove();
        container = null;
    });

    describe('some random cases', () => {

        const cases: [number, string][] = [
            [1, "rgb(0, 126, 119)"],
            [2, "rgb(112, 75, 26)"]
        ];

        for (const [seed, color] of cases) {

            it('renders color randomly', () => {

                ReactDOM.render(<WhichCode random={new Random(seed)} onAnswer={() => { }} />, container);
                const containerDiv = container as HTMLDivElement;
                const colorDiv = containerDiv.querySelector(".which-code .color") as (HTMLElement | null);

                expect(colorDiv).toBeTruthy();
                expect(colorDiv!.style.background).toBe(color);
            });
        }
    });

    describe("onAnswer event", () => {

        const choices: [number, boolean][] = [
            [0, false],
            [1, false],
            [2, false],
            [3, true]
        ];

        for (const choice of choices) {

            it('raises with boolean value', () => {

                const onAnswer = jest.fn();

                ReactDOM.render(<WhichCode random={new Random(1)} onAnswer={onAnswer} />, container);
                const buttons = (container as HTMLDivElement).querySelectorAll("button.choice");

                act(() => {
                    buttons[choice[0]].dispatchEvent(new MouseEvent("click", { bubbles: true }));
                });
                expect(onAnswer).toHaveBeenCalledWith(choice[1]);
            });
        }
    });
});
