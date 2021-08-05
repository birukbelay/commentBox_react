// @ts-ignore
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {Status, Query} from '../../store/store.types'
import { AppThunk } from 'App/store'
import {QuestionService} from 'api/common/api.service'
export interface Question{
    id: number
    question:string
    isRequired :boolean
    iconName?: string
    answersName?: string

}
export interface QuestionState{
    questions?:Question[],
    question?:Question|{},
    loadingStatus:string,
    error:Error,
    queryType:string,
}

const initialState: QuestionState={
    questions:[],
    question:{},
    loadingStatus:"",
    error:null,
    queryType:""
}
const questions = createSlice({
    name:'questions',
    initialState,
    reducers:{
        fetchQuestionsStart(state){
            state.loadingStatus=Status.LOADING
            state.queryType=Query.FETCH
        },
        fetchQuestionsSuccess(state, action: PayloadAction<Question[]>) {
            // const { comments, issueId } = action.payload
            state.questions=action.payload
            state.loadingStatus = Status.SUCCESS
            state.queryType=Query.FETCH
            state.error = null
        },
        fetchQuestionsFailure(state, action: PayloadAction<Error>) {
            state.loadingStatus = Status.ERROR
            state.error = action.payload
            state.queryType=Query.FETCH
        }
        }
})

export const {
    fetchQuestionsStart,
    fetchQuestionsSuccess,
    fetchQuestionsFailure
} = questions.actions
export default questions.reducer

export const fetchQuestions = (): AppThunk => async dispatch => {
    try {
        dispatch(fetchQuestionsStart())
        const questions = await QuestionService.query({})
        dispatch(fetchQuestionsSuccess(questions))
    } catch (err) {
        dispatch(fetchQuestionsFailure(err))
    }
}

