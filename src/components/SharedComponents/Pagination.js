import React, {useCallback, useState} from "react";
import styled from "styled-components";
import {getLostItems} from "../../modules/lost";
import {Link} from "react-router-dom";

const PaginationContainer = styled.div`
  background: #ffffff;
  color: #858585;
  width: 100%;
  @media (max-width: 576px) {
    display: flex;
    justify-content: center;
  }
`;

const ArrowButton = styled.button`
  border-radius: 0;
  padding: 7px 14px 7px 14px;
  margin-left: 8px;
  margin-right: 8px;
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

const WriteBtn = styled.button`
  float: right;
  padding: 6px 20px;
  color: white;
  background-color: #175c8e;
  font-size: 13px;
  cursor: pointer;
  letter-spacing: -0.7px;
  border: 1px solid #175c8e;
  margin-top: -33px;
  
  @media(max-width: 576px){
    display: none;
  }
`;

export default function Pagination(
  {
    totalPageNum,
    setPageData,
    isWriteBtn,
    writeBtnLink
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
    <div>
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
      {
        isWriteBtn === true &&
        <Link to={writeBtnLink}>
          <WriteBtn>
            글쓰기
          </WriteBtn>
        </Link>
      }
    </div>
  )
}
