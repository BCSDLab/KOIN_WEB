import React from 'react';
import { Route, Switch } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import FindPasswordPage from './pages/FindPasswordPage';
import CircleListPage from './pages/CircleListPage';
import CircleDetailPage from './pages/CircleDetailPage';
import CafeteriaMenuPage from "./pages/CafeteriaMenuPage";
import Footer from './components/SharedComponents/Footer/Footer'
import page404 from './pages/404';
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
        <Route path="/signup" component={SignUpPage} />
        <Route path="/findpw" component={FindPasswordPage} />
        <Route path="/cafeteria" component={CafeteriaMenuPage} />
        <Route exact path="/circle" component={CircleListPage} />
        <Route path="/circle/:id" component={CircleDetailPage} />
        <Route component={page404} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
