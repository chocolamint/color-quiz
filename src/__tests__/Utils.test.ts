import { shuffle, Random } from "../Utils";

describe("shuffle", () => {

    it("shuffle array", () => {

        const array = [1, 2, 3, 4];
        const actual = shuffle(array, new Random(88675123));

        expect(actual).toEqual([2, 4, 1, 3]);
    });
});
