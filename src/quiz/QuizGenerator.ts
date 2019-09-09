import { ColorSchemeQuiz } from "./ColorScheme";
import { ColorChoiceQuiz, ColorChoiceQuizSubType } from "./ColorChoice";
import { Random, shuffle as utilShuffle } from "../Utils";
import { hues, tones, colors } from "./colors";

export type Quiz = ColorSchemeQuiz | ColorChoiceQuiz;
export type QuizGenerator = () => { question: string; quiz: Quiz };

export function createQuizGenerator(random: Random): QuizGenerator {

    function sample<T>(array: ReadonlyArray<T>) {
        return array[random.nextInt(array.length)];
    }
    function shuffle<T>(array: ReadonlyArray<T>) {
        return utilShuffle(array, random);
    }

    function generateColorChoiceQuiz(): { quiz: ColorChoiceQuiz, question: string } {
        const subTypes: ColorChoiceQuizSubType[] = ["ColorChoice", "CodeChoice"];
        const subType = sample(subTypes);
        const question = subType === "ColorChoice" ? "このコードはどの色？" : "この色はどれ？";
        const choices = shuffle(colors).slice(0, 4);
        const answer = sample(choices);

        return {
            question,
            quiz: {
                type: "ColorChoiceQuiz",
                subType,
                choices: shuffle(choices),
                answer: answer
            },
        };
    }
    function generateXadsQuiz(): { quiz: ColorSchemeQuiz, question: string } {
        const answerHue = sample(hues);
        const getComplexHue = (h: number) => h > 12 ? h - 12 : h + 12
        const complexHue = getComplexHue(answerHue);
        const toSomeColor = (hue: number) => {
            const code = sample(tones) + hue;
            return colors.find(x => x.code === code)!
        };
        const randomColors = () => {
            while (true) {
                const hue = sample(hues);
                const c = getComplexHue(hue);
                const pair = sample(hues.filter(x => x !== c));
                const result = [hue, pair].map(toSomeColor);
                // 偶然同じ色になってしまったらもう1回
                if (result[0].code === result[1].code) continue;
                return result;
            }
        };
        const answer = { key: "answer", colors: [answerHue, complexHue].map(toSomeColor) };
        const choices = [...Array(3)].map((_, i) => i)
            .map(x => ({ key: x.toString(), colors: randomColors() }))
            .concat(answer);

        return {
            question: "ダイアード配色はどれ？",
            quiz: {
                type: "ColorSchemeQuiz",
                subType: "Dyads",
                choices: shuffle(choices),
                answer: "answer"
            },
        };
    }

    const generators = [
        generateColorChoiceQuiz,
        generateXadsQuiz
    ];

    return function (): { quiz: Quiz, question: string } {
        const generator = sample(generators);
        return generator();
    };
}