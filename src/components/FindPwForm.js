import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Container = styled.div`
  min-height: 700px;
`;

const FindSection = styled.div`
  margin: 13vh auto 0 auto;
  width: 430px;
  padding-top: 6%;
  padding-bottom: 18.5%;
  border-radius: 5px;
`;

const LogoImage = styled.img`
  width: 125px;
  cursor: pointer;
`;

const InputForm = styled.input`
  width: 368px;
  height: 39px;
  font-size: 15px;
  padding-left: 17px;
  border: #d2dae2 1px solid;

  &::placeholder {
    letter-spacing: -0.8px;
    color: #bec9d5;
  }
`;

const StyledButton = styled.button`
  width: 389px;
  height: 45px;
  border: 1px solid #175c8e;
  background: #175c8e;
  color: white;
  font-family: NanumSquare;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -1px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px auto 0 auto;

  &:disabled {
    background: #e5eaf0;
    color: #d2dae2;
    border: solid 1px #d2dae2;
  }
`;

const Advice = styled.div`
  margin-top: 17px;
  letter-spacing: -0.6px;
  font-size: 12px;
  color: #858585;
`;

const CopyRight = styled.div`
  margin-top: 28px;
  color: #7d7d7d;
  letter-spacing: -0.7px;
  font-size: 13px;
`;

export default function FindPwForm({
  userId,
  onChange,
  onSubmit,
  loading,
  findSuccess
}) {
  const today = new Date();
  return (
    <Container>
      <FindSection>
        <Link
          to="/"
          style={{
            display: "inline-block",
            marginBottom: "40px"
          }}
        >
          <LogoImage
            src={"https://static.koreatech.in/assets/img/logo_primary.png"}
          />
        </Link>
        <InputForm
          type="text"
          value={userId}
          onChange={onChange}
          placeholder="아우누리 ID를 입력해주세요."
        />
        <StyledButton onClick={onSubmit} disabled={findSuccess}>
          {!loading && "비밀번호 찾기"}
          <ClipLoader size={25} color={"#fff"} loading={loading} />
        </StyledButton>
        <Advice>학교메일로 비밀번호 초기화 메일이 발송됩니다.</Advice>
        <CopyRight>
          COPYRIGHT ⓒ {today.getFullYear()} BY BCSDLab ALL RIGHTS RESERVED.
        </CopyRight>
      </FindSection>
    </Container>
  );
}
