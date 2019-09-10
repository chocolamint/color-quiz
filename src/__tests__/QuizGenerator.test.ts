import { Random, range } from "../Utils";
import { createQuizGenerator } from "../quiz/QuizGenerator";
import { Pccs } from "../quiz/PccsColors";
import { exec } from "child_process";

describe("createQuizGenerator", () => {

    describe("ColorChoiceQuiz", () => {

        test("returns quiz", () => {

            const random = new Random(0);
            const generator = createQuizGenerator(random);

            const quiz = generator("ColorChoiceQuiz");

            expect(quiz).toEqual(expect.anything());
            expect(quiz.type).toBe("ColorChoiceQuiz");
            expect(quiz.subType).toEqual(expect.any(String));
            expect(quiz.question).toEqual(expect.any(String));
            expect(quiz.choices).toEqual(expect.any(Array));
            expect(quiz.choices[0]).toHaveProperty("pccsCode");
            expect(quiz.answer).toEqual(expect.any(Number));
        });
    })

    describe("ColorSchemeQuiz", () => {

        test("returns quiz", () => {

            const random = new Random(0);
            const generator = createQuizGenerator(random);

            const quiz = generator("ColorSchemeQuiz");

            expect(quiz).toEqual(expect.anything());
            expect(quiz.type).toBe("ColorSchemeQuiz");
            expect(quiz.subType).toEqual("Dyads");
            expect(quiz.question).toEqual(expect.any(String));
            expect(quiz.choices).toEqual(expect.any(Array));
            expect(quiz.choices[0]).toEqual(expect.any(Array));
            expect(quiz.choices[0][0]).toHaveProperty("pccsCode");
            expect(quiz.answer).toEqual(expect.any(Number));
        });
    });

    test.each(range(0, 200)
    )("answer is dyads (seed: %i)", (seed: number) => {

        const random = new Random(seed);
        const generator = createQuizGenerator(random);

        const quiz = generator("ColorSchemeQuiz");

        for (const [index, [a, b]] of quiz.choices.entries()) {
            const ha = Pccs.deconstruct(a.pccsCode)!;
            const hb = Pccs.deconstruct(b.pccsCode)!;
            const hueDiff = Math.abs(ha.hueNumber - hb.hueNumber);
            if (index === quiz.answer) {
                expect(hueDiff).toBe(12);
            } else {
                expect(hueDiff).not.toBe(12);
            }
        }
    });

    test.each(range(0, 200)
    )("pair color is different color (seed: %i)", (seed: number) => {

        const random = new Random(seed);
        const generator = createQuizGenerator(random);

        const quiz = generator("ColorSchemeQuiz");

        for (const choice of quiz.choices) {
            const distinct = new Set(choice.map(x => x.pccsCode));
            expect(distinct.size).toEqual(choice.length);
        }
    });

    test.each(range(0, 200)
    )("choices are unique (seed: %i)", (seed: number) => {

        const random = new Random(seed);
        const generator = createQuizGenerator(random);

        const quiz = generator("ColorSchemeQuiz");

        const distinct = new Set(quiz.choices.map(x => x.map(x => x.pccsCode).sort().join(",")));
        expect(distinct.size).toBe(4);
    });
});