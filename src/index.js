import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { PersistGate } from "redux-persist/integration/react";

//css
import "antd/dist/antd.css";
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';

import { Store, persistor } from "./store/store";
import {API_ROOT} from "./Constants/constants";
import {CheckExpiredToken} from "./pages/Auth/Auth";



axios.defaults.baseURL = API_ROOT;

Store.dispatch(CheckExpiredToken())

ReactDOM.render(
    <React.StrictMode>
      <Provider store={Store}>
          {/*<PersistGate persistor={persistor}>*/}
                  <App />
          {/*</PersistGate>*/}
      </Provider>,
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
