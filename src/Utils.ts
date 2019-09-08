export type RandomGenerator = () => number;

export function random(max: number, randomGenerator: RandomGenerator = Math.random) {
    return Math.floor(max * randomGenerator());
}

export function shuffle<T>(array: T[], randomGenerator: RandomGenerator = Math.random): T[] {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = random(i + 1, randomGenerator);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}