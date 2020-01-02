import React, { useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from '../components/LoginForm';
import { login } from '../modules/auth';
import { useCookies } from 'react-cookie';

export default function LoginContainer() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [autoLoginFlag, setAutoLoginFlag] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['auth-cookie']);
  const emailLocalPartRegex = /^[a-z_0-9]{1,12}$/;

  const dispatch = useDispatch();
  const { token, userInfo, loading, error } = useSelector(state => state.authReducer);

  const onChangeUserId = e => {
    setUserId(e.target.value);
  }

  const onChangePassword = e => {
    setPassword(e.target.value);
  }

  const onToggleAutoLoginFlag = () => {
    setAutoLoginFlag(!autoLoginFlag);
  }

  const onSubmit = e => {
    e.preventDefault();
    if (userId.indexOf("@koreatech.ac.kr") !== -1) {
      alert("@koreatech.ac.kr을 빼고 입력해주세요.");
      return;
    }
    if (!emailLocalPartRegex.test(userId)) {
      alert("아우누리 계정 형식이 아닙니다.");
      return;
    }
    if (userId === "") {
      alert("ID를 입력해주세요.");
      return;
    }
    if (password === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    dispatch(login(userId, password));
  }

  useEffect(() => {
    if (error) {
      if (error.message.indexOf("401") !== -1) {
        alert("ID와 비밀번호를 확인해주세요.");
      } else if (error.message.indexOf("422") !== -1) {
        alert("ID가 형식에 맞지 않습니다.");
      } else {
        alert("네트워크 연결을 확인해주세요.");
      }
    }
    if (token && userInfo) {
      removeCookie("autoLoginFlag");
      if (autoLoginFlag) {
        setCookie("autoLoginFlag", true);
        let expireTime = new Date();
        expireTime.setDate(expireTime.getDate() + 3);
        expireTime.setHours(expireTime.getHours() + 9);
        setCookie("token", token, { expires: expireTime });
        setCookie("tokenExpireTime", expireTime.getTime(), { expires: expireTime });
      } else {
        setCookie("autoLoginFlag", false);
        removeCookie("token");
      }
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
      sessionStorage.setItem("token", token);
    }
  }, [error, token, userInfo, autoLoginFlag, setCookie, removeCookie]);
  
  if (token && userInfo) {
    return (
      <Route>
        <Redirect to='/' />
      </Route>
    )
  }
  return (
    <LoginForm
      userId={userId}
      password={password}
      onChangeUserId={onChangeUserId}
      onChangePassword={onChangePassword}
      onSubmit={onSubmit}
      loading={loading}
      autoLoginFlag={autoLoginFlag}
      onToggleAutoLoginFlag={onToggleAutoLoginFlag}
    />
  )
}
