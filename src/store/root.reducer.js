import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "../pages/Auth/Auth/auth_reducers";


const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    auth: authReducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export default persistedReducer;
export default rootReducer;
