import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { updateAuthInfo } from './modules/auth';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import TopnavContainer from './containers/TopnavContainer';
import IndexPage from './pages/IndexPage';
import Footer from './components/SharedComponents/Footer/Footer'

// User Page
import LoginPage from './pages/UserPages/LoginPage';
import SignUpPage from './pages/UserPages/SignUpPage';
import ModifyInfoPage from './pages/UserPages/ModifyInfoPage';
import FindPasswordPage from './pages/UserPages/FindPasswordPage';
// Info Page
import CafeteriaMenuPage from "./pages/InfoPages/CafeteriaMenuPage";
import RoomListPage from './pages/InfoPages/RoomListPage';
import RoomDetailPage from './pages/InfoPages/RoomDetailPage';
import StoreListPage from "./pages/InfoPages/StoreListPage";
import StoreDetailPage from "./pages/InfoPages/StoreDetailPage";
import TimeTablePage from "./pages/InfoPages/TimeTablePage";
import BusPage from "./pages/InfoPages/BusPage";
// Board Page
import BoardPage from './pages/BoardPages/BoardPage';
// etc
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import page404 from './pages/404';
import PrivateRoute from './components/PrivateRoute';

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
  * {
    outline: none;
  }
  .page-enter {
    opacity: 0;
  }

  .page-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }

  .page-exit {
    opacity: 1;
    display: none;
  }

  .page-exit-active {
    opacity: 0;
    transition: opacity 300ms display 5ms ease-in;
  }
`;

const AppWrapper = styled.div`
  padding: 0;
  text-align: center;
  font-family: NanumBarunGothic, serif;
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

  max-height: ${props => props.nowFooterMenu[1] ? '100vh' : '100%'};
  overflow: ${props => props.nowFooterMenu[1] ? 'hidden' : 'initial'};
`;

const Main = styled.main`
  min-height: calc(100vh - 84px);
  @media (max-width: 576px) {
    height: calc(100% - 130px);
    min-height: calc(100% - 130px);
  }
`;

function App({ history }) {
  const dispatch = useDispatch();
  const [dialog, setDialog] = useState(false);
  const [currentPath, setCurrentPath] = useState(history.location.pathname);
  const { pathname } = useLocation();
  const { nowFooterMenu } = useSelector(state => state.commonReducer);

  const onConfirm = path => {
    setDialog(false);
    if (path) history.push(path);
    else history.goBack();
  }

  useEffect(() => {
    // 자동 로그인이 켜져있을 경우.
    if (Cookies.get("token")) {
      sessionStorage.setItem("token", Cookies.get("token"));
      sessionStorage.setItem("userInfo", Cookies.get("userInfo"));
    }
    // 글로벌 토큰, 유저정보 유지
    dispatch(updateAuthInfo(
      sessionStorage.getItem("token"), JSON.parse(sessionStorage.getItem("userInfo"))
    ));
    // sessionStorage.setItem("storeCheckbboxs", [false, false, false]);
    // sessionStorage.setItem("storeTag", null);
    // sessionStorage.setItem("storeNewFlag", true);
  }, []);

  useEffect(() => {
    history.listen((location, action) => {
      // action: push, pop...
      setCurrentPath(location.pathname);
    })
  }, [history]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AppWrapper nowFooterMenu={nowFooterMenu}>
      <GlobalStyle />
      <TopnavContainer history={history} path={currentPath} />
      <Main role="main">
        <Route
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition
                classNames="page"
                timeout={300}
                key={location.pathname}>
                <Switch location={location}>
                  <Route exact path="/" component={IndexPage} />
                  {/* User Page */}
                  <PrivateRoute
                    path="/login"
                    history={history}
                    component={LoginPage}
                    setDialog={setDialog}
                    dialog={dialog}
                    onConfirm={onConfirm}
                  />
                  <PrivateRoute
                    path="/signup"
                    history={history}
                    component={SignUpPage}
                    setDialog={setDialog}
                    dialog={dialog}
                    onConfirm={onConfirm}
                  />
                  <PrivateRoute
                    path="/modifyinfo"
                    history={history}
                    component={ModifyInfoPage}
                    setDialog={setDialog}
                    dialog={dialog}
                    onConfirm={onConfirm}
                  />
                  <PrivateRoute
                    path="/findpw"
                    history={history}
                    component={FindPasswordPage}
                    setDialog={setDialog}
                    dialog={dialog}
                    onConfirm={onConfirm}
                  />
                  {/* Info Page */}
                  <Route exact path="/room" component={RoomListPage} />
                  <Route path="/room/:id" component={RoomDetailPage} />

                  <Route exact path="/store" component={StoreListPage} />
                  <Route path="/store/:id" component={StoreDetailPage} />

                  <Route path="/cafeteria" component={CafeteriaMenuPage} />
                  <Route path="/bus" component={BusPage}/>
                  <Route path="/timetable" component={TimeTablePage} />

                  <Route path="/privacy-policy" component={PrivacyPolicyPage}/>
                  {/* Board page */}
                  <Route exact strict path="/board/:type" component={BoardPage} />
                  <PrivateRoute
                    path="/board/:type/:id"
                    component={BoardPage}
                    setDialog={setDialog}
                    dialog={dialog}
                    onConfirm={onConfirm}
                  />
                  <Route component={page404} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}>
        </Route>
      </Main>
      <Footer path={currentPath} />
    </AppWrapper>
  );
}

export default App;
