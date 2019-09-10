import { Random, shuffle as utilShuffle, range } from "../Utils";
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
        const answerHue = sample(Pccs.hueNumbers);
        const complexHue = Pccs.complex(answerHue);
        const toSomeColor = (h: HueNumber) => Pccs.find(sample(Pccs.tones), h);
        const randomColors = () => {
            while (true) {
                const hue1 = sample(Pccs.hueNumbers);
                const hue2 = sample(Pccs.hueNumbers.filter(x => x !== Pccs.complex(hue1)));
                const pair = [hue1, hue2].map(toSomeColor);
                // 偶然同じ色になってしまったらもう1回
                if (pair[0].pccsCode === pair[1].pccsCode) continue;
                return pair;
            }
        };
        const answerPair = [answerHue, complexHue].map(toSomeColor);
        const answer = randomAnswer();
        const choices = insertAt(
            range(0, 3).map(_ => randomColors()),
            answer, answerPair
        );

        // 偶然同じ色の組み合わせが複数できてしまったらもう1回
        if (new Set(choices.map(x => x.map(y => y.pccsCode).sort().join(","))).size !== 4) {
            return generateXadsQuiz();
        }

        return {
            type: "ColorSchemeQuiz",
            subType: "Dyads",
            question: "ダイアード配色はどれ？",
            choices: choices,
            answer: answer
        };
    }

    const generators = [
        generateColorChoiceQuiz,
        generateXadsQuiz
    ];

    const selectGenerator = (type?: QuizType): () => Quiz => {
        if (type === undefined) {
            return sample(generators);
        } else {
            switch (type) {
                case "ColorChoiceQuiz":
                    return generateColorChoiceQuiz;
                case "ColorSchemeQuiz":
                    return generateXadsQuiz;
                default:
                    return type; // never
            }
        }
    }

    return function <T extends QuizType>(type?: T): undefined extends T ? Quiz : Extract<Quiz, { type: T }> {
        const generateQuiz = selectGenerator(type);
        return generateQuiz() as any;
    };
}