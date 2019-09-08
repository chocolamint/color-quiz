import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import WhichCode from './WhichCode';
import { act } from "react-dom/test-utils";
import { mockRandom } from '../TestHelper';

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

        const cases: [1 | 2, string][] = [
            [1, "rgb(0, 178, 117)"],
            [2, "rgb(217, 149, 172)"]
        ];

        for (const [pattern, color] of cases) {

            it('renders color randomly', () => {

                const random = mockRandom(pattern);
                ReactDOM.render(<WhichCode randomGenerator={random} onAnswer={() => { }} />, container);
                const containerDiv = container as HTMLDivElement;
                const colorDiv = containerDiv.querySelector(".which-code .color") as (HTMLElement | null);

                expect(random).toHaveBeenCalled();
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

                const random = mockRandom();
                const onAnswer = jest.fn(x => console.log(`${choice[0]}: ${x}`));

                ReactDOM.render(<WhichCode randomGenerator={random} onAnswer={onAnswer} />, container);
                const buttons = (container as HTMLDivElement).querySelectorAll("button.choice");

                expect(random).toHaveBeenCalled();
                act(() => {
                    buttons[choice[0]].dispatchEvent(new MouseEvent("click", { bubbles: true }));
                });
                expect(onAnswer).toHaveBeenCalledWith(choice[1]);
            });
        }
    });
});
