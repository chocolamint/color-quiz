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

export function shuffle<T>(array: T[], random: Random): T[] {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = random.nextInt(i + 1);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
