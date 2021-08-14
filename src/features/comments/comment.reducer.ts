// @ts-ignore
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppThunk} from 'app/store'
import {CommentsService} from 'api/api.service'
import {LOG_g} from "../../Constants/constants";
import {ActionError, CommentModel, CommentState} from "./comment.model";
import {Query, Status} from "../utils";

const initialState: CommentState={
    comments:[],
    comment:{},
    loadingStatus:Status.NORMAL,
    error:null,
    queryType:"",
}

const comment = createSlice({
    name:'comment',
    initialState,
    reducers:{
            queryStart(state, action: PayloadAction<string>){
                state.loadingStatus=Status.LOADING
                state.queryType=action.payload
            },
            fetchCommentsSuccess(state, action: PayloadAction<CommentModel[]>) {
                // const { comments, issueId } = action.payload
                state.comments=action.payload.map((coment,index)=> {
                    let com=coment
                    com.key=coment.id
                    return com

                })
                state.loadingStatus = Status.SUCCESS
                state.queryType=Query.FETCH
                state.error = null
            },
            getCommentSuccess(state, action: PayloadAction<CommentModel>) {
                state.comment= action.payload
                state.loadingStatus = Status.SUCCESS
                state.queryType=Query.FETCH_ONE
                state.error = null
            },
           createCommentsSuccess(state, action: PayloadAction<CommentModel>) {
                // const { comments, issueId } = action.payload
                state.comments= state.comments.concat(action.payload)
                state.loadingStatus = Status.SUCCESS
                state.queryType=Query.CREATE
                state.error = null
            },
            updateCommentsSuccess(state, action: PayloadAction<CommentModel>){
                // const { comments, issueId } = action.payload
                let arry=[action.payload]
                state.comments= state.comments.map(ques=>arry.find(q=>q.id===ques.id)||ques)
                // state.comments= state.comments.map(ques=>action.payload.id===ques.id||ques)
                state.loadingStatus = Status.SUCCESS
                state.queryType=Query.UPDATE
                state.error = null
            },
            deleteCommentsSuccess(state, action: PayloadAction<string>) {
                state.comments= state.comments.filter(comment=>comment.id!==action.payload)
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
    fetchCommentsSuccess,
    getCommentSuccess,
    createCommentsSuccess,
    updateCommentsSuccess,
    deleteCommentsSuccess,
    queryFailure
} = comment.actions

export default comment.reducer

const getResponseData=(value)=> value.data.message.data

export const fetchComments = (params): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.FETCH))
        const comments = await CommentsService.fetch(params)
        let questns:CommentModel[]=getResponseData(comments)
        dispatch(fetchCommentsSuccess(questns))
    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.FETCH}))
    }
}

export const getComment = (id:string): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.FETCH_ONE))
        const comments = await CommentsService.get(id)
        let questns:CommentModel=getResponseData(comments)
        dispatch(getCommentSuccess(questns))
    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.FETCH_ONE}))
    }
}

export const createComments = (comment:CommentModel): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.CREATE))
        const comments = await CommentsService.post(comment)
        let qstn:CommentModel=getResponseData(comments)
        dispatch(createCommentsSuccess(qstn))
    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.CREATE}))
    }
}

export const updateComments = (id:string, comment:CommentModel): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.UPDATE))
        const comments = await CommentsService.update(id, comment)
        let qstn:CommentModel=getResponseData(comments)
        dispatch(updateCommentsSuccess(qstn))
    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.UPDATE}))
    }
}

export const deleteComments = (id:string): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.DELETE))
        const comment = await CommentsService.delete(id)
        dispatch(deleteCommentsSuccess(id))
    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.DELETE}))
    }
}

