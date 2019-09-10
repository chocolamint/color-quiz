import { Random } from "../Utils";
import { createQuizGenerator } from "../quiz/QuizGenerator";

describe("createQuizGenerator", () => {

    describe("ColorChoiceQuiz", () => {

        test("returns quiz", () => {

            const random = new Random(0);
            const generator = createQuizGenerator(random);

            const quiz = generator("ColorChoiceQuiz");

            expect(quiz).toEqual(expect.anything());
            expect(quiz.type).toBe("ColorChoiceQuiz");
            if (quiz.type !== "ColorChoiceQuiz") throw Error(); // asserts ;-(
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
            if (quiz.type !== "ColorSchemeQuiz") throw Error(); // asserts ;-(
            expect(quiz.subType).toEqual(expect.any(String));
            expect(quiz.question).toEqual(expect.any(String));
            expect(quiz.choices).toEqual(expect.any(Array));
            expect(quiz.choices[0]).toEqual(expect.any(Array));
            expect(quiz.choices[0][0]).toHaveProperty("pccsCode");
            expect(quiz.answer).toEqual(expect.any(Number));
        });
    });
});