export const removeQuestions = (
    questions,
    newQuestion
) => {
    const exists = questions.find(question => question.id === newQuestion.id);

    if (exists) {
        questions = questions.filter(question => question.id !== newQuestion.id);
    }
    return questions;
};

export const updateQuestions = (
    questions,
    newQuestion
) => {
    const exists = questions.find(question => question.id === newQuestion.id);

    if (exists) {
        questions = questions.map(question =>
            question.id === newQuestion.id ? newQuestion : question
        );
    }
    return questions;
};

export const LOG_g = (name, value) => ({
    type: `LOGGING-->${name}`,
    name,
    value
});
export const Status = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    NORMAL: 'NORMAL',
    LOADING: 'LOADING',
}
export const Query = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ONE: 'FETCH_ONE',
    FETCH: "FETCH",
    SIGNUP: "SIGNUP",
    LOGIN: "LOGIN"
}