import React, { useCallback } from 'react'
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  position: fixed;
  top: 55px;
  left: 0;
  width: 100%;
  height: calc(100% - 153px);
  min-width: 360px;
  background: #f7f7f7;
  padding-bottom: 40px;
  
  border-bottom: rgba(210, 218, 226, 0.5) 1px solid;
  transition: all .3s cubic-bezier(0, 0, 0.2, 1);
  transform: ${props => props.mobileMenu ? 'none' : 'translateX(-100%)'};
  z-index: 20;
  overflow: scroll;
`;

const UserInfoSection = styled.div`
  width: 100%;
  height: 41px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #175c8e;
  font-size: 14px;
  font-family: NanumSquare;
  padding: 0 20px;
  box-sizing: border-box;
  background: #ffffff;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  left: 0;
`;

const Nickname = styled.span`
  font-size: 16px;
  display: inline-block;
  width: 190px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AuthLinkStyle = css`
  cursor: pointer;
  margin-right: 9px;
  height: 12px;
  text-decoration: none;
  color: #175c8e;
  & + & {
    margin-left: 9px;
    margin-right: 0;
  }
`;

const StyledAuthLink = styled(Link)`
  ${AuthLinkStyle}
`;
const AuthLinkButton = styled.span`
  cursor: pointer;
  margin-left: 9px;
`

const TitleSection = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 24px 20px 10px 20px;
  font-size: 14px;
  color: #858585;
  text-align: left;
`;

const SubMenuWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`
const SubMenuLinkButton = styled(Link)`
  display: block;
  width: 50%;
  background: #fff;
  border: 0.5px rgba(210, 218, 226, 0.5) solid;
  font-size: 16px;
  box-sizing: border-box;
  border-collapse: collapse;
  cursor: pointer;
  text-decoration: none;
  padding: 11px 20px;
  text-align: left;
  color: #252525;
  font-weight: 500;

  &:hover {
    color: #f7941e;
    font-weight: 700;
    outline: none;
  }
`;


export default function MobileTopnav({
  mobileMenu,
  token,
  userInfo,
  categories,
  onLogout,
  setMobileMenu,
  onClickFooterMenu
}) {

  const onCloseNav = useCallback(() => {
    onClickFooterMenu(1);
    setMobileMenu(false);
  }, []);

  return (
    <Container mobileMenu={mobileMenu}>
      <UserInfoSection>
        <Nickname>
          {userInfo && userInfo.nickname}
        </Nickname>
        <div>
          {token && 
            <>
              <StyledAuthLink to="/modifyinfo" onClick={onCloseNav}>정보수정</StyledAuthLink>|
              <AuthLinkButton onClick={() => {onLogout(); onCloseNav()}}>로그아웃</AuthLinkButton>
            </>
          }
          {!token &&
            <>
              <StyledAuthLink to="/signup" onClick={onCloseNav}>회원가입</StyledAuthLink>|
              <StyledAuthLink to="/login" onClick={onCloseNav}>로그인</StyledAuthLink>
            </>
          }
        </div>
      </UserInfoSection>
      {categories.map((category, idx) => (
        <div key={idx}>
          <TitleSection>
            {category.title}
          </TitleSection>
          <SubMenuWrapper>
          {category.submenu.map((submenu, idx2) => (
            <SubMenuLinkButton key={idx2} to={submenu.link} onClick={onCloseNav}>
              {submenu.title}
            </SubMenuLinkButton>
          ))}
          </SubMenuWrapper>
          
        </div>
      ))}
    </Container>
  )
}
