import React from 'react'
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLastLocation } from 'react-router-last-location';
import Dialog from './Dialog';

export default function PrivateRoute({ component, dialog, onConfirm, setDialog, ...rest }) {
  const lastLocation = useLastLocation();
  const { isLoggedIn } = useSelector(state => state.authReducer.user);
  const path = lastLocation ? lastLocation.pathname : "/";

  // 로그인 상태에서 접근하면 안되는 페이지: 로그인, 회원가입
  if ((rest.path === '/signup' || rest.path === '/login' || rest.path === '/findpw') && isLoggedIn) {
    setDialog(true);
    return (
      <>
        <Route
          {...rest}
          component={component}>
        </Route>
        <Dialog
          theme="dark"
          visible={dialog}
          confirmText="돌아가기"
          onConfirm={() => onConfirm(path)}>
          이미 로그인되어 있습니다.
        </Dialog>
      </>
    )
  }
  // 로그인이 필요한 페이지: 정보 수정, 게시글 작성, 수정, 조회 등...
  if (rest.path !== '/signup' && rest.path !== '/login' && rest.path !== '/findpw' && !isLoggedIn) {
    setDialog(true);
    return (
      <>
        <Route
          {...rest}
          component={component}>
        </Route>
        <Dialog
          theme="dark"
          type="confirm"
          title="로그인 필요"
          visible={dialog}
          confirmText="확인"
          cancelText="취소"
          onConfirm={() => onConfirm("/login")}
          onCancel={() => onConfirm(path)}>
          로그인 하시겠습니까?
        </Dialog>
      </>
    )
  }
  return (
    <Route
      {...rest}
      component={component}>
    </Route>
  )
}
