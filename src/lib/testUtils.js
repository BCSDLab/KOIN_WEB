import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from "redux-saga";
import { Provider } from 'react-redux'
import { ToastProvider } from "react-toast-notifications";
import rootReducer from "../modules";
import ReduxThunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

// TODO: if react-scripts support jest 25, delete jest-environment-jsdom-sixteen
const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
  context: {
    history: customHistory
  }
});
let middleware = [ReduxThunk.withExtraArgument({ history: customHistory }), sagaMiddleware];
let middlewareWrapper = compose(applyMiddleware(...middleware));
function render(
  ui,
  {
    store = createStore(rootReducer, middlewareWrapper),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Router history={customHistory}>
        <ToastProvider>
          <Provider store={store}>
            {children}
          </Provider>
        </ToastProvider>
      </Router>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { render }
