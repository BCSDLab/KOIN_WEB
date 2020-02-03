import React, {useCallback, useState} from "react";
import styled from "styled-components";
import {getLostItems} from "../../modules/lost";

const PaginationContainer = styled.div`
  margin-top: 35px;
  margin-bottom: 40px;
  background: #ffffff;
  color: #858585;
  
  @media (max-width: 576px) {
    display: flex;
    justify-content: center;
    margin-top: 36px;
    margin-bottom: 70px;
  }
`;

const ArrowButton = styled.button`
  border-radius: 0;
  padding: 7px 14px 7px 14px;
  margin-left: 6px;
  margin-right: 6px;
  background: #ffffff;
  border: 1px #edf0f3 solid;
  color: #858585;
  font-size: 13px;
  letter-spacing: -0.7px;
  cursor: pointer;
  
  &:hover {
    background-color: #175c8e;
    color: white;
  }
  
  @media (max-width: 576px) {
    width: 73px;
    height: 30px;
  }
`;

const Number = styled.button`
  border-radius: 0;
  padding: 7px 12px 7px 12px;
  margin-left: 1px;
  margin-right: 1px;
  border: 1px #edf0f3 solid;
  font-size: 13px;
  cursor: pointer;
  color: ${props => props.isNowPage ? 'white' : '#858585'};
  background-color: ${props => props.isNowPage ? '#175c8e' : '#ffffff'};
  
  &:hover {
    background-color: #175c8e;
    color: white;
  }
  
  @media (max-width: 576px) {
    margin: 0 2px;
  }
`;

export default function Pagination(
  {
    totalPageNum,
    setPageData
  }
){
  const limit = 5;
  const [nowPageNum,setNowPageNum] = useState(1);

  const clickPrevButton = () => {
    if (nowPageNum === 1) {
      alert("첫 페이지입니다.");
    } else setPage(nowPageNum - 1);
  };

  const clickNextButton = () => {
    if (nowPageNum === totalPageNum) {
      alert("마지막 페이지입니다.");
    } else setPage(nowPageNum + 1);
  };

  const clickPageNum = (n) => () => {
    setPage(n)
  };

  const displayCorrectionNum = () => {
    if(totalPageNum <= limit){
      return 0;
    }
    else {
      if (nowPageNum <= Math.ceil(limit/2)) {
        return 0;
      }
      else if (totalPageNum - nowPageNum <= Math.floor(limit/2)){
        return totalPageNum - limit
      }
      else {
        return nowPageNum - Math.ceil(limit/2);
      }
    }
  };

  const setPage = page => {
    setPageData(page);
    setNowPageNum(page);
  };

  return (
    <PaginationContainer>
      <ArrowButton onClick={clickPrevButton}>이전으로
      </ArrowButton>
      {limit < totalPageNum &&
        [...Array(limit)].map((n, index) => {
        return (
          <span key={index}>
              <Number
                onClick={clickPageNum(index + 1 + displayCorrectionNum())}
                isNowPage={(nowPageNum === index + 1 + displayCorrectionNum())}>
                {index + 1 + displayCorrectionNum()}
              </Number>
            </span>
        )
      })}
      {limit >= totalPageNum &&
      [...Array(totalPageNum)].map((n, index) => {
        return (
          <span key={index}>
              <Number
                onClick={clickPageNum(index + 1)}
                isNowPage={(nowPageNum === index + 1)}>
                {index + 1}
              </Number>
            </span>
        )
      })}
      <ArrowButton onClick={clickNextButton}>다음으로
      </ArrowButton>
    </PaginationContainer>
  )
}
