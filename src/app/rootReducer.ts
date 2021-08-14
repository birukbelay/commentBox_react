import { combineReducers } from 'redux'

import questionsReducer from '../features/questions/questions.reducer'
import commentsReducer from '../features/comments/comment.reducer'
import authReducer from '../features/users/users.reducer'


const rootReducer = combineReducers({
    // Define a top-level state field named `todos`, handled by `todosReducer`
    questions: questionsReducer,
    comments: commentsReducer,
    auth:authReducer

})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer