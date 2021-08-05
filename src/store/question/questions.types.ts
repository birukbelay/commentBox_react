export interface IQuestion{
    id: number
    question:string
    isRequired :boolean
    iconName?: string
    answersName?: string

}



export interface QuestionState{
    questions?:IQuestion[],
    question?:{},
    loadingStatus:string,
    error:Error,
    queryType:string,
}

export type  QuestionAction = {
    type: string
    question:IQuestion
}

type DispatchType = (args: QuestionAction) => QuestionAction

export interface Action {
    type?: string;
    payload?: any | any[];
}



const questionsActionTypes = {
    //question ACTION TYPES

    //QUESTIONS fetch ACTIONS
    QUESTIONS_FETCH_START: "QUESTIONS_FETCH_START",
    QUESTIONS_FETCH_SUCCESS: "QUESTIONS_FETCH_SUCCESS",
    QUESTIONS_FETCH_FAILURE: "QUESTIONS_FETCH_FAILURE",
    //QUESTIONS get ACTIONS
    QUESTION_GET_START: "QUESTION_GET_START",
    QUESTION_GET_SUCCESS: "QUESTION_GET_SUCCESS",
    QUESTION_GET_FAILURE: "QUESTION_GET_FAILURE",
    //QUESTIONS CREATE ACTIONS
    QUESTION_CREATE_START: "QUESTION_CREATE_START",
    QUESTION_CREATE_SUCCESS: "QUESTION_CREATE_SUCCESS",
    QUESTION_CREATE_FAILURE: "QUESTION_CREATE_FAILURE",
    //QUESTIONS UPDATE ACTIONS
    QUESTION_UPDATE_START: "QUESTION_UPDATE_START",
    QUESTION_UPDATE_SUCCESS: "QUESTION_UPDATE_SUCCESS",
    QUESTION_UPDATE_FAILURE: "QUESTION_UPDATE_FAILURE",
    //QUESTIONS DELETE ACTIONS
    QUESTION_DELETE_START: "QUESTION_DELETE_START",
    QUESTION_DELETE_SUCCESS: "QUESTION_DELETE_SUCCESS",
    QUESTION_DELETE_FAILURE: "QUESTION_DELETE_FAILURE",
    CLEAR_QUESTIONS_ERROR: "CLEAR_QUESTIONS_ERROR",

};
export default questionsActionTypes;
