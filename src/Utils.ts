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
    next() {
        let t;

        t = this.x ^ (this.x << 11);
        this.x = this.y; this.y = this.z; this.z = this.w;
        return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8));
    }

    nextInt(max: number) {
        const r = Math.abs(this.next());
        return r % max;
    }
}

export function shuffle<T>(array: ReadonlyArray<T>, random: Random): T[] {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = random.nextInt(i + 1);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
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