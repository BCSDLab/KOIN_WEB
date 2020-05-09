import React from 'react'
import styled, { css } from 'styled-components';
import Input from './Input';
import ClipLoader from 'react-spinners/ClipLoader';
import PropTypes from 'prop-types';

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
    width: 320px;
    margin: 0 auto 12px auto;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 576px) {
    width: 320px;
    margin: 0 auto;
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
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    background: #e5eaf0;
    border: solid 1px #d2dae2;
  }

  @media (max-width: 576px) {
    width: 320px;
    height: 36px;
    margin: 0 auto 12px auto;
    font-size: 15px;
  }
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
    width: 155px;
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
    width: 100px;
    margin-left: 6px;
    height: 36px;
    font-size: 12px;
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
    padding: 0 0 0 16px;
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
    width: 155px;
  }
`;

const Line = styled.hr`
  border: 0.5px solid #d2dae2;
  margin: 20px 0;

  @media (max-width: 576px) {
    width: 320px;
    margin: 20px auto;
  }
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

function ModifyForm({
  userInfo,
  authInProgress,
  checkInProgress,
  dropdown,
  setDropdown,
  checkDuplication,
  onModify,
  onWithdraw,
  onChange,
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
      <Advice>비밀번호를 입력하지 않으면 기존 비밀번호가 유지됩니다.</Advice>
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
          disabled={checkInProgress}
          onClick={() => checkDuplication(userInfo.nickname)}
        >
          {!checkInProgress && "중복확인"}
          <ClipLoader
            size={25}
            color={"#175c8e"}
            loading={checkInProgress}
          />
        </CheckButton>
      </Row>
      {userInfo.identity !== 5 ? (
        <Input
          type="text"
          name="studentNumber"
          value={userInfo.studentNumber}
          placeholder="학번 (선택)"
          onChange={onChange}
        />
      ): (
        <>
          <Input
            type="text"
            name="email"
            value={userInfo.email}
            placeholder="이메일 등록"
            onChange={onChange}
          />
          <Advice>이메일은 비밀번호를 찾을 시 필요하니 등록하시길 바랍니다.</Advice>
        </>
      )}
      <Input
        type="text"
        name="phoneNumber"
        value={userInfo.phoneNumber}
        placeholder="전화번호 (Ex: 010-0000-0000) (선택)"
        onChange={onChange}
      />
      {userInfo.identity !== 5 && (
        <Row>
          <MajorButton
            type="button"
            name="major"
            value={userInfo.major}>
            {!userInfo.major && "학부 (자동입력)"}
            {userInfo.major && userInfo.major}
          </MajorButton>
          <DropdownWrapper
            onMouseOver={() => setDropdown(true)}
            onMouseOut={() => setDropdown(false)}
          >
            <DropdownButton type="button" value={userInfo.gender}>
              {userInfo.gender === 0 ? "남" : (userInfo.gender === 1 ? "여" : "성별")}
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
      )}
      <Line />
      <ModifyButton
        disabled={authInProgress}
        onClick={onModify}>
        {!authInProgress && "정보수정"}
        <ClipLoader
          size={25}
          color={"#175c8e"}
          loading={authInProgress}
        />
      </ModifyButton>
      <WithdrawButton
        type="button"
        disabled={authInProgress}
        onClick={onWithdraw}>
        {!authInProgress && "회원탈퇴"}
        <ClipLoader
          size={25}
          color={"#175c8e"}
          loading={authInProgress}
        />
      </WithdrawButton>
    </form>
    </>
  )
}

ModifyForm.propTypes = {
  userInfo: PropTypes.object,
  authInProgress: PropTypes.bool,
  checkInProgress: PropTypes.bool,
  dropdown: PropTypes.bool,
  setDropdown: PropTypes.func,
  checkDuplication: PropTypes.func,
  onModify: PropTypes.func,
  onWithdraw: PropTypes.func,
  onChange: PropTypes.func,
}

export default ModifyForm
