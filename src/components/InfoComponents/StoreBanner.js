import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";

const StoreBannerWrapper = styled(Link)`
  display: block;
  text-decoration: none;
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
    width: ${props => props.expand ? '100%' : 'calc(100% - 32px)'};
    margin: 0 auto;
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
  promotionData,
  expand
}) {
  const startDate = new Date(promotionData.start_date);
  const endDate = new Date(promotionData.end_date);
  const startMonth = startDate.getMonth() + 1;
  const endMonth = endDate.getMonth() + 1;
  const period = `${startMonth}월 ${startDate.getDate()}일 ~ ` +
    ( startMonth !== endMonth ? `${endMonth}월 ${endDate.getDate()}일` : `${endDate.getDate()}일`);

  return (
    <StoreBannerWrapper
      to={`/board/promotion/${promotionData.id}`}
      second={promotionData.second ? 1 : 0}
      expand={expand ? 1 : 0}>
      <StoreBannerTitle>{promotionData.title}</StoreBannerTitle>
      <StoreBannerSummary>{promotionData.event_title}</StoreBannerSummary>
      <StoreBannerDate><span>기간 :</span>{period}</StoreBannerDate>
    </StoreBannerWrapper>
  )
}