import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import { ToastProvider } from "react-toast-notifications";
import rootReducer from "../modules";
import ReduxThunk from "redux-thunk";
import configureStore from 'redux-mock-store';
import { Router } from "react-router-dom";

// TODO: if react-scripts support jest 25, delete jest-environment-jsdom-sixteen
function makeStore (customHistory, customState = {}) {
  let middleware = [];
  middleware = [...middleware, ReduxThunk.withExtraArgument({ history: customHistory })];
  const mockStore = configureStore(middleware)
  const store = mockStore(customState);
  store.replaceReducer(rootReducer)

  return store;
}


function render(
  ui,
  {
    customHistory,
    store,
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
export { render, makeStore }
