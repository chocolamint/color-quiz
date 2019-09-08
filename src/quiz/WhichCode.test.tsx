import React from 'react';
import ReactDOM from 'react-dom';
import WhichCode from './WhichCode';

it('renders background color randomly', () => {

    const cases: [number, string][] = [
        [0.14785, "rgb(205, 31, 66)"],
        [0.841858, "rgb(226, 197, 0)"]
    ];

    for (const [num, color] of cases) {

        const div = document.createElement('div');
        const mockRandom = jest.fn(() => num);
        ReactDOM.render(<WhichCode randomGenerator={mockRandom} />, div);
        const colorDiv = div.querySelector(".which-code .color") as (HTMLElement | null);

        expect(mockRandom).toHaveBeenCalled();
        expect(colorDiv).toBeTruthy();
        expect(colorDiv!.style.background).toBe(color);

        ReactDOM.unmountComponentAtNode(div);
    }
});
