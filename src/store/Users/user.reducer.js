import * as Types from './user.types';

const initialState = {
    authenticated: false,
    isAdmin:false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case Types.SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case Types.SET_UNAUTHENTICATED:
            return initialState;
        case Types.SET_USER:
            return {
                authenticated: true,
                loading: false,
                credentials:action.payload
            };
        case Types.LOADING_USER:
            return {
                ...state,
                loading: true
            };
       
        default:
            return state;
    }
}
