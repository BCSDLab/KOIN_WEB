import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Input from './Input';

const FormWrapper = styled.form``;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Advice = styled.div`
  height: 12px;
  font-size: 12px;
  font-weight: 300;
  line-height: 1.5;
  letter-spacing: -0.6px;
  text-align: left;
  color: #858585;
  margin-bottom: 16px;
  margin-left: 5px;

  @media (max-width: 576px) {
    margin-bottom: 12px;
  }
`;

const StyledButton = css`
  height: 45px;
  background-color: #175c8e;
  border: 1px solid #175c8e;
  font-family: NanumSquareB;
  line-height: 1.3;
  letter-spacing: -1px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
`;

const StyledDataButton = css`
  width: 192px;
  height: 45px;
  padding: 0 15px;
  box-sizing: border-box;
  background-color: ${props => props.value === "" ? '#ffffff' : '#175c8e'};
  font-size: 15px;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #d2dae2;

  @media (max-width: 576px) {
    width: 165px;
    font-size: 14px;
    height: 36px;
  }
`;

const SignUpButton = styled.button`
  ${StyledButton}
  font-size: 20px;
  font-weight: 700;
  width: 390px;
  margin-top: 28px;

  @media (max-width: 576px) {
    width: calc(100% - 8px);
    padding: 0;
    height: 34px;
    font-size: 15px;
  }
`;

const CheckButton = styled.button`
  ${StyledButton}
  font-size: 12px;
  width: 79px;
  margin-left: 6px;

  @media (max-width: 576px) {
   height: 36px; 
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 6px;
`;

const MajorButton = styled.button`
  ${StyledDataButton}
  color: ${props => props.value === "" ? "#bec9d5" : "#ffffff"};
  padding: 0 0 0 20px;

  @media (max-width: 576px) {
    padding: 0 0 0 10px;
  }
`;

const DropdownButton = styled.button`
  ${StyledDataButton}
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.value === "" ? '#252525' : '#ffffff'};
  cursor: pointer;
`;

const DropdownContentWrapper = styled.div`
  display: ${props => (props.dropdown ? "block" : "none")};
  position: absolute;
  z-index: 5;
`;

const DropdownIcon = styled.img`
  width: 17px;
  height: 12px;
`;

const DropdownContent = styled.button`
  width: 192px;
  height: 45px;
  padding: 0 15px;
  box-sizing: border-box;
  background-color: #ffffff;
  cursor: pointer;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.8px;
  color: #252525;
  border: 1px solid #d2dae2;

  &:hover {
    background-color: #175c8e;
    color: #ffffff;
  }

  @media (max-width: 576px) {
    width: 165px;
  }
`;

const Line = styled.hr`
  border: 0.5px solid #d2dae2;
  margin: 20px 0;
`;

const TermsWrapper = styled.div`
  text-align: left;
  margin-bottom: 6px;
`;

const TermsCheckText = styled.label`
  font-size: ${props => (props.type === "ALL" ? "15px" : "12px")};
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: -0.6px;
  text-align: left;
  color: ${props => (props.type === "ALL" ? "#252525" : "#858585")};
  display: inline-block;
  cursor: pointer;
  position: relative;
  padding-left: 24px;

  &:before {
    content: "";
    width: 16px;
    height: 16px;
    position: absolute;
    left: 0;
    bottom: 1px;
    background-color: #ffffff;
    border: 1px solid #d2dae2;
    line-height: 13px;
  }
`;

const TermsCheckbox = styled.input`
  display: none;
  &:checked + ${TermsCheckText}:before {
    content: "";
    background-image: url("https://static.koreatech.in/assets/img/check.png");
    background-size: cover;
  }
`;

const TermsTitle = styled.div`
  font-size: 15px;
  letter-spacing: -0.8px;
  text-align: left;
  color: #252525;
  padding-top: 12px;
  margin-bottom: 11px;
  cursor: pointer;
`;

const TermsContent = styled.textarea`
  resize: none;
  width: 352px;
  border: 1px solid #d2dae2;
  padding: 18px 19px 17px 19px;
  font-family: NanumBarunGothic;
  font-size: 12px;
  font-weight: 300;
  line-height: 1.5;
  letter-spacing: -0.6px;
  text-align: left;
  color: #858585;
  height: 102px;

  @media (max-width: 576px) {
    width: calc(100% - 50px);
    height: 90px;
  }
`;

const CopyRight = styled.div`
  height: 13px;
  font-family: NanumBarunGothic;
  font-size: 13px;
  letter-spacing: -0.7px;
  text-align: center;
  color: #7d7d7d;
  margin-top: 25px;
  @media (max-width: 576px) {
    font-size: 11px;
  }
`;

