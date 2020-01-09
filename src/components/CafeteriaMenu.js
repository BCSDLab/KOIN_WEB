import React, {useEffect} from "react";
import styled from "styled-components"

const Container = styled.div`
  border-top: #f7941e 5px solid;
  width: 100%;
`;

const CafeteriaContainer = styled.div`
  margin: 63px auto 23px auto;
  width: 1132px;
`;

const Title = styled.div`
  width: auto;
  height: 29px;
  font-family: NanumSquare, serif;
  font-size: 30px;
  font-weight: 800;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -1.5px;
  text-align: left;
  color: #175c8e;
`;

const DateSelector = styled.div`
  margin-top: 22px;
  margin-bottom: -4px;
`;

const ArrowBtnImg = styled.img`
  width: 11px;
  height: 16px;
  font-size: 24px;
  object-fit: contain;
  cursor: pointer;
`;

const Date = styled.span`
  height: 22px;
  font-family: sans-serif;
  font-size: 24px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -1.2px;
  text-align: center;
  color: #252525;
  margin: 0 26px;
`;

export default function CafeteriaMenu (
  {
    date,
    clickPrev,
    clickNext,
  }) {
  return (
    <Container>
      <CafeteriaContainer>
        <Title>
          오늘의 식단
        </Title>
        <DateSelector>
          <ArrowBtnImg
            onClick={clickPrev}
            src="https://static.koreatech.in/upload/3694a4611fadea308631f50b8f825bf5.png"/>
          <Date>
            {date.slice(0,4)}년 {date.slice(5,7)}월 {date.slice(8,10)}일
          </Date>
          <ArrowBtnImg
            onClick={clickNext}
            src="https://static.koreatech.in/upload/283d4f6aac521b58705fda13918b3a2a.png"/>

        </DateSelector>


      </CafeteriaContainer>
    </Container>
  )
}
