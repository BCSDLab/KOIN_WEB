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
    if (match.params.type === 'sell') {
      sessionStorage.setItem("marketId", 0);
      return '팝니다';
    } else {
      sessionStorage.setItem("marketId", 1);
      return '삽니다';
    }
  }
  return (
    <Container>
      <Title onClick={() => history.push(`/market/${match.params.type}`)}>{setTitle()}</Title>
      {children}
    </Container>
  )
});
