import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./modules";
import { Router } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import { createBrowserHistory } from "history";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";
import { LastLocationProvider } from "react-router-last-location";
import createSagaMiddleware from "redux-saga";

const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      ReduxThunk.withExtraArgument({ history: customHistory }),
      logger
    )
  )
);

// sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Router history={customHistory}>
    <LastLocationProvider>
      <Provider store={store}>
        <App history={customHistory} />
      </Provider>
    </LastLocationProvider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