export default function SignupForm({
  userInfo,
  terms,
  onChange,
  onSubmit,
  checkDuplication,
  checkTerms,
  dropdown,
  setDropdown,
  loading
}) {
  return (
    <>
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          name="userId"
          value={userInfo.userId}
          placeholder="아우누리 아이디를 입력해주세요. (필수)"
          onChange={onChange}
        />
        <Advice>@koreatech.ac.kr은 입력하지 않으셔도 됩니다.</Advice>
        <Input
          type="password"
          name="firstPassword"
          value={userInfo.firstPassword}
          placeholder="비밀번호 (필수)"
          onChange={onChange}
          style={{
            border: userInfo.firstPassword === userInfo.secondPassword ? '1px solid #d2dae2' : '2px solid red'
          }}
        />
        <Advice>
          비밀번호는 특수문자, 숫자를 포함해 6자 이상 18자 이하여야 합니다.
        </Advice>
        <Input
          type="password"
          name="secondPassword"
          value={userInfo.secondPassword}
          placeholder="비밀번호 확인 (필수)"
          onChange={onChange}
        />
        <Input
          type="text"
          name="name"
          value={userInfo.name}
          placeholder="이름 (선택)"
          onChange={onChange}
        />
        <Row>
          <Input
            type="text"
            name="nickname"
            value={userInfo.nickname}
            placeholder="닉네임 (선택)"
            onChange={onChange}
            width={305}
          />
          <CheckButton
            type="button"
            onClick={() => checkDuplication(userInfo.nickname)}
          >
            중복확인
          </CheckButton>
        </Row>

        <Input
          type="text"
          name="studentNumber"
          value={userInfo.studentNumber}
          placeholder="학번 (선택)"
          onChange={onChange}
        />
        <Input
          type="text"
          name="phoneNumber"
          value={userInfo.phoneNumber}
          placeholder="전화번호 (Ex: 010-0000-0000) (선택)"
          onChange={onChange}
        />
        <Row>
          <MajorButton
            type="button"
            name="major"
            value={userInfo.major}>
            {!userInfo.major && "학부 (학번 입력시 자동입력)"}
            {userInfo.major && userInfo.major}
          </MajorButton>
          <DropdownWrapper
            onMouseOver={() => setDropdown(true)}
            onMouseOut={() => setDropdown(false)}
          >
            <DropdownButton type="button" value={userInfo.gender}>
              {!userInfo.gender && '성별'}
              {userInfo.gender && (userInfo.gender === "0" ? "남" : "여")}
              <DropdownIcon src={"https://static.koreatech.in/assets/img/bus_dropdown.png"} />
            </DropdownButton>
            <DropdownContentWrapper dropdown={dropdown}>
              <DropdownContent
                type="button"
                name="gender"
                value={0}
                onClick={onChange}
              >
                남
              </DropdownContent>
              <DropdownContent
                type="button"
                name="gender"
                value={1}
                onClick={onChange}
              >
                여
              </DropdownContent>
            </DropdownContentWrapper>
          </DropdownWrapper>
        </Row>
        <Line />
        <TermsWrapper>
          <TermsCheckbox
            type="checkbox"
            name="all"
            checked={terms.all}
            onChange={checkTerms}
          />
          <TermsCheckText type="ALL" id="all" onClick={checkTerms}>
            아래 이용약관에 모두 동의합니다.
          </TermsCheckText>
        </TermsWrapper>
        <TermsWrapper>
          <TermsCheckbox
            type="checkbox"
            name="privacy"
            checked={terms.privacy}
            onChange={checkTerms}
          />
          <TermsCheckText id="privacy" onClick={checkTerms}>
            개인정보 이용약관에 동의합니다.
          </TermsCheckText>
        </TermsWrapper>
        <TermsWrapper>
          <TermsCheckbox
            type="checkbox"
            name="koin"
            checked={terms.koin}
            onChange={checkTerms}
          />
          <TermsCheckText id="koin" onClick={checkTerms}>
            코인 이용약관에 동의합니다.
          </TermsCheckText>
        </TermsWrapper>
        <SignUpButton type="submit" onClick={onSubmit}>
          {!loading && "회원가입"}
          <ClipLoader
            size={25}
            color={"#fff"}
            loading={loading}
          />
        </SignUpButton>
      </form>
      <Line />
      <TermsTitle>개인정보 이용약관</TermsTitle>
      <TermsContent readOnly></TermsContent>
      <TermsTitle>코인 이용약관</TermsTitle>
      <TermsContent readOnly></TermsContent>
    </>
  );
}
