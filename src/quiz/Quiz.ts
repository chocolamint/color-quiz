import { Random } from "../Utils";

export interface QuizComponentProps {
    message: string;
    quizStatus: QuizStatus;
    onAnswer: (correct: boolean) => void;
}

export enum QuizStatus {
    Thinking,
    Correct,
    Incorrect
}
