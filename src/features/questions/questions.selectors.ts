import {QuestionState} from "./question.model";


export const questionState = (state):QuestionState => {
    return state.questions;
}
export const selectQuestions = (state) => {
    return questionState(state).questions;
}
