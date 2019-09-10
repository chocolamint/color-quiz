import { Random } from "../Utils";
import { createQuizGenerator } from "../quiz/QuizGenerator";

describe("createQuizGenerator", () => {

    test("returns ColorChoiceQuiz", () => {

        const random = new Random(0);
        const generator = createQuizGenerator(random);

        const quiz = generator("ColorChoiceQuiz");

        expect(quiz).toEqual(expect.anything());
        expect(quiz.type).toEqual("ColorChoiceQuiz");
        expect(quiz.subType).toEqual(expect.any(String));
        expect(quiz.question).toEqual(expect.any(String));
        expect(quiz.choices).toEqual(expect.any(Array));
        expect(quiz.answer).toEqual(expect.any(Number));
    });
});