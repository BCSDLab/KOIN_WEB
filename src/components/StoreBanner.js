import React from 'react';
import styled, { css } from 'styled';
import { Link } from "react-router-dom";

const StoreBannerWrapper = styled(Link)`
  height: 91px;
  position: relative;
  background-color: #f7941e;
  transition: background-color .5s;
  font-family: NanumBarunGothic;
  color: white;
  text-align: center;
  cursor: pointer;
  
  ${
    props => props.second && css`
      background-color: #4db297;
  `};
  
  @media (max-width: 576px) {
    margin: 16px 0;
    height: 106px;
  }
`;

const StoreBannerTitle = styled.div`
  padding-top: 22px;
  font-size: 20px;
  font-weight: bold;
  line-height: 1.15;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  @media (max-width: 576px) {
    padding-top: 14px;
    font-size: 16px;
    line-height: 1.19;
  }
`;

const StoreBannerSummary = styled.div`
  padding-top: 10px;
  font-size: 12px;
  line-height: 1.17;
  
  @media (max-width: 576px) {
    padding-top: 11px;
    font-size: 13px;
    line-height: 1.46;
  }
`;

const StoreBannerDate = styled.div`
  position: absolute;
  font-size: 11px;
  line-height: 1.09;
  bottom: 11px;
  right: 15px;
  
  & span {
    color: #fbff9f;
  }
  
  @media (max-width: 576px) {
    font-size: 9px;
    font-weight: 200;
    line-height: 1.22;
    right: 10px;
    bottom: 8px;
  }
`;

export default function StoreBanner ({
  to,
  title,
  child,
  period
}) {
  const second = Math.random() >= 0.5;

  return (
    <StoreBannerWrapper
      second={second}
      to={to}>
      <StoreBannerTitle>{title}</StoreBannerTitle>
      <StoreBannerSummary>{child}</StoreBannerSummary>
      <StoreBannerDate><span>기간 :</span></StoreBannerDate>
    </StoreBannerWrapper>
  )
}