import React, { useEffect } from 'react'
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 40px;
  margin-bottom: 20px;

  @media (max-width: 576px) {
    display: none;
  }
`;

const Title = styled.div`
  float: left;
  font-family: NanumSquare, serif;
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -1.5px;
  color: #175c8e;
  cursor: pointer;
`;

const EditButton = styled.button`
  float: right;
  padding: 6px 13px;
  color: #175c8e;
  background: white;
  border: 1px #175c8e solid;
  font-size: 13px;
  cursor: pointer;
  margin-right: 5px;
  margin-top: 1px;
`;

const DeleteButton = styled.button`
  float: right;
  padding: 6px 13px;
  color: #d32525;
  background: white;
  border: 1px #d32525 solid;
  font-size: 13px;
  cursor: pointer;
  margin-right: 5px;
  margin-top: 1px;
`;

const ListButton = styled.button`
  float: right;
  padding: 6px 13px;
  color: white;
  background-color: #175c8e;
  border: 1px #175c8e solid;
  font-size: 13px;
  cursor: pointer;
  margin-top: 1px;
  display: block;
`;

const RegisterButton = styled.button`
  float: right;
  padding: 6px 20px;
  color: white;
  background-color: #175c8e;
  font-size: 13px;
  cursor: pointer;
  letter-spacing: -0.7px;
  border: 1px solid #175c8e;
  position: relative;
  top: 1px;
`;

export default function Header({
  match,
  history,
}) {
  const setTitle = () => {
    switch(match.params.type) {
      case 'notice':
        sessionStorage.setItem("boardId", 4);
        return '공지사항';
      case 'free':
        sessionStorage.setItem("boardId", 1);
        return '자유게시판';
      case 'job':
        sessionStorage.setItem("boardId", 2);
        return '취업게시판';
      case 'question':
        sessionStorage.setItem("boardId", 10);
        return '질문게시판';
      case 'anonymous':
        sessionStorage.setItem("boardId", -1);
        return '익명게시판';
      case 'promotion':
        sessionStorage.setItem("boardId", 6);
        return '홍보게시판';
      default:
        return;
    }
  }
  return (
    <Container>
      <Title>{setTitle()}</Title>
      {/* 이부분 고쳐야함 */}
      {match.params.id === 'edit' && 
        <>
          <EditButton onClick={() => history.push(`${match.url}/edit`)}>수정</EditButton>
          <DeleteButton>삭제</DeleteButton>
        </>
      }
      {match.path === '/board/:type' 
        ? <RegisterButton onClick={() => history.push(`${match.url}/register`)}>
          글쓰기
        </RegisterButton>
        : <ListButton onClick={() => history.push(`${match.url.substr(0, match.url.lastIndexOf('/'))}`)}>
          목록으로
        </ListButton>
      }
    </Container>
  )
}
