import { IQuestion } from './questions.types';

export const removeQuestions = (
    questions: IQuestion[],
    newQuestion: IQuestion
) => {
    const exists = questions.find(question => question.id === newQuestion.id);

    if (exists) {
        questions = questions.filter(question => question.id !== newQuestion.id);
    }
    return questions;
};

export const updateQuestions = (
    questions: IQuestion[],
    newQuestion: IQuestion
) => {
    const exists = questions.find(question => question.id === newQuestion.id);

    if (exists) {
        questions = questions.map(question =>
            question.id === newQuestion.id ? newQuestion : question
        );
    }
    return questions;
};
