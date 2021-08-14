import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { PersistGate } from "redux-persist/integration/react";

//css
import "antd/dist/antd.css";
import './index.css';

import App from './app/App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';

import store  from "./app/store";


import {CheckExpiredToken} from "./features/users/users.reducer";





store.dispatch(CheckExpiredToken())

ReactDOM.render(
    <StrictMode>
      <Provider store={store}>
          {/*<PersistGate persistor={persistor}>*/}
                  <App />
          {/*</PersistGate>*/}
      </Provider>,
    </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
