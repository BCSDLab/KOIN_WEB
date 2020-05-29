import React from 'react'
import styled from 'styled-components';
import PropTypes from "prop-types"

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

const Header = React.memo(function Header({
  match,
  history,
  children
}) {
  const setTitle = () => {
    if (match.params.type === 'sell') {
      return '팝니다';
    } else {
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

Header.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  children: PropTypes.object
}

export default Header;
