import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { login, resetError } from '../../modules/auth';
import { useLastLocation } from 'react-router-last-location';
import LoginForm from '../../components/UserComponents/LoginForm';
import Container from '../../components/UserComponents/Container';
import CopyRight from '../../components/UserComponents/CopyRight';

export default function LoginContainer() {
  const lastLocation = useLastLocation();
  const [loginInfo, setLoginInfo] = useState({
    userId: "",
    password: ""
  });
  const [autoLoginFlag, setAutoLoginFlag] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({
    type: "alert",
    title: "",
    contents: ""
  })
  const emailLocalPartRegex = /^[a-z_0-9]{1,12}$/;
  const dispatch = useDispatch();
  const { token, data, loading, error } = useSelector(state => state.authReducer.user);

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
    if (loginInfo.userId.indexOf("@koreatech.ac.kr") !== -1) {
      setDialog(true);
      setDialogInfo({
        type: "alert",
        title: "로그인 에러",
        contents: "@koreatech.ac.kr을 빼고 입력해주세요."
      });
      return;
    }
    if (!emailLocalPartRegex.test(loginInfo.userId)) {
      setDialog(true);
      setDialogInfo({
        type: "alert",
        title: "로그인 에러",
        contents: "아우누리 계정 형식이 아닙니다."
      });
      return;
    }
    if (loginInfo.userId === "") {
      setDialog(true);
      setDialogInfo({
        type: "alert",
        title: "로그인 에러",
        contents: "계정명을 입력해주세요."
      });
      return;
    }
    if (loginInfo.password === "") {
      setDialog(true);
      setDialogInfo({
        type: "alert",
        title: "로그인 에러",
        contents: "비밀번호를 입력해주세요."
      });
      return;
    }
    dispatch(login(loginInfo.userId, loginInfo.password, lastLocation, autoLoginFlag));
  }, [dispatch, loginInfo, dialogInfo, autoLoginFlag]);

  const onConfirm = useCallback(() => {
    setDialog(false);
  }, []);

  useEffect(() => {
    if (error) {
      console.log(error);
      if (error.status === 401) {
        setDialog(true);
        setDialogInfo({
          type: "alert",
          title: "로그인 에러",
          contents: "계정명과 비밀번호를 확인해주세요."
        })
      } else if (error.status === 422) {
        setDialog(true);
        setDialogInfo({
          type: "alert",
          title: "로그인 에러",
          contents: "계정명이 형식에 맞지 않습니다."
        })
      } else {
        setDialog(true);
        setDialogInfo({
          type: "alert",
          title: "로그인 에러",
          contents: "네트워크 연결을 확인해주세요."
        })
      }
    }
  }, [error])

  return (
    <Container>
      <LoginForm
        loginInfo={loginInfo}
        onChange={onChange}
        onSubmit={onSubmit}
        autoLoginFlag={autoLoginFlag}
        onToggleAutoLoginFlag={onToggleAutoLoginFlag}
        loading={loading}
        visible={dialog}
        onConfirm={onConfirm}
        dialogInfo={dialogInfo}
      />
      <CopyRight />
    </Container>
  )
}
