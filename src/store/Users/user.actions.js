import axios from 'axios';
import * as Types from './user.types';
import {CLEAR_ERRORS, LOADING_UI, SET_ERRORS} from './user.types';
import * as gConsts from "../../store/constants";


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

