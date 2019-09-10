import { PccsColor } from "./PccsColors";

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
    choices: PccsColor[];
    answer: number;
}
export type ColorChoiceQuizSubType = "ColorChoice" | "CodeChoice";

export interface ColorSchemeQuiz {
    type: "ColorSchemeQuiz";
    subType: ColorSchemeQuizSubType;
    question: string;
    choices: PccsColor[][];
    answer: number;
}
export type ColorSchemeQuizSubType = "Dyads";

export enum QuizStatus {
    Thinking,
    Correct,
    Incorrect
}