import { PccsColor } from "./PccsColors";
import { blackOrWhite } from "../Utils";

export interface QuizComponentProps {
    message: string;
    quizStatus: QuizStatus;
    onAnswer: (correct: boolean) => void;
}

export function drawBackground(color: string | PccsColor) {
    const hexCode = typeof color === "string" ? color : color.hexCode;
    return {
        color: blackOrWhite(hexCode),
        backgroundColor: hexCode
    };
}

export type Quiz = ColorSchemeQuiz | ColorChoiceQuiz;

export interface ColorChoiceQuiz {
    type: "ColorChoiceQuiz";
    subType: "ColorChoice" | "CodeChoice";
    question: string;
    choices: PccsColor[];
    answer: number;
}

export interface ColorSchemeQuiz {
    type: "ColorSchemeQuiz";
    subType: "Dyads" | "Triads" | "Tetrads";
    question: string;
    choices: PccsColor[][];
    answer: number;
}

export enum QuizStatus {
    Thinking,
    Correct,
    Incorrect
}