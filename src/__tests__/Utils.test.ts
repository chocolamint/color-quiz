import { shuffle, Random } from "../Utils";

describe("shuffle", () => {

    const array = [1, 2, 3, 4];

    test.each([
        [88675123, [2, 4, 1, 3]],
        [64184574, [3, 4, 2, 1]],
    ])("shuffle array (seed: %i)", (seed, expected) => {
        const actual = shuffle(array, new Random(seed as number));
        expect(actual).toEqual(expected);
    });
});
