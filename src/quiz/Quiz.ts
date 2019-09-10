import { Color } from "./colors";

export interface QuizComponentProps {
    message: string;
    quizStatus: QuizStatus;
    onAnswer: (correct: boolean) => void;
}

export type Quiz = ColorSchemeQuiz | ColorChoiceQuiz;

export interface ColorChoiceQuiz {
    type: "ColorChoiceQuiz";
    subType: ColorChoiceQuizSubType;
    question: string;
    choices: Color[];
    answer: Color;
}
export type ColorChoiceQuizSubType = "ColorChoice" | "CodeChoice";

export interface ColorSchemeQuiz {
    type: "ColorSchemeQuiz";
    subType: ColorSchemeQuizSubType;
    question: string;
    choices: { key: string, colors: Color[] }[];
    answer: string;
}
export type ColorSchemeQuizSubType = "Dyads";

export enum QuizStatus {
    Thinking,
    Correct,
    Incorrect
}