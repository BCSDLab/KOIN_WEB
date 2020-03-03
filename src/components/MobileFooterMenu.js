import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 20;
  background: #ffffff;
  border-top: 1px solid #cccccc;
  height: 57px;
  display: none;

  @media (max-width: 576px) {
    display: flex;
  }
`;

const MenuButton = styled.div`
  flex: 1;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
`;

const LogoIcon = styled.img`
  width: 38px;
  margin-top: 8px;
`;

const MenuTitle = styled.div`
  font-size: 12px;
  color: ${props => props.selected ? '#175c8e' : 'initial'};
`;

export default function MobileFooterMenu({
  history,
  path,
  mobileMenu,
  setMobileMenu,
  onClickFooterMenu
}) {
  const onClickHomeBtn = path => {
    history.push(path);
    setMobileMenu(false);
    path === '/' ? onClickFooterMenu(0) : onClickFooterMenu(2);
  }

  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
    onClickFooterMenu(1);
  }
  
  return (
    <Container>
      <MenuButton onClick={() => onClickHomeBtn('/')}>
        <LogoIcon 
          src={
            path !== '/' || mobileMenu
              ? "https://static.koreatech.in/assets/img/footer-home.png"
              : "https://static.koreatech.in/assets/img/footer-home-on.png"
          }
        />
        <MenuTitle selected={path === '/' && !mobileMenu}>홈</MenuTitle>
      </MenuButton>
      <MenuButton onClick={toggleMobileMenu}>
        <LogoIcon
          src={
            !mobileMenu ? "https://static.koreatech.in/assets/img/footer-category.png" : "https://static.koreatech.in/assets/img/footer-category-on.png"
          }
        />
        <MenuTitle selected={mobileMenu}>카테고리</MenuTitle>
      </MenuButton>
      <MenuButton onClick={() => onClickHomeBtn('/search')}>
        <LogoIcon 
          src={
            path !== '/search' || mobileMenu
              ? "https://static.koreatech.in/assets/img/ic-search-menu@3x.png"
              : "https://static.koreatech.in/assets/img/ic-search-menu-on%403x.png"
          }
        />
        <MenuTitle selected={path === '/search' && !mobileMenu}>검색</MenuTitle>
      </MenuButton>
    </Container>
  )
}
