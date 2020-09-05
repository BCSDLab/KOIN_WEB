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

const Container = styled.nav`
  height: 80px;
  font-size: 12px;
  font-family: NanumSquare, serif;
  font-weight: 800;
  background: #175c8e;
  color: #fff;
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
  z-index: ${props => props.searchBar ? 16 : 'unset'};
  position: ${props => props.searchBar ? 'relative' : 'unset'};

  @media (max-width: 576px) {
    height: ${props => props.path === '/' ? '77px' : '56px'};
    border-radius: ${props => props.path === '/' ? '0 0 20px 20px' : '0'};
    box-shadow: ${props => props.path === '/' ? '0 2px 4px 0 rgba(0, 0, 0, 0.34)' : 'none'};
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    left: 0;
    z-index: 20;
    border-bottom: none;
    -webkit-animation: ${SlideEnter} .3s ease-out;
    -moz-animation: ${SlideEnter} .3s ease-out;
  }
`;

const Row = styled.div`
  width: 1132px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  z-index: ${props => props.searchBar ? 16 : 1};
  @media (max-width: 576px) {
    display: none;
  }
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

  @media (max-width: 576px) {
    width: 58px;
    height: 32px;
  }
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
  display: flex;
  margin-left: 135px;
  height: 100%;
  padding: 0;
  width: 430px;
  position: relative;
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
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
    height: 75px;
    box-sizing: border-box;
  }
`;

const MenuItem = styled.div`
  line-height: 2;
  margin-right: 38px;
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

const NewMenuTag = styled.div`
  display: inline-block;
  width: 12.5px;
  height: 12.5px;
  font-weight: 700;
  font-size: 11px;
  font-family: Verdana,serif;
  background-color: #f7941e;
  line-height: 12px;
  text-align: center;
  font-stretch: normal;
  letter-spacing: normal;
  margin-left: 4px;
`;

const AuthButtonGroup = styled.div`
  display: flex;
  align-items: center;
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
  padding: 0 20px;
  margin: 30px 0; 
  cursor: pointer;
  
  &:hover {
    font-weight: 800;
    color: #fff;
  }
`;

const MobileRow = styled.div`
  display: none;

  @media (max-width: 576px) {
    display: block;
    width: 100%;
    height: 100%;
    padding: ${props => props.isMain ? '20px' : '16px'};
    box-sizing: border-box;
    text-align: center;
  }
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
  top: ${props => props.isMain ? '26px' : '16px'};
  right: ${props => props.isMain ? '20px' : '16px'};
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 16px;
  height: 100%;
  display: flex;
  justify-content: ${props => props.isMain ? 'none' : 'center'};
  align-items: center;
`;

const SearchIcon = styled.img`
  width: 24px;
  height: 24px;
  padding: 28px 14px 28px 0;
  /* float: right; */
  cursor: pointer;
`;

export default React.memo(function Topnav({
  categories,
  menu,
  path,
  history,
  onMouseOverMenu,
  token,
  userInfo,
  onLogout,
  mobileMenu,
  searchBar,
  setMobileMenu,
  onClickFooterMenu,
  onClickLogoImage,
}) {
  const getTitle = () => {
    if (path === '/timetable') return '시간표';
    else if (path === '/cafeteria') return '식단';
    else if (path === '/bus') return '버스/교통';
    // else if (path === '/faq') return 'FAQ';
    else if (!path.indexOf('/room')) return '복덕방';
    // else if (!path.indexOf('/circle')) return '동아리';
    else if (!path.indexOf('/store')) return '주변상점';

    // else if (!path.indexOf('/board/free')) return '자유게시판';
    // else if (!path.indexOf('/board/anonymous')) return '익명게시판';
    else if (!path.indexOf('/board/notice')) return '공지사항';
    // else if (!path.indexOf('/board/job')) return '취업게시판';
    // else if (!path.indexOf('/board/question')) return '질문게시판';
    // else if (!path.indexOf('/board/promotion')) return '홍보게시판';
    // else if (!path.indexOf('/lost')) return '분실물';
    //
    // else if (!path.indexOf('/market/sell')) return '팝니다';
    // else if (!path.indexOf('/market/buy')) return '삽니다';
    // else if (!path.indexOf('/search')) return '검색 결과';
  }

  // const setRoutingButtonVisible = () => {
  //   switch(path) {
  //     case '/timetable':
  //     case '/board/free':
  //     case '/board/job':
  //     case '/board/anonymous':
  //     case '/board/question':
  //     case '/board/promotion':
  //     case '/lost':
  //     case '/market/buy':
  //     case '/market/sell':
  //       return true;
  //     default: return false;
  //   }
  // }

  return (
    <Container path={path} mobileMenu={mobileMenu} searchBar={searchBar}>
      <Row searchBar={searchBar}>
        <StyledLink to="/" onClick={onClickLogoImage}>
          <KOINLogoImage />
        </StyledLink>
        <MenuWrapper>
          {!searchBar &&
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
                  {categories.map(category => (
                    category.title === menu && category.submenu.map((sub, index) => (
                      <MenuItem
                        index={index}
                        key={index}>
                        <MenuItemLink to={sub.link}>
                          {sub.title}
                          {sub.newFlag && <NewMenuTag>N</NewMenuTag>}
                        </MenuItemLink>
                      </MenuItem>
                    ))
                  ))}
                </MegaMenuPanelContent>
              </MegaMenuContainer>
            </MegaMenuPanelContainer>
          </MegaMenu>}
        </MenuWrapper>
        <AuthButtonGroup>
        {!token ? (
          <>
            <Link to="/signup">
              <AuthLinkButton>
                회원가입
              </AuthLinkButton>
            </Link>
            <Link to="/login">
              <AuthLinkButton>
                  로그인
              </AuthLinkButton>
            </Link>
          </>
        ) :(
          <>
            <Link to="/modifyinfo">
              <AuthLinkButton>
                정보수정
              </AuthLinkButton>
            </Link>
            <AuthLinkButton onClick={onLogout}>
              로그아웃
            </AuthLinkButton>
          </>
        )}
        </AuthButtonGroup>
      </Row>
      <MobileRow isMain={path === '/'}>
        {path !== '/' && (
          <MenuIcon
            src="https://static.koreatech.in/assets/img/back-menu.png"
            onClick={() => history.goBack()}
          />
        )}
        <Title isMain={path === '/'}>
          {path === '/' && !mobileMenu && <KOINLogoImage />}
          {path !== '/' && !mobileMenu && getTitle()}
        </Title>
        <RouteIcon
          isMain={path === '/'}
          src={"https://static.koreatech.in/assets/img/menu.png"}
          onClick={() => { setMobileMenu(true); onClickFooterMenu(1); }}
        />
      </MobileRow>
      <MobileTopnav
        mobileMenu={mobileMenu}
        token={token}
        userInfo={userInfo}
        categories={categories}
        onLogout={onLogout}
        setMobileMenu={setMobileMenu}
        onClickFooterMenu={onClickFooterMenu}
      />
    </Container>
  )
})
