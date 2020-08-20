import React, { useCallback } from 'react'
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 360px;
  background: white;
  padding-bottom: 40px;
  
  border-bottom: rgba(210, 218, 226, 0.5) 1px solid;
  transition: all .3s cubic-bezier(0, 0, 0.2, 1);
  transform: ${props => props.mobileMenu ? 'none' : 'translateX(100%)'};
  z-index: 20;
  overflow: scroll;
`;

const UserInfoSection = styled.div`
  width: 100%;
  height: 119px;
  color: #175c8e;
  font-size: 14px;
  font-family: NanumSquare;
  padding: 0 16px;
  box-sizing: border-box;
  background: #ffffff;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  left: 0;
`;

const BackRouteButton = styled.button`
  display: block;
  margin: 5px 0 8px -2px;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  background: url("http://static.koreatech.in/assets/img/arrow_left.png") center/28px 28px no-repeat;
`;

const Nickname = styled.span`
  font-size: 16px;
  display: block;
  width: 240px;
  margin-bottom: 16px;
  font-weight: 500;
  
  ::after {
    content: '님, 안녕하세요!';
    font-size: 13px;
  font-weight: normal;
  }
`;

const MyInfoLink = styled(Link)`
  text-decoration: none;
  font-size: 15px;
  width: 80px;
  font-weight: normal;
  color: black;
  display: flex;
  line-height: 24px;
  
  :before {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-right: 4px;
    content: '';
    background: url("http://static.koreatech.in/assets/img/ic-bottom_myinfo.png") center/24px 24px;
  }
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
  padding: 5px 16px 5px;
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: normal;
  color: #858585;
  background-color: #f7f7f7;
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
  font-size: 15px;
  background: #fff;
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

const BCSDLabLogo = styled.img.attrs({
  src: 'http://static.koreatech.in/assets/img/ic-bcsd_gray.png',
  alt: 'BCSD Lab 로고'
})`
  position: absolute;
  right: 16px;
  bottom: 53px;
  width: 33px;
  height: 33px;
`;

const KOINLogo = styled.img.attrs({
  src: 'http://static.koreatech.in/assets/img/rectangle_icon.png',
  alt: 'KOIN 컬러 로고'
})`
  position: absolute;
  right: 16px;
  top: 16px;
  width: 40px;
  height: 40px;
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
        <BackRouteButton onClick={() => setMobileMenu(false)} />
        <Nickname>
          {userInfo && userInfo.nickname}
        </Nickname>
        <div>
          {token && 
            <>
              <MyInfoLink to="/modifyinfo" onClick={onCloseNav}>내 정보</MyInfoLink>|
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
      <KOINLogo />
      <BCSDLabLogo />
    </Container>
  )
}
