import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

function Header({
  match,
  history,
  children
}) {
  const setTitle = () => {
    switch(match.params.type) {
      case 'notice':
        return '공지사항';
      case 'free':
        return '자유게시판';
      case 'job':
        return '취업게시판';
      case 'question':
        return '질문게시판';
      case 'anonymous':
        return '익명게시판';
      case 'promotion':
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
}

Header.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  children: PropTypes.element
}

export default React.memo(Header)
