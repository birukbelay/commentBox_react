// @ts-ignore
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppThunk} from 'app/store'
import {QuestionService} from 'api/api.service'
import {LOG_g} from "../../Constants/constants";
import {ActionError, QuestionModel, QuestionState} from "./question.model";
import {Query, Status} from "../utils";

const initialState: QuestionState={
    questions:[],
    question:{},
    loadingStatus:Status.NORMAL,
    error:null,
    queryType:"",
}

const questions = createSlice({
    name:'questions',
    initialState,
    reducers:{
            queryStart(state, action: PayloadAction<string>){
                state.loadingStatus=Status.LOADING
                state.queryType=action.payload
            },
            fetchQuestionsSuccess(state, action: PayloadAction<QuestionModel[]>) {
                // const { comments, issueId } = action.payload
                state.questions=action.payload
                state.loadingStatus = Status.SUCCESS
                state.queryType=Query.FETCH
                state.error = null
            },
            getQuestionSuccess(state, action: PayloadAction<QuestionModel>) {
                state.question= action.payload
                state.loadingStatus = Status.SUCCESS
                state.queryType=Query.FETCH_ONE
                state.error = null
            },
           createQuestionsSuccess(state, action: PayloadAction<QuestionModel>) {
                // const { comments, issueId } = action.payload
                state.questions= state.questions.concat(action.payload)
                state.loadingStatus = Status.SUCCESS
                state.queryType=Query.CREATE
                state.error = null
            },
            updateQuestionsSuccess(state, action: PayloadAction<QuestionModel>){
                // const { comments, issueId } = action.payload
                let arry=[action.payload]
                state.questions= state.questions.map(ques=>arry.find(q=>q.id===ques.id)||ques)
                // state.questions= state.questions.map(ques=>action.payload.id===ques.id||ques)
                state.loadingStatus = Status.SUCCESS
                state.queryType=Query.UPDATE
                state.error = null
            },
            deleteQuestionsSuccess(state, action: PayloadAction<string>) {
                state.questions= state.questions.filter(question=>question.id!==action.payload)
                state.loadingStatus = Status.SUCCESS
                state.queryType=Query.DELETE
                state.error = null
            },
            queryFailure(state, action: PayloadAction<ActionError>) {
                state.loadingStatus = Status.ERROR
                state.error = action.payload.error
                state.queryType=action.payload.queryType
            }
        }
})

export const {
    queryStart,
    fetchQuestionsSuccess,
    getQuestionSuccess,
    createQuestionsSuccess,
    updateQuestionsSuccess,
    deleteQuestionsSuccess,
    queryFailure
} = questions.actions

export default questions.reducer

const getResponseData=(value)=> value.data.message.data

export const fetchQuestions = (): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.FETCH))
        const questions = await QuestionService.fetch({})
        console.log("quest", questions)
        let questns:QuestionModel[]=getResponseData(questions)
        console.log("quest==/", questns)
        dispatch(fetchQuestionsSuccess(questns))
    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.FETCH}))
    }
}

export const getQuestion = (id:string): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.FETCH_ONE))
        const questions = await QuestionService.get(id)
        let questns:QuestionModel=getResponseData(questions)
        dispatch(getQuestionSuccess(questns))
    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.FETCH_ONE}))
    }
}

export const createQuestions = (question:QuestionModel): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.CREATE))
        const questions = await QuestionService.create(question)
        let qstn:QuestionModel=getResponseData(questions)
        dispatch(createQuestionsSuccess(qstn))
    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.CREATE}))
    }
}

export const updateQuestions = (id:string, question:QuestionModel): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.UPDATE))
        const questions = await QuestionService.update(id, question)
        let qstn:QuestionModel=getResponseData(questions)
        dispatch(updateQuestionsSuccess(qstn))
    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.UPDATE}))
    }
}

export const deleteQuestions = (id:string): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.DELETE))
        const question = await QuestionService.delete(id)
        dispatch(deleteQuestionsSuccess(id))
    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.DELETE}))
    }
}

