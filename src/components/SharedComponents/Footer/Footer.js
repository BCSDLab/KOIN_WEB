import React from "react";
import styled from "styled-components";
import * as CATEGORY from "../../../static/category";
import "./Footer.css"
import {Link} from "react-router-dom";

export default function Footer() {
  const category = CATEGORY.default;

  const clickMenu = (menu) => {
    if (menu.tag !== null) {
      sessionStorage.setItem("nowBoardPageNum", 1);
      sessionStorage.setItem("nowBoardId", menu.tag);
    } else {
      if (menu.planFlag === false && menu.title !== null) {
        if (menu.link === 'market/sell')
          sessionStorage.setItem("nowMarketId", 0);
        else sessionStorage.setItem("nowMarketId", 1);
        sessionStorage.setItem("nowMarketPageNum", 1);
      } else {
        alert("서비스 준비중 입니다.");
      }
    }
  };

  return (
    <Container>
      <div className="footer">
        <div className="footer__nav">
          {category.map((section, index) => {
            return (
              <div
                key={index}
                className="footer__nav-section">
                <SectionTitle className="footer__nav-section-title">
                  {section.title}
                </SectionTitle>
                <div className="footer__nav-link">
                  {section.submenu.map((menu, idx) => {
                    return (
                      <Link
                        key={idx}
                        to={'/' + menu.link}
                        className="nav-link"
                        onClick={() => clickMenu(menu)}>
                        {menu.title}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
        <div className="footer__link">
          <div className="footer__logo__container">
            <Link to='/'>
              <img
                src="https://static.koreatech.in/assets/img/logo_white.png"
                className="footer__logo"/>
            </Link>
          </div>
          <div className="footer__link-button-list">
            <button
              className="link-button"
              onClick={() => window.location = 'https://bcsdlab.com'}>
              BCSD Lab 바로가기
            </button>
            <button
              className="link-button"
              onClick={() => window.location = 'https://koreatech.ac.kr'}>
              코리아텍 바로가기
            </button>
            <button
              className="link-button"
              onClick={() => window.location = 'https://portal.koreatech.ac.kr'}>
              아우누리 바로가기
            </button>
            <Link
              to={'/privacy-policy'}
              className="link-button">
              개인정보 처리방침
            </Link>
          </div>
          <div>
            <img
              className="footer__link__facebook"
              onClick={() => window.location = 'https://www.facebook.com/koreatech.in/'}
              src="https://static.koreatech.in/upload/fead6221d535ff547d4801081ee8f2e3.png"
              alt="FaceBook"/>
            <Link to='/'>
              <img
                className="footer__link__home"
                src="https://static.koreatech.in/upload/1aae9a021f0338527c28e5c3d0518fa1.png"
                alt="Home"/>
            </Link>
          </div>
        </div>
        <div className="footer__copyright">
          COPYRIGHT ⓒ {new Date().getFullYear()} BY BCSDLab ALL RIGHTS RESERVED.
        </div>
      </div>

      <div className="mobile-footer">
        <div className="mobile-footer__link">
        <span
          className="link-text"
          onClick={() => window.location = 'https://koreatech.ac.kr'}>
            코리아텍 바로가기
        </span>
          &nbsp; | &nbsp;
          <span
            className="link-text"
            onClick={() => window.location = 'https://portal.koreatech.ac.kr'}>
            아우누리 바로가기
        </span>
        </div>
        <div className="mobile-footer__link">
            <span
              className="link-text"
              onClick={() => window.location = 'https://bcsdlab.com'}>
              BCSD Lab 바로가기
            </span>
          &nbsp; | &nbsp;
          <Link to='/privacy-policy'>
              <span
                style={{color: "#c9c9c9"}}
                className="link-text">
                개인정보 처리방침
              </span>
          </Link>
        </div>
        <div className="mobile-footer__link">
          <Link to='/'>
            <img
              src="https://static.koreatech.in/assets/img/logo_white.png"
              className="mobile-footer__logo"
              alt="logo"/>
          </Link>
          <span className="mobile-footer__copyright">
              COPYRIGHT © {new Date().getFullYear()} BCSD LAB ALL RIGHTS RESERVED.
            </span>
          <img
            className="mobile-footer__link__facebook"
            onClick={() => window.location = 'https://www.facebook.com/koreatech.in/'}
            src="https://static.koreatech.in/upload/fead6221d535ff547d4801081ee8f2e3.png"
            alt="Facebook"/>
          <Link to='/'>
            <img
              className="mobile-footer__link__home"
              src="https://static.koreatech.in/upload/1aae9a021f0338527c28e5c3d0518fa1.png"
              alt="Home"/>
          </Link>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
width: 100%;
background-color: #3e3e3e;
color: white;
display: table;
position: relative;
bottom: 0;
font-size: 13px;
height: 288px;
vertical-align: middle;

@media (max-width: 576px) {
  height: 110px;
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
