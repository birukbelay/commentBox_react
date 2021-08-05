import { createSelector } from "reselect";



export const selectAuth = (state) => {
    return state.auth;
}
export const IsAuthenticated = (state) => {
    return selectAuth(state).authenticated;
}
export const AuthError = (state) => {
    return selectAuth(state).authError;
}
export const AuthStatus = (state) => {
    return selectAuth(state).status;
}

export const UserToken = (state) => {
    return selectAuth(state).token;
}

//Using reselect
const authSelector = (state) => state.auth;
export const SelectAuthStatus = createSelector(
    [authSelector],
    (auth) => auth.authenticated
);

export const selectAuthError = createSelector(
    [authSelector],
    (auth) => auth.error
);

export const selectUserToken = createSelector(
    [authSelector],
    (user) => user.token
);
