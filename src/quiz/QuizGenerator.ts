import { Random, shuffle as utilShuffle, range, isUnique, assertNever } from "../Utils";
import { Pccs, HueNumber } from "./PccsColors";
import { ColorSchemeQuiz, ColorChoiceQuiz, Quiz } from "./Quiz";

type QuizType = Quiz["type"];
export type QuizGenerator = <T extends QuizType>(type?: T)
    => undefined extends T ? Quiz : Extract<Quiz, { type: T }>;

export function createQuizGenerator(random: Random): QuizGenerator {

    function sample<T>(array: ReadonlyArray<T>) {
        return array[random.next(array.length)];
    }
    function shuffle<T>(array: ReadonlyArray<T>) {
        return utilShuffle(array, random);
    }
    function randomAnswer() {
        return random.next(4) as 0 | 1 | 2 | 3;
    }
    function insertAt<T>(array: ReadonlyArray<T>, index: number, item: T) {
        const copy = array.slice();
        copy.splice(index, 0, item);
        return copy;
    }

    function generateColorChoiceQuiz(): ColorChoiceQuiz {
        const subTypes = ["ColorChoice", "CodeChoice"] as const;
        const subType = sample(subTypes);
        const question = subType === "ColorChoice" ? "このコードはどの色？" : "この色はどれ？";
        const choices = shuffle(Pccs.colors).slice(0, 4);
        const answer = randomAnswer();

        return {
            type: "ColorChoiceQuiz",
            subType,
            question,
            choices: shuffle(choices),
            answer: answer
        };
    }
    function generateXadsQuiz(): ColorSchemeQuiz {
        const n = random.next(3) + 2 as 2 | 3 | 4;
        const answerHue = sample(Pccs.hueNumbers);
        const answerTuple = [answerHue, ...Pccs.xads(answerHue, n)].map(toSomeColor);
        const answerIndex = randomAnswer();
        const choices = insertAt(range(0, 3).map(_ => randomColors(n)), answerIndex, answerTuple);

        // 偶然同じ色の組み合わせが複数できてしまったらもう1回
        if (!isUnique(choices, c => c.map(x => x.pccsCode).sort().join(','))) {
            return generateXadsQuiz();
        }

        return {
            type: "ColorSchemeQuiz",
            subType: n === 2 ? "Dyads" : n === 3 ? "Triads" : "Tetrads",
            question: `${n === 2 ? "ダイアード" : n === 3 ? "トライアド" : "テトラード"}配色はどれ？`,
            choices: choices,
            answer: answerIndex
        };

        function toSomeColor(h: HueNumber) {
            return Pccs.find(sample(Pccs.tones), h);
        }
        function randomColors(n: 2 | 3 | 4) {
            while (true) {
                const hues = [sample(Pccs.hueNumbers)];
                const noSelect = Pccs.xads(hues[0], n);
                hues.push(sample(Pccs.hueNumbers.filter(x => !noSelect.includes(x))));
                if (n > 2) {
                    // eslint-disable-next-line
                    for (const _ of range(0, n - 2)) {
                        hues.push(sample(Pccs.hueNumbers));
                    }
                }
                const pair = hues.map(toSomeColor);
                // 偶然同じ色になってしまったらもう1回
                if (!isUnique(pair, x => x.pccsCode)) continue;
                return pair;
            }
        }
    }

    const generators = [
        generateColorChoiceQuiz,
        generateXadsQuiz
    ];

    const selectGenerator = (type?: QuizType): () => Quiz => {
        switch (type) {
            case undefined:
                return sample(generators);
            case "ColorChoiceQuiz":
                return generateColorChoiceQuiz;
            case "ColorSchemeQuiz":
                return generateXadsQuiz;
            default:
                return assertNever(type); // never
        }
    }

    return function <T extends QuizType>(type?: T): undefined extends T ? Quiz : Extract<Quiz, { type: T }> {
        const generateQuiz = selectGenerator(type);
        return generateQuiz() as any;
    };
}