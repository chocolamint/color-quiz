export function random(max: number, randomGenerator: () => number = Math.random) {
    return Math.floor(max * randomGenerator());
}
