import React from 'react';
import { Route, Switch } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import FaqPage from "./pages/FaqPage";
import SignUpPage from './pages/SignUpPage';
import FindPasswordPage from './pages/FindPasswordPage';
import CircleListPage from './pages/CircleListPage';
import CircleDetailPage from './pages/CircleDetailPage';
import CafeteriaMenuPage from "./pages/CafeteriaMenuPage";
import RoomListPage from './pages/RoomListPage';
import RoomDetailPage from './pages/RoomDetailPage';
import Footer from './components/SharedComponents/Footer/Footer'
import page404 from './pages/404';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: NanumBarunGothic;
    src: url('https://static.koreatech.in/assets/font/NanumBarunGothic.eot');
    src: url('https://static.koreatech.in/assets/font/NanumBarunGothic.eot?#iefix') format('embedded-opentype'),
    url('https://static.koreatech.in/assets/font/NanumBarunGothic.woff') format('woff'),
    url('https://static.koreatech.in/assets/font/NanumBarunGothic.ttf') format('truetype'),
    url('https://static.koreatech.in/assets/font/NanumBarunGothic.svg#NanumGothic') format('svg');
    src:local(※), url('https://static.koreatech.in/assets/font/NanumBarunGothic.woff') format('woff');
  }

  @font-face {
    font-family: NanumSquare;
    src: url('https://static.koreatech.in/assets/font/NanumSquareR.eot');
    src: url('https://static.koreatech.in/assets/font/NanumSquareR.eot?#iefix') format('embedded-opentype'),
    url('https://static.koreatech.in/assets/font/NanumSquareR.woff') format('woff'),
    url('https://static.koreatech.in/assets/font/NanumSquareR.ttf') format('truetype'),
    url('https://static.koreatech.in/assets/font/NanumSquareR.svg#NanumGothic') format('svg');
    src:local(※), url('https://static.koreatech.in/assets/font/NanumSquareR.woff') format('woff');
  }

  body {
    padding: 0;
    text-align: center;
    font-family: "NanumBarunGothic", serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    -webkit-touch-callout: none;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    min-width: 1148px;

    @media (max-width: 576px) {
      max-width: 576px;
      min-width: 360px;
      height: 100%;
    }
  }

  * {
    outline: none;
  }
`;

const Main = styled.main`
  height: calc(100% - 84px);

  @media (max-width: 576px) {
    height: calc(100% - 130px);
    min-height: calc(100% - 130px);
  }
`

function App() {
  return (
    <>
      <GlobalStyle />
      <Main>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/findpw" component={FindPasswordPage} />

          <Route exact path="/circle" component={CircleListPage} />
          <Route path="/circle/:id" component={CircleDetailPage} />

          <Route exact path="/room" component={RoomListPage} />
          <Route path="/room/:id" component={RoomDetailPage} />
    
          <Route path="/cafeteria" component={CafeteriaMenuPage} />
          <Route path="/faq" component={FaqPage} />
          <Route component={page404} />
        </Switch>
      </Main>
      <Footer />
    </>
  );
}

export default App;
