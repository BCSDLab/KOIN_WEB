import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./modules";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import ReduxThunk from "redux-thunk";

const customHistory = createBrowserHistory();
const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk.withExtraArgument({ history: customHistory }))
);

ReactDOM.render(
  <Router history={customHistory}>
    {/* <Provider store={store}>                                                                                                                                                                                                                                                                                                                                   ={store}> */}
      <App />
    {/* </Provider> */}
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
