import React from "react";
import styled from "styled-components";
import Input from './Input';
import ClipLoader from "react-spinners/ClipLoader";
import PropTypes from 'prop-types';

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
    border: solid 1px #d2dae2;
  }

  @media (max-width: 576px) {
    width: 320px;
    padding: 0;
    height: 36px;
    font-size: 15px;
    margin: 0 auto;  
  }
`;

const Advice = styled.div`
  margin-top: 17px;
  letter-spacing: -0.6px;
  font-size: 12px;
  color: #858585;

  @media (max-width: 576px) {
    margin-top: 20px;
    font-size: 11px;
  }
`;


function FindPwForm({
  userId,
  onChange,
  onSubmit,
  authInProgress,
  findSuccess
}) {
  return (
    <>
      <Input
        type="text"
        value={userId}
        onChange={onChange}
        placeholder="아우누리 ID를 입력해주세요."
        autoFocus
      />
      <StyledButton onClick={onSubmit} disabled={findSuccess || authInProgress} >
        {!authInProgress && "비밀번호 찾기"}
        <ClipLoader size={25} color={"#175c8e"} loading={authInProgress} />
      </StyledButton>
      <Advice>학교메일로 비밀번호 초기화 메일이 발송됩니다.</Advice>
    </>
  );
}

FindPwForm.propTypes = {
  userId: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  authInProgress: PropTypes.bool,
  findSuccess: PropTypes.bool
}

export default FindPwForm;
