import React from 'react';
import ReactDOM from 'react-dom';
import WhichCode from './WhichCode';

it('renders background color randomly', () => {

    const cases: [number, string][] = [
        [18, "rgb(0, 163, 155)"],
        [63, "rgb(161, 142, 64)"]
    ];

    for (const [num, color] of cases) {

        const div = document.createElement('div');
        const mockRandom = jest.fn(() => num);
        ReactDOM.render(<WhichCode random={mockRandom} />, div);
        const colorDiv = div.querySelector(".which-code .color") as (HTMLElement | null);

        expect(mockRandom).toHaveBeenCalled();
        expect(colorDiv).toBeTruthy();
        expect(colorDiv!.style.background).toBe(color);

        ReactDOM.unmountComponentAtNode(div);
    }
});
