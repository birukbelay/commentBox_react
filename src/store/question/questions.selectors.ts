



export const selectQuestions = (state) => {
    return state.questions;
}

export const selectAllQuestions =(state)=>{
    return selectQuestions(state).questions
}