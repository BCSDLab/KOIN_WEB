import React from 'react'
import styled from 'styled-components';
import { Link } from "react-router-dom";

const StyledContainer = styled.div`
  width: 100%;
  min-height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.div`
  width: 390px;
  margin: 0 auto;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin-top: 80px;
  margin-bottom: 40px;

  @media (max-width: 576px) {
    margin-bottom: 60px;
    margin-right: 17px;
  }
`;

const LogoImage = styled.img.attrs({
  src: "https://static.koreatech.in/assets/img/logo_primary.png"
})`
  width: 125px;
  cursor: pointer;

  @media (max-width: 576px) {
    width: 105px;
  }
`;

function Container({ children }) {
  return (
    <StyledContainer>
      <FormWrapper>
        <StyledLink to="/">
          <LogoImage />
        </StyledLink>
        {children}
      </FormWrapper>
    </StyledContainer>
  )
}

export default React.memo(Container);
