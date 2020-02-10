import React from 'react'
import styled, { keyframes} from 'styled-components';
import { Link } from 'react-router-dom';
import MobileTopnav from './MobileTopnav';

const SlideEnter = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateX(0);
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
  -webkit-animation: ${SlideEnter} .3s ease-out;
  -moz-animation: ${SlideEnter} .3s ease-out;
  display: ${props => {
    switch(props.path) {
      case '/login':
      case '/signup':
      case '/modifyinfo':
      case '/findpw':
        if (props.mobileMenu) return 'block';
        return 'none';
      default:
        return 'block';
    }
  }};
  @media (max-width: 576px) {
    height: 56px;
  }
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

const MobileRow = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  text-align: center;
`;

const MenuIcon = styled.img`
  position: absolute;
  top: 16px;
  left: 16px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const RouteIcon = styled.img`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 16px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export default function Topnav({
  categories,
  menu,
  subMenu,
  path,
  onMouseOverMenu,
  token,
  userInfo,
  onLogout,
  mobileMenu,
  setMobileMenu,
  onClickMultiPurposBtn
}) {
  const getTitle = () => {
    if (path === '/timetable') return '시간표';
    else if (path === '/cafeteria') return '식단';
    else if (path === '/bus') return '버스/교통';
    else if (path === '/faq') return 'FAQ';
    else if (!path.indexOf('/room')) return '복덕방';
    else if (!path.indexOf('/circle')) return '동아리';
    else if (!path.indexOf('/store')) return '주변상점';

    else if (!path.indexOf('/board/free')) return '자유게시판';
    else if (!path.indexOf('/borad/anonymous')) return '익명게시판';
    else if (!path.indexOf('/board/notice')) return '공지게시판';
    else if (!path.indexOf('/board/jog')) return '취업게시판';
    else if (!path.indexOf('/board/question')) return '질문게시판';
    else if (!path.indexOf('/borad/promotion')) return '홍보게시판';
    else if (!path.indexOf('/lost')) return '분실물';

    else if (!path.indexOf('/market/sell')) return '팝니다';
    else if (!path.indexOf('/market/buy')) return '삽니다';
  }
  return (
    <Container path={path} mobileMenu={mobileMenu}>
      {window.innerWidth > 576 && <Row>
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
      </Row>}
      {window.innerWidth <= 576 &&
        <MobileRow>
          {!mobileMenu &&
            <MenuIcon
              src={"https://static.koreatech.in/assets/img/menu.png"}
              onClick={() => setMobileMenu(true)} />}
          {mobileMenu &&
            <MenuIcon
              src={"https://static.koreatech.in/assets/img/back-menu.png"}
              onClick={() => setMobileMenu(false)} />}
          <Title>
            {!mobileMenu && getTitle()}
            {mobileMenu && '전체 서비스'}
          </Title>
          {!mobileMenu && <RouteIcon
            src={"https://static.koreatech.in/assets/img/mobile__create.png"}
            onClick={onClickMultiPurposBtn}
          />}          
        </MobileRow>
      }
      {window.innerWidth <= 576 &&
        <MobileTopnav
          mobileMenu={mobileMenu}
          token={token}
          userInfo={userInfo}
          categories={categories}
          onLogout={onLogout}
          setMobileMenu={setMobileMenu}
        />
      }

      {/* <MobileTopnav
        mobileMenu={mobileMenu}
        token={token}
        userInfo={userInfo}
        categories={categories}
        onLogout={onLogout}
        setMobileMenu={setMobileMenu}
      /> */}
    </Container>
  )
}
