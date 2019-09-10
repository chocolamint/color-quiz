import { shuffle, Random, blackOrWhite, range, isUnique, combination } from "../Utils";

describe("Random", () => {

    describe("next method", () => {

        test.each([
            [88675123, 10],
            [64184574, 88],
        ])("returns random integer", (seed, expected) => {
            const actual = new Random(seed).next(100);
            expect(actual).toEqual(expected);
        });

        test.each([
            [88675123, 0],
            [64184574, 0],
            [18749251, 0],
            [671521, 0],
            [15871, 1],
            [3494, 0],
        ])("returns in [0...arg)", (seed, expected) => {
            const actual = new Random(seed).next(2);
            expect(actual).toEqual(expected);
        });

        test.each([
            [88675123, 50097, 49903],
            [64184574, 50138, 49862],
            [18749251, 50289, 49711],
        ])("equally possible", (seed, expected0, expected1) => {
            const x: Record<number, number> = { 0: 0, 1: 0 };
            const r = new Random(seed);
            for (let i = 0; i < 100000; i++) {
                x[r.next(2)]++;
            }
            expect(x[0]).toBe(expected0);
            expect(x[1]).toBe(expected1);
        });
    });
});

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

describe("isUnique", () => {

    test("unique array", () => {

        const array = [{ id: 0, name: "a" }, { id: 1, name: "b" }, { id: 2, name: "a" }];
        expect(isUnique(array, x => x.id)).toBe(true);
    });

    test("not unique array", () => {

        const array = [{ id: 0, name: "a" }, { id: 0, name: "b" }, { id: 2, name: "a" }];
        expect(isUnique(array, x => x.id)).toBe(false);
    });
});

describe("combination", () => {

    test("pair", () => {

        const c = combination([1, 2, 3, 4, 5], 2);

        expect(c).toEqual([
            [1, 2], [1, 3], [1, 4], [1, 5],
            [2, 3], [2, 4], [2, 5],
            [3, 4], [3, 5],
            [4, 5]
        ]);
    });

    test("triple", () => {

        const c = combination([1, 2, 3, 4, 5], 3);

        expect(c).toEqual([
            [1, 2, 3], [1, 2, 4], [1, 2, 5],
            [1, 3, 4], [1, 3, 5],
            [1, 4, 5],
            [2, 3, 4], [2, 3, 5], [2, 4, 5],
            [3, 4, 5]
        ]);
    });
});

describe("blackOrWhite", () => {

    test.each([
        ["#ffffff", "black"],
        ["#000000", "white"],
        ["#999999", "black"],
        ["#4A4A4A", "white"],
        ["#4C6068", "white"],
        ["#AE6F85", "black"],
        ["#717D00", "white"],
        ["#9C5DA0", "white"],
        ["#AE6F85", "black"],
    ])("returns sufficient contrast color", (color, expected) => {
        const actual = blackOrWhite(color);
        expect(actual).toBe(expected);
    });
});

describe("range", () => {

    test.each([
        [1, [0]],
        [2, [0, 1]],
        [5, [0, 1, 2, 3, 4]],
    ])("length", (count, expected) => {
        const actual = range(0, count as number);
        expect(actual).toEqual(expected);
    });

    test.each([
        [1, [1, 2, 3, 4, 5]],
        [2, [2, 3, 4, 5, 6]],
        [5, [5, 6, 7, 8, 9]],
    ])("start", (start, expected) => {
        const actual = range(start as number, 5);
        expect(actual).toEqual(expected);
    });
});
