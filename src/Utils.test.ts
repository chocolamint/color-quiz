import { random } from "./Utils";

describe("random", () => {

    it("should be equally possible", () => {

        expect(random(5, () => 1 - Number.EPSILON)).toBe(4);
        expect(random(5, () => 0.9)).toBe(4);
        expect(random(5, () => 0.8)).toBe(4);

        expect(random(5, () => 0.8 - Number.EPSILON)).toBe(3);
        expect(random(5, () => 0.7)).toBe(3);
        expect(random(5, () => 0.6)).toBe(3);

        expect(random(5, () => 0.6 - Number.EPSILON)).toBe(2);
        expect(random(5, () => 0.5)).toBe(2);
        expect(random(5, () => 0.4)).toBe(2);

        expect(random(5, () => 0.4 - Number.EPSILON)).toBe(1);
        expect(random(5, () => 0.3)).toBe(1);
        expect(random(5, () => 0.2)).toBe(1);

        expect(random(5, () => 0.2 - Number.EPSILON)).toBe(0);
        expect(random(5, () => 0.1)).toBe(0);
        expect(random(5, () => 0.0)).toBe(0);
    });
});
