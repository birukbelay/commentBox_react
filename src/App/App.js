import React from "react";

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import "./App.css";
import {AuthRoute} from "../utils/auth_route";
// import ProtectedRoute from '../utils/auth_route'

import LoginPage from "../pages/Auth/login";
import SignUpPage from "../pages/Auth/sign-up/register";

import Comment from "../pages/comment/comment";

import CollaborationPage from "../pages/old/collaboration";

import NotFoundPage from "../components/not-found";
import Dashboard from '../pages/admin/dashboard/dashboard'
import Routes from "../Constants/routes";




const App = () => {
  return (
    <Router>
    <Switch>
      <Route exact path="/">  < Comment/> </Route>
      {/*<ProtectedRoute  path={Routes.ADMIN} component={Dashboard}/>*/}

      <AuthRoute  path={Routes.LOGIN} component={LoginPage}/>
      <Route path={Routes.SIGNUP}><SignUpPage /> </Route>

      <Route path={Routes.DASH}> <Dashboard /> </Route>


      <Route path={Routes.COLLABORATION}><CollaborationPage /> </Route>

      <Route path="/books/:id/edit"></Route>
      <Route path="*"><NotFoundPage /> </Route>
        
      


    </Switch>
    </Router>
  );
};

export default App;
