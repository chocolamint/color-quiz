import { Random, shuffle as utilShuffle } from "../Utils";
import { Pccs, HueNumber } from "./PccsColors";
import { ColorSchemeQuiz, ColorChoiceQuiz, ColorChoiceQuizSubType, Quiz } from "./Quiz";

export type QuizGenerator = () => Quiz;

export function createQuizGenerator(random: Random): QuizGenerator {

    function sample<T>(array: ReadonlyArray<T>) {
        return array[random.nextInt(array.length)];
    }
    function shuffle<T>(array: ReadonlyArray<T>) {
        return utilShuffle(array, random);
    }

    function generateColorChoiceQuiz(): ColorChoiceQuiz {
        const subTypes: ColorChoiceQuizSubType[] = ["ColorChoice", "CodeChoice"];
        const subType = sample(subTypes);
        const question = subType === "ColorChoice" ? "このコードはどの色？" : "この色はどれ？";
        const choices = shuffle(Pccs.colors).slice(0, 4);
        const answer = sample(choices);

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
        const getComplexHue = (h: HueNumber) => (h > 12 ? h - 12 : h + 12) as HueNumber;
        const complexHue = getComplexHue(answerHue);
        const toSomeColor = (h: HueNumber) => Pccs.find(sample(Pccs.tones), h);
        const randomColors = () => {
            while (true) {
                const hue = sample(Pccs.hueNumbers);
                const c = getComplexHue(hue);
                const pair = sample(Pccs.hueNumbers.filter(x => x !== c));
                const result = [hue, pair].map(toSomeColor);
                // 偶然同じ色になってしまったらもう1回
                if (result[0].pccsCode === result[1].pccsCode) continue;
                return result;
            }
        };
        const answer = { key: "answer", colors: [answerHue, complexHue].map(toSomeColor) };
        const choices = [...Array(3)].map((_, i) => i)
            .map(x => ({ key: x.toString(), colors: randomColors() }))
            .concat(answer);

        return {
            type: "ColorSchemeQuiz",
            subType: "Dyads",
            question: "ダイアード配色はどれ？",
            choices: shuffle(choices),
            answer: "answer"
        };
    }

    const generators = [
        generateColorChoiceQuiz,
        generateXadsQuiz
    ];

    return function (): Quiz {
        const generateQuiz = sample(generators);
        return generateQuiz();
    };
}