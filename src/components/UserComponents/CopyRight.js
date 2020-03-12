import React from 'react'
import styled from 'styled-components';

const CopyRightText = styled.div`
  margin-top: 28px;
  color: #7d7d7d;
  letter-spacing: -0.7px;
  font-size: 13px;

  @media (max-width: 576px) {
    margin-top: 8px;
    font-size: 11px;
  }
`;

export default React.memo(function CopyRight() {
  const today = new Date();
  return (
    <CopyRightText>
      COPYRIGHT ⓒ {today.getFullYear()} BY <strong style={{ color: "#acabab" }}>BCSDLab</strong> ALL RIGHTS RESERVED.
    </CopyRightText>
  )
})