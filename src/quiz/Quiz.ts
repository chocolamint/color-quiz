export interface QuizComponentProps {
    message: string;
    correct?: boolean;
    onAnswer: (correct: boolean) => void;
}