export type RandomGenerator = () => number;

// https://sbfl.net/blog/2017/06/01/javascript-reproducible-random/
export class Random {

    private x: number;
    private y: number;
    private z: number;
    private w: number;

    constructor(seed = new Date().valueOf()) {
        this.x = 123456789;
        this.y = 362436069;
        this.z = 521288629;
        this.w = seed;
    }

    // XorShift
    private nextDouble() {
        let t;

        t = this.x ^ (this.x << 11);
        this.x = this.y; this.y = this.z; this.z = this.w;
        return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8));
    }

    public next(max: number) {
        const r = Math.abs(this.nextDouble());
        return r % max;
    }
}

export function shuffle<T>(array: readonly T[], random: Random): T[] {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = random.next(i + 1);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export function isUnique<T, U>(array: readonly T[], keySelector: (item: T) => U) {
    return new Set<U>(array.map(keySelector)).size === array.length;
}

export function combination<T>(xs: readonly T[], k: number): T[][] {

    const temp = (xs: readonly T[], i: number, k: number): T[][] => {
        if (k === 0) {
            return xs.slice(i).map(x => [x]);
        }
        const ret = [];
        for (let j = i; j < xs.length; j++) {
            const ys = temp(xs, j + 1, k - 1);
            for (const y of ys) {
                ret.push([xs[j]].concat(y));
            }
        }
        return ret;
    };
    return temp(xs, 0, k - 1);
}

// https://lab.syncer.jp/Web/JavaScript/Snippet/55/
export function blackOrWhite(hexcolor: string): "white" | "black" {
    var r = parseInt(hexcolor.substr(1, 2), 16);
    var g = parseInt(hexcolor.substr(3, 2), 16);
    var b = parseInt(hexcolor.substr(5, 2), 16);

    return ((((r * 299) + (g * 587) + (b * 114)) / 1000) < 128) ? "white" : "black";
}

export function range(start: number, count: number): number[] {
    return [...Array(count)].map((_, i) => i + start);
}

export function assertNever(arg: never): never {
    throw new Error();
}