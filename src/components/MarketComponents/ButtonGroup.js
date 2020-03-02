import React from 'react'
import styled, { css } from 'styled-components';

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

const MyItemButton = styled.button`
  ${ButtonStyle}
  color: #ffffff;
  background: #909090;
  border: 1px solid #909090;
`;

export default function ButtonGroup({
  history,
  match,
  isMyItem,
  isMyItems,  
  onClickEditButton,
  onClickDeleteButton,
  getItemList,
  getMyItemList
}) {
  const onClickRoutingButton = () => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (!match.params.id) {
      if (userInfo) {
        alert("로그인이 필요합니다.");
        history.push('/login');
      } else if (!userInfo.nickname) {
        alert("닉네임이 필요합니다.");
        history.push('/modifyinfo');
      } else {
        history.push(`${match.url}/register`);
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
            <RoutingButton
              onClick={() => history.push(`${match.url.substr(0, match.url.lastIndexOf('/'))}`)}>
              목록으로
            </RoutingButton>
            {isMyItem && 
              <>
                <DeleteButton onClick={onClickDeleteButton}>삭제</DeleteButton>
                <EditButton onClick={onClickEditButton}>수정</EditButton>
              </>
            }
          </>
        ) : (
          <>
            <RoutingButton
              register={!match.params.id}
              onClick={onClickRoutingButton}>
              {!match.params.id ? "글쓰기" : "목록으로"}
            </RoutingButton>
            {!match.params.id && sessionStorage.getItem("token") && 
              <MyItemButton
                onClick={isMyItems 
                  ? () => getItemList(1)
                  : () => getMyItemList(1)}>
                {isMyItems ? "전체 물품 보기" : "내가 등록한 물품 보기"}
              </MyItemButton>
            }
          </>
        )
      }
    </StyledButtonGroup>
  )
}
