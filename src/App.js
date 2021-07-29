import React from "react";

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import "./App.css";
import {AuthRoute} from "./utils/auth_route";
import ProtectedRoute from './utils/auth_route'

import LoginPage from "./pages/Auth/login/index";
import SignUpPage from "./pages/Auth/sign-up/register";

import Comment from "./pages/comment/comment";
import HomePage from "./pages/Book_home";
import CollaborationPage from "./pages/collaboration";
import Dashboard  from "./pages/dashboard/dashboardFunc";
import Profile  from "./pages/profile/Profile";
import Houses  from "./pages/houses/Houses";
import NotFoundPage from "./pages/not-found";
import Questions from './pages/questions/questions'
import Routes from "./Constants/routes";




const App = () => {
  return (
    <Router>
    <Switch>
      <Route exact path="/">  < Houses/> </Route>
      <ProtectedRoute  path={Routes.ADMIN} component={Dashboard}/>
      <AuthRoute  path={Routes.LOGIN} component={LoginPage}/>

      <Route path={Routes.SIGNUP}><SignUpPage /> </Route>
      <Route path={Routes.HOME}> <HomePage /> </Route>
      <Route path={Routes.DASH}> <Dashboard /> </Route>
      <Route path={Routes.COMMENTS}> <Comment /> </Route>
      <Route path={Routes.QUESTIONS}> <Questions /> </Route>
      <Route path={Routes.PROFILE}> <Profile />  </Route>
      <Route path={Routes.COLLABORATION}><CollaborationPage /> </Route>

      <Route path="/books/:id/edit"></Route>
      <Route path="*"><NotFoundPage /> </Route>
        
      


    </Switch>
    </Router>
  );
};

export default App;
