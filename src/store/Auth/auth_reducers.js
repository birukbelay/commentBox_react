import  authActionTypes from './auth_types';

import {Status} from '../store.types'

const initialState = {
    authenticated: false,
    authError:"",
    signError:"",
    token:"",
    status:Status.NORMAL,
    //user related
    isAdmin:false,
    currentUser: {},
};

const authReducer = (state = initialState, action)=> {
    switch (action.type) {

        case authActionTypes.LOGIN_SUCCESS:
        case authActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                authenticated: true,
                currentUser: action.payload.user,
                token: action.payload.token,
                status: Status.SUCCESS,
                signError: "",
                authError: ""
            };

        case authActionTypes.SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true,
                currentUser: action.payload.user,
                token: action.payload.token,
                authError: "",
                signError:""
            };
        case authActionTypes.AUTH_LOADING:
        case authActionTypes.EMAIL_LOGIN_START:
        case authActionTypes.EMAIL_REGISTER_START:
            return {
                ...state,
                status: Status.LOADING
            };
        case authActionTypes.LOGIN_FAILURE:
        case authActionTypes.REGISTER_FAILURE:
            return {
                ...state,
                authenticated: false,
                status: Status.ERROR,
                token: null,
                currentUser: null,
                signError: action.payload,
            };
        case authActionTypes.CLEAR_USER_ERROR:
            return {
                ...state,
                status: Status.NORMAL,
                authError: "",
                signError:""
            };
        case authActionTypes.SET_AUTH_ERROR:
            return {
                ...state,
                authenticated: false,
                authError: action.payload
            };

        case authActionTypes.LOGGED_OUT:
            return initialState;
        default:
            return state;
    }
}

export default authReducer;