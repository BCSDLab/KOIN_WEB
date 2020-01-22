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

function CopyRight() {
  const today = new Date();
  return (
    <CopyRightText>
      COPYRIGHT ⓒ {today.getFullYear()} BY <strong>BCSDLab</strong> ALL RIGHTS RESERVED.
    </CopyRightText>
  )
}

export default React.memo(CopyRight);
