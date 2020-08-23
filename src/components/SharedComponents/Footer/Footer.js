import React from "react";
import styled from "styled-components";
import * as CATEGORY from "../../../static/category";
import {Link} from "react-router-dom";

const FooterNavSection = styled.div`
  height: 130px;
  box-sizing: border-box;
`;

const FooterNavLink = styled.div`
  border-right: 1px solid #666666;
  width: auto;
  height: 89px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

const NavLink = styled.div`
  font-family: NanumSquareR,sans-serif;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.7;
  letter-spacing: .8px;
  text-align: left;
  color: #9fa9b3;
  cursor: pointer;
  margin-right: ${props => props.isRight ? "0" : '39px'};
`;

const FooterNav = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 65px 36px auto;
  
  ${FooterNavSection}:first-child {
    width: 200px;
    
    ${FooterNavLink} {
      padding-right: 74.5px;
    }
  }
  ${FooterNavSection}:nth-child(2) {
    padding: 0 0 0 51px;
    
    ${FooterNavLink} {
      width: 150px;
      padding-right: 51px;
    }
    
    ${NavLink} {
      margin-right: 32px;
    }
  }
  ${FooterNavSection}:last-child {
    padding-left: 51px;
    padding-right: 0;
    border: none;
    
    ${FooterNavLink} {
      width: 75px;
      border-right: none;
    }
    
    ${NavLink} {
      margin-right: 0;
    }
  }
`;

const Container = styled.footer`
  width: 100%;
  background-color: #3e3e3e;
  color: white;
  position: relative;
  font-size: 13px;
  height: 288px;
  vertical-align: middle;
  display: ${props => {
    switch(props.path) {
      case '/login':
      case '/signup':
      case '/modifyinfo':
      case '/findpw':
      case '/timetable':
        return 'none';
      default:
        return 'table';
    }
  }};

  div .hidden {
    -webkit-animation: slide-down .5s ease-in;
    -moz-animation: slide-down .5s ease-in;
    animation-fill-mode: forwards;
    display: none;
  }
  
  a {
    color: white;
    cursor: hand;
  }
  
  a:hover, a:visited, a:active, a:link {
    text-decoration: none;
  }

  @media (max-width: 576px) {
    height: 110px;
   }
   
   @-webkit-keyframes slide-down {
    100% {
      opacity: 0;
      visibility: hidden;
      -webkit-transform: translateY(100%);
    }
    0% {
      opacity: 1;
      visibility: visible;
      -webkit-transform: translateY(0);
    }
  }

  @-moz-keyframes slide-down {
    100% {
      opacity: 0;
      visibility: hidden;
      -moz-transform: translateY(100%);
    }
    0% {
      opacity: 1;
      visibility: visible;
      -moz-transform: translateY(0);
    }
  }
`;

const PcFooter = styled.div`
  width: 1132px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 29px;
  padding-bottom: 30px;
  
  @media (max-width: 576px) {
    display: none;
  }
`;

const SectionTitle = styled.div`
  font-family: "NanumSquare",sans-serif;
  font-size: 15px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -.3px;
  text-align: left;
  color: #ffffff;
  margin-bottom: 24px;
`;

const FooterLinkFacebook = styled.img.attrs({
  src: "https://static.koreatech.in/upload/fead6221d535ff547d4801081ee8f2e3.png"
})`
  width: 14px;
  margin-right: 30px;
  cursor: pointer;
`

const FooterLinkHome = styled.img.attrs({
  src: "https://static.koreatech.in/upload/1aae9a021f0338527c28e5c3d0518fa1.png"
})`
  width: 25px;
  cursor: pointer;
`

const FooterLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const FooterLogoContainer = styled.div`
  height: 100%;
  text-align: left;
  margin-right: 79px;
`;

const FooterLogo = styled.img.attrs({
  src: "https://static.koreatech.in/assets/img/logo_white.png"
})`
  width: 72.4px;
  height: 40px;
  cursor: pointer;
`;

const FooterLinkButtonList = styled.div`
  display: flex;
  margin-right: 59px;
`;

const LinkButton = styled.button`
  height: 30px;
  box-sizing: border-box;
  border-radius: 28px;
  font-family: NanumSquare,sans-serif;
  border: solid 1px #9fa9b3;
  font-size: 15px;
  font-weight: normal;
  letter-spacing: -0.1px;
  text-align: center;
  color: #c9c9c9;
  padding: 6.5px 15px;
  background-color: transparent;
  margin-right: 25px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterCopyRight = styled.div`
  font-family: NanumSquareR,sans-serif;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.08;
  letter-spacing: 0.15px;
  text-align: center;
  color: #b5b5b5;
`;

const MobileFooter = styled.div`
  display: none;
  
  @media (max-width: 576px) {
    display: block;
    padding: 21px 16px 18px 16px;
  }
