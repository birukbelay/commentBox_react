
import  authActionTypes from "./questions.types";


export const LOG_g = (name, value) => ({
    type: `LOGGING-->>${name}`,
    name,
    value
});

export const AuthSuccess = (data) => ({
    type: authActionTypes.SET_AUTHENTICATED,
    payload:data,
});

export const AuthError = (data) => ({
    type: authActionTypes.SET_AUTH_ERROR,
    payload:data,
});
export const AuthLoading = () => ({
    type: authActionTypes.AUTH_LOADING,
});

export const EmailRegisterStart = () => ({
    type: authActionTypes.EMAIL_REGISTER_START,
});
export const RegisterSuccess = (data) => ({
    type: authActionTypes.REGISTER_SUCCESS,
    payload:data,
});
export const RegisterError = (data) => ({
    type: authActionTypes.REGISTER_FAILURE,
    payload:data,
});



export const EmailLoginStart = () => ({
    type: authActionTypes.EMAIL_LOGIN_START,
});

export const LoginSuccess = (data) => ({
    type: authActionTypes.LOGIN_SUCCESS,
    payload:data,
});
export const LoginError = (data) => ({
    type: authActionTypes.LOGIN_FAILURE,
    payload:data,
});



export const Logout = () => ({
    type: authActionTypes.LOGGED_OUT,
});
