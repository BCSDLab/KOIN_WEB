import React from 'react';
import { Route, Switch } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import CircleListPage from './pages/CircleListPage';
import CircleDetailPage from './pages/CircleDetailPage';

import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    text-align: center;
  }

  * {
    outline: none;
  }
`;


function App() {
  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route path="/login" component={LoginPage} />
        <Route exact path="/circle" component={CircleListPage} />
        <Route path="/circle/:id" component={CircleDetailPage} />
      </Switch>
    </>
  );
}

export default App;
