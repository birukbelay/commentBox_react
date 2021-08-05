import questionActionTypes, {QuestionState, Action} from './questions.types';
import {updateQuestions, removeQuestions} from './question.utils'
import {Status, Query} from '../store.types'
import {act} from "react-dom/test-utils";

const initialState:QuestionState = {
    questions:[],
    question:{},
    queryType:Query.FETCH,
    error:null,
    loadingStatus:Status.NORMAL,
};

const questionsReducer = (state = initialState, action:Action):QuestionState=> {
    switch (action.type) {
        case questionActionTypes.QUESTIONS_FETCH_SUCCESS:
            return {
                ...state,
                questions:action.payload,
                loadingStatus:Status.SUCCESS,
                queryType:action.payload.queryType,
                error:null
            };
        case questionActionTypes.QUESTION_GET_SUCCESS:
            return {
                ...state,
                question:action.payload,
                loadingStatus:Status.SUCCESS,
                queryType:action.payload.queryType,
                error:null
            };
        case questionActionTypes.QUESTION_CREATE_SUCCESS:
            return {
                ...state,
                questions: [...state.questions, action.payload],
                loadingStatus:Status.SUCCESS,
                queryType:action.payload.queryType,
                error:null
            };
        case questionActionTypes.QUESTION_UPDATE_SUCCESS:
            return {
                ...state,
                questions:updateQuestions(state.questions, action.payload),
                loadingStatus:Status.SUCCESS,
                queryType:action.payload.queryType,
                error:null
            };
        case questionActionTypes.QUESTION_DELETE_SUCCESS:
            return {
                ...state,
                questions:removeQuestions(state.questions, action.payload),
                loadingStatus:Status.SUCCESS,
                queryType:action.payload.queryType,
                error:null
            };

        //    =============== Loading and Error  ========================================================
        case questionActionTypes.QUESTION_UPDATE_START:
        case questionActionTypes.QUESTION_GET_START:
        case questionActionTypes.QUESTIONS_FETCH_START:
        case questionActionTypes.QUESTION_DELETE_START:
        case questionActionTypes.QUESTION_CREATE_START:
            return {
                ...state,
                loadingStatus:Status.LOADING,
                queryType:action.payload.queryType,
            };
        case questionActionTypes.QUESTION_UPDATE_FAILURE:
        case questionActionTypes.QUESTION_CREATE_FAILURE:
        case questionActionTypes.QUESTION_GET_FAILURE:
        case questionActionTypes.QUESTIONS_FETCH_FAILURE:
        case questionActionTypes.QUESTION_DELETE_FAILURE:
            return {
                ...state,
                loadingStatus:Status.ERROR,
                queryType:action.payload.queryType,
                error:action.payload.ERROR,
            };

        default:
            return state;
    }
}

export default questionsReducer;