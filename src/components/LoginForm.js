import React from 'react'
import { Link } from 'react-router-dom';
import { ClipLoader } from "react-spinners";
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 224px);
  min-height: 800px;
`;

const LoginSection = styled.div`
  padding: 0 371px;
  margin: 0 auto;
  width: 390px;
`;

const LogoImage = styled.img.attrs({
  src: "https://static.koreatech.in/assets/img/logo_primary.png"
})`
  margin-top: 230px;
  margin-bottom: 39px;
  width: 125px;
  cursor: pointer;
`;

const Form = styled.form`

`;


const StyledInput = styled.input.attrs({
  
})`
  border: 1px #d2dae2 solid;
  font-size: 15px;
  width: 372px;
  height: 40px;
  margin-bottom: 12px;
  padding-left: 13px;

  &::placeholder {
    font-size: 15px;
    letter-spacing: -0.8px;
    padding-left: 0;
    color: #bec9d5;
  }
`;

const AutoLoginField = styled.div`
  width: 100%;
  height: 43px;
`;

const AutoLoginText = styled.label`
  margin-top: 14px;
  width: 80%;
  text-align: left;
  float: left;
  font-size: 12px;
  color: #858585;
  letter-spacing: -0.6px;
  cursor: pointer;
  margin-bottom: 18px;

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
    top: -2px;
    background-color: #ffffff;
    border: 1px solid #d2dae2;
    line-height: 13px;
  }
`;

const AutoLoginCheckbox = styled.input`
  margin-top: 14px;
  float: left;
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
`;

const FindUserNameText = styled.a`
  text-decoration: none;
  color: #858585;
  border-right: 1px #d2dae2 solid;
  padding-right: 19px;
  padding-left: 14px;
  cursor: pointer;
`;

const LoginButton = styled.button`
  width: 390px;
  height: 47px;
  border-radius: 0;
  line-height: 1.3;
  background-color: #175c8e;
  color: #ffffff;
  font-family: "NanumSquare", serif;
  font-size: 20px;
  letter-spacing: -1px;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid #175c8e;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CopyRight = styled.div`
  margin-top: 15px;
  font-size: 13px;
  letter-spacing: -0.7px;
  color: #7d7d7d;
  font-weight: 500;
`;

const TeamName = styled.span`
  color: #acabab;
  font-weight: 800;
`

export default function LoginForm({
  userId,
  password,
  onChangeUserId,
  onChangePassword,
  onSubmit,
  loading,
  autoLoginFlag,
  onToggleAutoLoginFlag
}) {
  const today = new Date();
  const HelpText = {
    textDecoration: 'none',
    color: '#858585',
    paddingRight: '19px',
    paddingLeft: '14px',
    cursor: 'pointer',
  }

  const HelpTextWithBorder = {
    ...HelpText,
    borderRight: '1px #d2dae2 solid'
  }

  return (
    <Container>
      <LoginSection>
        <Link to="/">
          <LogoImage src={"https://static.koreatech.in/assets/img/logo_primary.png"} />
        </Link>
        <Form
          onSubmit={onSubmit}>
          <StyledInput
            type="text"
            placeholder="아이디를 입력하세요"
            autoComplete="username"
            value={userId}
            onChange={onChangeUserId}
          />
          <StyledInput
            type="password"
            placeholder="비밀번호를 입력하세요"
            autoComplete="current-password"
            value={password}
            onChange={onChangePassword}
          />
          <LoginButton
            type="submit">
            { !loading && "로그인" }
            <ClipLoader
              size={25}
              color={"#fff"}
              loading={loading}
            />
          </LoginButton>
        </Form>
        <AutoLoginField>
          <AutoLoginCheckbox
            type="checkbox"
            checked={autoLoginFlag}
            onChange={onToggleAutoLoginFlag}
          />
          <AutoLoginText
            onClick={onToggleAutoLoginFlag}>
            자동 로그인
          </AutoLoginText>
        </AutoLoginField>
        <HelpField>
          <FindUserNameText
            target="_blank"
            href="https://portal.koreatech.ac.kr/kut/page/findUser.jsp">
            아이디 찾기
          </FindUserNameText>
          <Link
            to="/findpw"
            style={HelpTextWithBorder}>
            비밀번호 찾기
          </Link>
          <Link
            to="/signup"
            style={HelpText}>
            회원가입
          </Link>
        </HelpField>
        <CopyRight>
          COPYRIGHT ⓒ {today.getFullYear()} BY <TeamName>BCSD Lab</TeamName> ALL RIGHTS RESERVED.
        </CopyRight>
      </LoginSection>
    </Container>
  )
}
