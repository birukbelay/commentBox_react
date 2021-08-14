import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import "./App.css";
import {AuthRoute, ProtectedRoute} from "../utils/auth_route";
// import ProtectedRoute from '../utils/auth_route'

import LoginPage from "../features/users/login";
import SignUpPage from "../features/users/register";

import Comment from "../pages/comment/comment";
import Com from "../pages/comment/commentCls";

import CollaborationPage from "../pages/old/collaboration";

import NotFoundPage from "../components/not-found";
import Dashboard from '../pages/admin/dashboard/dashboard'
import Routes from "../Constants/routes";
import axios from "axios";
import {getToken} from "../api/jwt.service"



const App = () => {
  axios.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${getToken()?.token}`;
    return config;
  });
  return (
    <Router>
    <Switch>
      <Route exact path="/">  < Com/> </Route>

      <ProtectedRoute  path={Routes.ADMIN} component={Dashboard}/>

      <AuthRoute  path={Routes.LOGIN} component={LoginPage}/>
      <Route path={Routes.SIGNUP}><SignUpPage /> </Route>

      {/*<Route path={Routes.DASH}> <Dashboard /> </Route>*/}


      {/*<Route path={Routes.COLLABORATION}><CollaborationPage /> </Route>*/}


      <Route path="*"><NotFoundPage /> </Route>
        
      


    </Switch>
    </Router>
  );
};

export default App;
