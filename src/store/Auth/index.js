import {loginBackend, registerBackend} from "../../api/auth-repo";
import axios from "axios";
import {
    AuthError,
    Logout,
    AuthSuccess,
    EmailLoginStart,
    EmailRegisterStart,
    RegisterError, RegisterSuccess, LoginSuccess, LoginError
} from "./auth.actions";

import Cookies from "js-cookie";
import {USER_TOKEN} from "../../Constants/constants";
import jwtDecode from "jwt-decode";
import {LOG_g} from "./auth.actions";
import Routes from '../../Constants/routes'

const saveTokenToLocalStorage = (token, user) => {
    Cookies.set(
        "AUTH",
        JSON.stringify({
             user,
             token,
        })
    );
    // document.cookie = `token=${res.data.token};${expires};path=/`;
    window.localStorage.setItem(USER_TOKEN,  JSON.stringify({
         user,
         token,
    }));
};


export const loginUser = (userData, history, checked) => async (dispatch) => {
    dispatch(EmailLoginStart());
    try{
        const res= await loginBackend(userData)
        console.log("res:",res)
        if (!res.error){
            axios.defaults.headers.common['Authorization'] = res.token;
            dispatch(LoginSuccess(res));

            if (checked === true) {
                saveTokenToLocalStorage(res.token, res.user);
            }
            if (res.user.role === "admin") history.push(Routes.ADMIN)
            else
                history.push("/");
            return
        }
        dispatch(LOG_g("loginApiErr", res))
        dispatch(LoginError(res.error));

        // else if (response.data.user.role === "User")
    } catch (e){
        dispatch(LoginError(e));
    }
};

export const signupUser = (newUserData, history) => async (dispatch) => {
    dispatch(EmailRegisterStart());
    try{
        const res= await registerBackend(newUserData)
        if (!res.error){
            dispatch(RegisterSuccess(res));
            history.push(Routes.LOGIN);
            return
        }
        dispatch(RegisterError(res.error));
    }catch (e){
        dispatch(RegisterError(e));
    }

};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem(USER_TOKEN);
    delete axios.defaults.headers.common['Authorization'];
    dispatch(Logout());
    window.location.href = Routes.LOGIN;

};

export const CheckExpiredToken=()=>(dispatch) =>{
    const localUser = window.localStorage.getItem(USER_TOKEN);
    const objectToken= JSON.parse(localUser)
    dispatch(LOG_g("checking token", objectToken))
    if (localUser) {
        const decodedToken = jwtDecode(objectToken?.token);
        dispatch(LOG_g("decoded Token", decodedToken))
        if (decodedToken.exp * 1000 < Date.now()) {
            dispatch(logoutUser());
        } else {
            dispatch(AuthSuccess(""));
            axios.defaults.headers.common['Authorization'] = localUser;
        }
    }else {
        dispatch(AuthError("no token found"));
        //dispatch(getUserData());
    }
}