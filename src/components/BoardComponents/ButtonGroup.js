import React from 'react'
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledButtonGroup = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  
  @media (max-width: 576px) {
    display: none;
  }
`;

const ButtonStyle = css`
  font-size: 13px;
  padding: 6.5px 13px;
  float: right;
  cursor: pointer;
  margin-right: 5px;
  letter-spacing: -0.7px;
`;

const RoutingButton = styled.button`
  ${ButtonStyle}
  padding: ${props => props.register && '6px 20px'};
  color: white;
  background-color: #175c8e;
  border: 1px #175c8e solid;
  margin-right: 0;
`;

const EditButton = styled.button`
  ${ButtonStyle}
  color: #175c8e;
  background: white;
  border: 1px #175c8e solid;
`;

const DeleteButton = styled.button`
  ${ButtonStyle}
  color: #d32525;
  background: white;
  border: 1px #d32525 solid;

`;

const TempPasswordInputField = styled.input`
  margin-right: 5px;
  padding: 7px 8px;
  font-size: 13px;
  border: 1px #d2dae2 solid;
  float: right;
  width: 83px;
`;

function ButtonGroup({
  match,
  history,
  isMyPost,
  password,
  onChangePassword,
  onClickEditButton,
  onClickDeleteButton
}) {
  const onClickRoutingButton = () => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const boardId = JSON.parse(sessionStorage.getItem("boardId"));
    if (!match.params.id) {
      if (boardId === -1) {
        history.push(`${match.url}/register`);
      } else if (boardId === 11) {
        if (!userInfo) {
          alert("로그인이 필요합니다.");
          history.push('/login');
        } else if (userInfo.identity !== 5) {
          alert("점주만이 홍보게시물을 작성할 수 있습니다.");
        } else {
          history.push(`${match.url}/register`);
        }
      } else {
        if (!userInfo) {
          alert("로그인이 필요합니다.");
          history.push('/login');
        } else if (!userInfo.nickname) {
          alert("닉네임이 필요합니다.");
          history.push('/modifyinfo');
        } else {
          history.push(`${match.url}/register`);
        }
      }
    } else {
      history.push(`${match.url.substr(0, match.url.lastIndexOf('/'))}`);
    }
  }

  return (
    <StyledButtonGroup>
      {Number.isInteger(parseInt(match.params.id))
        ? (
          <>
            <RoutingButton onClick={() => history.push(`${match.url.substr(0, match.url.lastIndexOf('/'))}`)}>목록으로</RoutingButton>
            {(isMyPost || parseInt(sessionStorage.getItem("boardId")) === -1) &&
              <>
                <DeleteButton onClick={onClickDeleteButton}>삭제</DeleteButton>
                <EditButton onClick={onClickEditButton}>수정</EditButton>
              </>
            }
            {parseInt(sessionStorage.getItem("boardId")) === -1 &&
              <TempPasswordInputField
                type="password"
                value={password}
                onChange={onChangePassword}
                placeholder="게시글 비밀번호"
              />
            }
          </>
        ) : (
          <RoutingButton
            register={!match.params.id}
            onClick={onClickRoutingButton}>
            {!match.params.id ? "글쓰기" : "목록으로"}
          </RoutingButton>
        )
      }
    </StyledButtonGroup>
  )
}


ButtonGroup.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isMyPost: PropTypes.bool,
  password: PropTypes.string,
  onChangePassword: PropTypes.func,
  onClickEditButton: PropTypes.func,
  onClickDeleteButton: PropTypes.func
}

export default React.memo(ButtonGroup)
