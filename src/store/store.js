import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger'



import { persistStore } from "redux-persist";
import persistedReducer from "./root.reducer";

const initialState = {};

const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const Store = createStore(persistedReducer, enhancer);
const persistor = persistStore(Store);

export   { Store, persistor };




