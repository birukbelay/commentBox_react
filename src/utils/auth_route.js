import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import {SelectAuthStatus, IsAuthenticated} from "../store/Auth/auth.selectors";
import { createStructuredSelector } from "reselect";

export const AuthRoute = ({ component: Component,  ...rest }) => {
    const state = useSelector(state => state)
    const authenticated =IsAuthenticated(state);
    return(
    <Route
        {...rest}
        render={(props) =>
            authenticated === true ? <Redirect to="/" /> : <Component {...props} />
        }
    />
)};

export const ProtectedRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            authenticated === true ? <Component {...props} /> :<Redirect to="/login" />
        }
    />
);

const mapStateToProps = createStructuredSelector ({
    authenticated: SelectAuthStatus
});


export default connect(mapStateToProps)(ProtectedRoute);