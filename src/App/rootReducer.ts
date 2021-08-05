import { combineReducers } from 'redux'

import questionsReducer from '../features/questions/questionsSlice'


const rootReducer = combineReducers({
    // Define a top-level state field named `todos`, handled by `todosReducer`
    questions: questionsReducer,

})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer