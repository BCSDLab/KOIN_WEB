import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./modules";
import rootSaga from './sagas';
import { Router } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import { createBrowserHistory } from "history";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";
import { LastLocationProvider } from "react-router-last-location";
import createSagaMiddleware from "redux-saga";
import { ToastProvider } from "react-toast-notifications";

let middlewares = [];
const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
  context: {
    history: customHistory
  }
});

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  middlewares = [...middlewares, ReduxThunk.withExtraArgument({ history: customHistory }), sagaMiddleware, logger];
} else {
  console.log = () => {}
  middlewares = [...middlewares, ReduxThunk.withExtraArgument({ history: customHistory }), sagaMiddleware];
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Router history={customHistory}>
    <LastLocationProvider>
      <Provider store={store}>
        <ToastProvider>
          <App history={customHistory} />
        </ToastProvider>
      </Provider>
    </LastLocationProvider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
