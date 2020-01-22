import React from 'react'
import styled, { css, keyframes} from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import Dialog from './Dialog';

const SlideDown = keyframes`
  100% {
    opacity: 0;
    visibility: hidden;
    -webkit-transform: translateY(-100%);
  }
  0% {
    opacity: 1;
    visiblilty: visible;
    -webkit-transform: translateY(0);
  }
`;

const Container = styled.div`
  height: 80px;
  font-size: 12px;
  border-bottom: 1px solid #0000002b;
  font-family: NanumSquare, serif;
  font-weight: 800;
  background: #175c8e;
  color: #fff;
`;

const Row = styled.div`
  width: 1132px;
  height: 100%;
  margin: 0 auto;
`;

const StyledLink = styled(Link)`
  padding: 18px 35px 18px 0;
  float: left;
`;

const KOINLogoImage = styled.img.attrs({
  src: 'https://static.koreatech.in/assets/img/logo_white.png'
})`
  width: 79.6px;
  height: 44px;
`;

const MegaMenuItem = styled.button`
  border: none;
  outline: none;
  float: left;
  padding: 31px 0 30px 0;
  margin: 0 20px;
  font-weight: 700;
  font-size: 17px;
  text-align: left;
  display: block;
  font-family: NanumSquare, serif;
  line-height: 1;
  color: #ffffff;
  cursor: pointer;
  background-color: #175c8e;

  &:hover {
    border-bottom: 2px solid #ffffff;
  }
`;

const MegaMenuPanelContainer = styled.div`
  display: block;
  top: 80px;
  overflow: hidden;
  position: absolute;
  left: 0;
  margin: 0 auto;
  width: 100%;
  min-width: 1132px;
  z-index: 4;
  height: 0;
  background: #15507a;
  -webkit-transition: height 0.2s, padding-top 0.4s, padding-bottom 0.4s, -webkit-transform 0.5s;
  transition: height 0.2s, padding-top 0.4s, padding-bottom 0.4s, transform 0.5s;
`;

const MegaMenuContainer = styled.div`
  display: block;
  overflow: hidden;
  position: static;
  width: 1132px;
  height: 100%;
  z-index: 5;
  box-sizing: border-box;
  padding: 26px 0 0 0 ;
  margin: 0 auto;
  -webkit-transition: height 0.2s, -webkit-transform 0.5s;
  transition: height 0.2s, transform 0.5s;
`;

const MegaMenuPanelContent = styled.div`
  margin-left: 135px;
  height: 100%;
  padding: 0;
  width: 430px;
  display: block;
  position: relative;
`;

const MegaMenu = styled.div`
  overflow: hidden;
  float: left;
  display: flex;
  align-items: center;
  height: 100%;
  color: white;

  &:hover ${Container} {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
  }

  &:hover ${MegaMenuPanelContainer} {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    height: 176px;
    box-sizing: border-box;
  }
`;

const MenuItem = styled.div`
  line-height: 2;
  display: inline;
  position: absolute;
  top: ${props => props.index % 4 * 31.5 + 'px'};
  left: ${props => props.index < 4 ? '0px' : '100px'};
`;

const MenuItemLink = styled(Link)`
  color: #ffffff;
  display: block;
  font-size: 13px;
  padding-bottom: 10px;
  text-decoration: none;
  text-align: left;
  font-weight: 400;

  &:hover {
    font-weight: 800; 
  }
`;

const AuthLinkButton = styled.div`
  color: #a0d2f6;
  font-weight: normal;
  float: right;
  text-align: right;
  text-decoration: none;
  font-family: NanumSquare, serif;
  line-height: 1.35;
  font-size: 15px;
  color: #a0d2f6;
  padding: 31.5px 20px 31.5px 20px;
  cursor: pointer;
  
  &:hover {
    font-weight: 800;
    color: #fff;
  }
`;

export default function Topnav({
  categories,
  menu,
  subMenu,
  onMouseOverMenu,
  token,
  userInfo,
  onLogout,
  visible,
  onConfirm,
  dialogInfo
}) {
  return (
    <Container>
      <Row>
        <StyledLink to="/">
          <KOINLogoImage />
        </StyledLink>
        <MegaMenu>
          {categories.map((category, index) => (
            <MegaMenuItem
              key={index}
              onMouseOver={() => onMouseOverMenu(category.title)}>
              {category.title}
            </MegaMenuItem>
          ))}
          <MegaMenuPanelContainer>
            <MegaMenuContainer>
              <MegaMenuPanelContent>
                {subMenu && subMenu.map((sub, index) => (
                  <MenuItem
                    index={index}
                    key={index}>
                    <MenuItemLink to={sub.link}>
                      {sub.title}
                    </MenuItemLink>
                  </MenuItem>
                ))}
              </MegaMenuPanelContent>
            </MegaMenuContainer>
          </MegaMenuPanelContainer>
        </MegaMenu>
        {!token && <Link to="/login">
          <AuthLinkButton>
              로그인
          </AuthLinkButton>   
        </Link>}
        
        {token && <AuthLinkButton onClick={onLogout}>
          로그아웃
        </AuthLinkButton>}
        {!token && <Link to="/signup">
          <AuthLinkButton>
            회원가입
          </AuthLinkButton>
        </Link>}
        {token && <Link to="/modifyinfo">
          <AuthLinkButton>
            정보수정
          </AuthLinkButton>
        </Link>}
      </Row>
      <Dialog
        theme="dark"
        type={dialogInfo.type}
        visible={visible}
        confirmText="확인"
        onConfirm={onConfirm}>
        {dialogInfo.contents}
      </Dialog>
    </Container>
  )
}
