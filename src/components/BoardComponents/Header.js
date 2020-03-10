import React from 'react'
import styled from 'styled-components';

const Container = styled.header`
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  position: relative;

  @media (max-width: 576px) {
    display: none;
  }
`;

const Title = styled.h1`
  float: left;
  font-family: NanumSquare, serif;
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -1.5px;
  color: #175c8e;
  cursor: pointer;
  margin: 0;
`;

export default React.memo(function Header({
  match,
  history,
  children
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
      <Title onClick={() => history.push(`/board/${match.params.type}`)}>{setTitle()}</Title>
      {children}
    </Container>
  )
})
