import React from 'react'
import styled, { css } from 'styled-components';

import Input from './Input';
import Dialog from '../Dialog';

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

const Row = styled.div`
  display: flex;
  justify-content: space-between;
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

const ModifyButton = styled.button`
  ${StyledButton};
  font-size: 20px;
  width: 390px;
  font-weight: 700;
  background: #175c8e;
  margin-bottom: 12px;
`;

const WithdrawButton = styled.button`
  ${StyledButton};
  font-size: 20px;
  width: 390px;
  font-weight: 700;
  background: #c83535;
  border: 1px solid #c83535;
`;

export default function ModifyForm({
  userInfo,
  visible,
  dialogInfo,
  loading,
  dropdown,
  setDropdown,
  checkDuplication,
  onModify,
  onWithdraw,
  onChange,
  onConfirm,
  onCancel
}) {
  return (
    <>
    <form onSubmit={onModify}>
      <Input
        type="text"
        name="userId"
        value={userInfo.userId}
        onChange={onChange}
        readOnly
        disabled
      />
      <Advice>계정명은 변경하실 수 없습니다.</Advice>
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
      <Advice>비밀번호는 특수문자, 숫자를 포함해 6자 이상 18자 이하여야 합니다.</Advice>
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
      <ModifyButton
        onClick={onModify}>
        정보수정
      </ModifyButton>
      <WithdrawButton
        type="button"
        onClick={onWithdraw}>
        회원탈퇴
      </WithdrawButton>
    </form>
    <Dialog
      title={dialogInfo.title}
      confirmText="확인"
      cancelText="취소"
      onConfirm={onConfirm}
      onCancel={onCancel}
      visible={visible}
      type={dialogInfo.type}>
      {dialogInfo.contents}
    </Dialog>
    </>
  )
}
