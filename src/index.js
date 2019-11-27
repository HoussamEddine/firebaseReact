import "react-app-polyfill/ie9"; // For IE 9-11 support
import "react-app-polyfill/stable";
// import 'react-app-polyfill/ie11'; // For IE 11 support
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
//import './index.css';
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducer from "./store/reducers";
import Saga from "./store/actions/";

import { Provider } from "react-redux";

import createSagaMiddleware from "redux-saga";
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware, thunk));
sagaMiddleware.run(Saga);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
