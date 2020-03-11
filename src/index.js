import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
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
import { DarkBackgroundProvider } from './hooks/useDarkenBackground'

let middlewares = [];
let middlewareWrapper;
const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
  context: {
    history: customHistory
  }
});

if (process.env.NODE_ENV === 'development') {
  middlewares = [...middlewares, ReduxThunk.withExtraArgument({ history: customHistory }), sagaMiddleware, logger];
  middlewareWrapper = composeWithDevTools(applyMiddleware(...middlewares));
} else {
  console.log = () => {}
  middlewares = [...middlewares, ReduxThunk.withExtraArgument({ history: customHistory }), sagaMiddleware];
  middlewareWrapper = compose(applyMiddleware(...middlewares));
}

const store = createStore(
  rootReducer,
  middlewareWrapper
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Router history={customHistory}>
    <LastLocationProvider>
      <Provider store={store}>
        <ToastProvider>
          <DarkBackgroundProvider>
            <App history={customHistory} />
          </DarkBackgroundProvider>
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
