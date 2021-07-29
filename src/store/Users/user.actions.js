import axios from 'axios';
import * as Types from './user.types';
import {CLEAR_ERRORS, LOADING_UI, SET_ERRORS} from './user.types';
import * as gConsts from "../../store/constants";


const saveUserLocally = (token) => {
    localStorage.setItem("USER_TOKEN", token);
};



export const loginUser = (userData, history, checked) => (dispatch) => {
    dispatch({ type: Types.LOADING_USER });
    axios
        .post(gConsts.API_ROOT+"auth/login", userData)
        .then((res) => {
            axios.defaults.headers.common['Authorization'] = res.data.access_token;
            if (checked===true){
            saveUserLocally(res.data.token);
            }
            // console.log("hhhhhhhhee",res.Data)
            // console.log("hhhhhhhhee",res.Data.token)
            dispatch({
                type: Types.SET_USER,
                payload: res.data.user
            });
            // dispatch({ type: Types.CLEAR_ERRORS });
            history.push('/');
            
        })
        .catch((err) => {
                console.log(err.response,"errrrrr")
            dispatch({
                type: "SET_ERRORS",
                // payload: err.response.Data
            });
            history.push('/');
        });
};

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post(gConsts.API_ROOT+'auth/signup', newUserData)
        .then((res) => {
            axios.defaults.headers.common['Authorization'] = res.data.access_token;
            saveUserLocally(res.data.token);
            dispatch({
                type: Types.SET_USER,
                payload: res.data.user
            });
            // dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch((err) => {
            console.log(err.response.data,"errrrrssr")
            dispatch({
                type: SET_ERRORS,
                // payload: err.response.Data
            });
            history.push('/');
        });
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("USER_TOKEN");
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: Types.SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {
    dispatch({ type: Types.LOADING_USER });
    axios
        .get('/user')
        .then((res) => {
            dispatch({
                type: Types.SET_USER,
                payload: res.data
            });
        })
        .catch((err) => console.log(err));
};


export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: Types.LOADING_USER });
    axios
        .post('/user', userDetails)
        .then(() => {
            dispatch(getUserData());
        })
        .catch((err) => console.log(err));
};

