import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../modules/auth';
import { useLastLocation } from 'react-router-last-location';
import LoginForm from '../../components/UserComponents/LoginForm';
import Container from '../../components/UserComponents/Container';
import CopyRight from '../../components/UserComponents/CopyRight';
import { useToasts } from 'react-toast-notifications';

export default function LoginContainer() {
  const { addToast } = useToasts();
  const lastLocation = useLastLocation();
  const [loginInfo, setLoginInfo] = useState({
    userId: "",
    password: ""
  });
  const [autoLoginFlag, setAutoLoginFlag] = useState(false);
  const emailLocalPartRegex = /^[a-z_0-9]{1,12}$/;
  const dispatch = useDispatch();
  const { data, authInProgress, error } = useSelector(state => state.authReducer);

  const onToggleAutoLoginFlag = useCallback(() => {
    setAutoLoginFlag(!autoLoginFlag);
  }, [autoLoginFlag]);

  const onChange = useCallback(e => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value
    })
  }, [loginInfo]);
  
  const onSubmit = useCallback(e => {
    e.preventDefault();
    const { userId, password } = loginInfo;
    if (!userId || !userId.length) {
      addToast('계정명을 입력해주세요.', {
        appearance: 'warning',
        autoDismiss: true
      });
      return;
    }
    if (!password || !password.length) {
      addToast('비밀번호를 입력해주세요.', {
        appearance: 'warning',
        autoDismiss: true
      });
      return;
    }
    if (userId.indexOf("@koreatech.ac.kr") !== -1) {
      addToast('계정명은 @koreatech.ac.kr을 빼고 입력해주세요.', {
        appearance: 'warning',
        autoDismiss: true
      });
      return;
    }
    if (!emailLocalPartRegex.test(userId)) {
      addToast('아우누리 계정 형식이 아닙니다.', {
        appearance: 'warning',
        autoDismiss: true
      });
      return;
    }
    dispatch(login({
      userId,
      password,
      lastLocation,
      autoLoginFlag
    }));
  }, [dispatch, loginInfo, autoLoginFlag, lastLocation]);


  useEffect(() => {
    if (error) {
      console.log(error);
      if (error.status === 401) {
        addToast('계정명과 비밀번호를 확인해주세요.', {
          appearance: 'error',
          autoDismiss: true
        });
      } else if (error.status === 422) {
        addToast('계정명이 형식에 맞지 않습니다.', {
          appearance: 'error',
          autoDismiss: true
        });
      } else {
        addToast('네트워크 연결을 확인해주세요.', {
          appearance: 'error',
          autoDismiss: true
        });
      }
    }
  }, [error])

  useEffect(() => {
    if (data && data.status === 200) {
      addToast('성공적으로 로그인했습니다.', {
        appearance: 'success',
        autoDismiss: true
      })
    }
  }, [data]);

  return (
    <Container>
      <LoginForm
        loginInfo={loginInfo}
        onChange={onChange}
        onSubmit={onSubmit}
        autoLoginFlag={autoLoginFlag}
        onToggleAutoLoginFlag={onToggleAutoLoginFlag}
        authInProgress={authInProgress}
      />
      <CopyRight />
    </Container>
  )
}