`;

const MobileFooterLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: NanumSquareR,sans-serif;
  font-size: 10px;
  font-weight: normal;
  line-height: 1.2;
  letter-spacing: normal;
  color: #c9c9c9;

  ${props => {
  switch (props.sequence) {
    case 0 : {
      return 'margin-bottom: 10px;'
    }
    case 1 : {
      return 'margin-bottom: 13px; margin-right: 6px;'
    }
    default : {
      return null
    }
  }
}
}
`;

const MobileFooterLogo = styled.img.attrs({
  src : "https://static.koreatech.in/assets/img/logo_white.png"
})`
  width: 35px;
  margin-right: 20px;
`;

const MobileFooterCopyright = styled.span`
  font-family: NanumSquareR,sans-serif;
  font-size: 9px;
  font-weight: normal;
  line-height: 1.11;
  letter-spacing: -.57px;
  text-align: left;
  color: #7d7d7d;
  margin-right: 17px;
`;

const MobileFooterLinkFacebook = styled.img.attrs({
  src : "https://static.koreatech.in/upload/fead6221d535ff547d4801081ee8f2e3.png"
})`
  width: 9px;
  margin-right: 16px;
`;

const MobileFooterLinkHome = styled.img.attrs({
  src : "https://static.koreatech.in/upload/1aae9a021f0338527c28e5c3d0518fa1.png"
})`
  width: 15px;
`;

export default function Footer({ path }) {
  const category = CATEGORY.default;

  const clickMenu = (menu) => {
    if (menu.tag === null || menu.planFlag === false || menu.title === null) {
      alert("서비스 준비중 입니다.");
      sessionStorage.setItem("boardPageNum", 1);
    }
  };

  return (
    <Container path={path}>
      <PcFooter>
        <FooterNav>
          {category.map((section, index) => {
            return (
              <FooterNavSection
                sequence={index}
                key={index}>
                <SectionTitle>
                  {section.title}
                </SectionTitle>
                <FooterNavLink>
                  {section.submenu.map((menu, idx) => {
                    return (
                      <Link
                        key={idx}
                        to={menu.link}
                        onClick={() => clickMenu(menu)}>
                        <NavLink>
                          {menu.title}
                        </NavLink>
                      </Link>
                    )
                  })}
                </FooterNavLink>
              </FooterNavSection>
            )
          })}
        </FooterNav>
        <FooterLink>
          <FooterLogoContainer>
            <Link to='/'>
              <FooterLogo/>
            </Link>
          </FooterLogoContainer>
          <FooterLinkButtonList>
            <LinkButton
              onClick={() => window.open('https://bcsdlab.com')}>
              BCSD Lab 바로가기
            </LinkButton>
            <LinkButton
              onClick={() => window.open('https://koreatech.ac.kr')}>
              코리아텍 바로가기
            </LinkButton>
            <LinkButton
              onClick={() => window.open('https://portal.koreatech.ac.kr')}>
              아우누리 바로가기
            </LinkButton>
            <LinkButton>
              <Link
                style={{color: '#C9C9C9'}}
                to={'/privacy-policy'}>
                개인정보 처리방침
              </Link>
            </LinkButton>
          </FooterLinkButtonList>
          <div>
            <FooterLinkFacebook onClick={() => window.open('https://www.facebook.com/koreatech.in/')}/>
            <Link to='/'>
              <FooterLinkHome/>
            </Link>
          </div>
        </FooterLink>
        <FooterCopyRight>
          COPYRIGHT ⓒ {new Date().getFullYear()} BY BCSDLab ALL RIGHTS RESERVED.
        </FooterCopyRight>
      </PcFooter>

      <MobileFooter>
        <MobileFooterLink sequence={0}>
        <span onClick={() => window.open('https://koreatech.ac.kr')}>
            코리아텍 바로가기
        </span>
          &nbsp; | &nbsp;
          <span onClick={() => window.open('https://portal.koreatech.ac.kr')}>
            아우누리 바로가기
          </span>
        </MobileFooterLink>
        <MobileFooterLink sequence={1}>
          <span onClick={() => window.open('https://bcsdlab.com')}>
            BCSD Lab 바로가기
          </span>
          &nbsp; | &nbsp;
          <Link to='/privacy-policy'>
            <span style={{color: "#c9c9c9"}}>
              개인정보 처리방침
            </span>
          </Link>
        </MobileFooterLink>
        <MobileFooterLink sequence={2}>
          <Link to='/'>
            <MobileFooterLogo/>
          </Link>
          <MobileFooterCopyright>
            COPYRIGHT © {new Date().getFullYear()} BCSD LAB ALL RIGHTS RESERVED.
          </MobileFooterCopyright>
          <MobileFooterLinkFacebook onClick={() => window.open('https://www.facebook.com/koreatech.in/')}/>
          <Link to='/'>
            <MobileFooterLinkHome/>
          </Link>
        </MobileFooterLink>
      </MobileFooter>
    </Container>
  )
}
