import React from 'react'
import { Link } from 'react-router-dom';
import { ClipLoader } from "react-spinners";
import styled from 'styled-components';
import Input from './Input';
import PropTypes from 'prop-types'

const AutoLoginField = styled.div`
  width: 100%;
  height: 43px;
  text-align: left;

  @media (max-width: 576px) {
    width: 320px;
    height: 52px;
    margin: 0 auto;
  }
`;

const AutoLoginText = styled.label`
  margin-top: 14px;
  padding-bottom: 2px;
  text-align: left;
  font-size: 12px;
  color: #858585;
  letter-spacing: -0.6px;
  cursor: pointer;
  
  display: inline-block;
  cursor: pointer;
  position: relative;
  padding-left: 24px;

  &:before {
    content: "";
    width: 14px;
    height: 14px;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #ffffff;
    border: 1px solid #d2dae2;
    line-height: 13px;
  }

  @media (max-width: 576px) {
    margin-top: 18px;
  }
`;

const AutoLoginCheckbox = styled.input`
  margin-top: 14px;
  border-radius: 0;
  margin-right: 10px;
  cursor: pointer;
  display: none;

  &:checked + ${AutoLoginText}:before {
    content: "";
    background-image: url("https://static.koreatech.in/assets/img/check.png");
    background-size: cover;
  }
`;

const HelpField = styled.div`
  border-top: 1px #d2dae2 solid;
  width: 100%;
  height: 43px;
  padding-top: 18px;
  font-size: 12px;
  letter-spacing: -0.6px;
  color: #858585;

  @media (max-width: 576px) {
    width: 320px;
    margin: 0 auto;
  }
`;

const FindUserIdLink = styled.a`
  text-decoration: none;
  color: #858585;
  border-right: 1px #d2dae2 solid;
  padding-right: 19px;
  padding-left: 14px;
  cursor: pointer;
`;

const SignUpLink = styled(Link)`
  text-decoration: none;
  color: #858585;
  padding-right: 19px;
  padding-left: 14px;
  cursor: pointer;
`;

const FindPasswordLink = styled(SignUpLink)`
  border-right: 1px #d2dae2 solid;
`;

const LoginButton = styled.button`
  width: 390px;
  height: 45px;
  border-radius: 0;
  line-height: 1.3;
  background-color: #175c8e;
  color: #ffffff;
  font-family: NanumSquare;
  font-size: 20px;
  letter-spacing: -1px;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid #175c8e;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 576px) {
    width: 320px;
    padding: 0;
    margin: 0 auto;
    height: 36px;
    font-size: 15px;
  }

  &:disabled {
    background: #e5eaf0;
    border: solid 1px #d2dae2;
  }
`;

function LoginForm({
  loginInfo,
  onChange,
  onSubmit,
  authInProgress,
  autoLoginFlag,
  onToggleAutoLoginFlag
}) {
  return (
    <>
      <form
        onSubmit={onSubmit}>
        <Input
          type="text"
          name="userId"
          value={loginInfo.userId}
          placeholder="아이디를 입력하세요."
          autoComplete="username"
          onChange={onChange}
          autoFocus
        />
        <Input
          type="password"
          name="password"
          value={loginInfo.password}
          placeholder="비밀번호를 입력하세요."
          autoComplete="current-password"
          onChange={onChange}
        />
        <LoginButton
          type="submit"
          disabled={authInProgress}>
          { !authInProgress && "로그인" }
          <ClipLoader
            size={25}
            color={"#175c8e"}
            loading={authInProgress}
          />
        </LoginButton>
      </form>
      <AutoLoginField>
        <AutoLoginCheckbox
          type="checkbox"
          checked={autoLoginFlag}
          onChange={onToggleAutoLoginFlag}
          id="autoLoginCheckBox"
        />
        <AutoLoginText
          onClick={onToggleAutoLoginFlag}
          htmlFor="autoLoginCheckBox">
          자동 로그인
        </AutoLoginText>
      </AutoLoginField>
      <HelpField>
        <FindUserIdLink
          target="_blank"
          href="https://portal.koreatech.ac.kr/kut/page/findUser.jsp">
          아이디 찾기
        </FindUserIdLink>
        <FindPasswordLink to="/findpw">
          비밀번호 찾기
        </FindPasswordLink>
        <SignUpLink to="/signup">
          회원가입
        </SignUpLink>
      </HelpField>
    </>
  )
}

LoginForm.propTypes = {
  loginInfo: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  authInProgress: PropTypes.bool,
  autoLoginFlag: PropTypes.bool,
  onToggleAutoLoginFlag: PropTypes.func
};

export default LoginForm
