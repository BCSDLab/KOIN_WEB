import React, {useState, useEffect} from "react";
import styled from "styled-components";

const PaginationContainer = styled.div`
  background: #ffffff;
  color: #858585;
  width: 100%;
  @media (max-width: 576px) {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
  }
`;

const ArrowButton = styled.button`
  border-radius: 0;
  padding: 7px 14px;
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
    padding: 7px 10px;
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

export default function Pagination({
  totalPageNum,
  setPageData,
  isWriteBtn,
  writeBtnLink,
  path,
  isMyItems,
  history
}) {
  const limit = 5;
  const [nowPageNum,setNowPageNum] = useState(1);

  const clickPrevButton = () => {
    if (nowPageNum === 1) {
      alert("첫 페이지입니다.");
    } else {
      switch (path) {
        case 'lost':
          sessionStorage.setItem("lpn", JSON.stringify(nowPageNum - 1));
          break;
        case 'buy':
        case 'sell':
          let marketPageNum = JSON.parse(sessionStorage.getItem("mpn"));
          marketPageNum[path] = nowPageNum - 1;
          sessionStorage.setItem("mpn", JSON.stringify(marketPageNum));
          break;
        case 'search':
          break;
        default:
          let boardPageNum = JSON.parse(sessionStorage.getItem("bpn"));
          boardPageNum[path] = nowPageNum - 1;
          sessionStorage.setItem("bpn", JSON.stringify(boardPageNum));
          break;
      }
      setPage(nowPageNum - 1);
      
    }
  };

  const clickNextButton = () => {
    if (nowPageNum === totalPageNum) {
      alert("마지막 페이지입니다.");
    } else {
      switch (path) {
        case 'lost':
          sessionStorage.setItem("lpn", JSON.stringify(nowPageNum + 1));
          break;
        case 'buy':
        case 'sell':
          let marketPageNum = JSON.parse(sessionStorage.getItem("mpn"));
          marketPageNum[path] = nowPageNum + 1;
          sessionStorage.setItem("mpn", JSON.stringify(marketPageNum));
          break;
        case 'search':
          break;
        default:
          let boardPageNum = JSON.parse(sessionStorage.getItem("bpn"));
          boardPageNum[path] = nowPageNum + 1;
          sessionStorage.setItem("bpn", JSON.stringify(boardPageNum));
          break;
      }
      setPage(nowPageNum + 1);
    }
  };

  const clickPageNum = (n) => () => {
    setPage(n)
    switch (path) {
      case 'lost':
        sessionStorage.setItem("lpn", JSON.stringify(n));
        break;
      case 'buy':
      case 'sell':
        let marketPageNum = JSON.parse(sessionStorage.getItem("mpn"));
        marketPageNum[path] = n;
        sessionStorage.setItem("mpn", JSON.stringify(marketPageNum));
        break;
      case 'search':
        break;
      default:
        let boardPageNum = JSON.parse(sessionStorage.getItem("bpn"));
        boardPageNum[path] = n;
        sessionStorage.setItem("bpn", JSON.stringify(boardPageNum));
        break;
    }
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

  const onClickRegisterButton = () => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const boardId = JSON.parse(sessionStorage.getItem("boardId"));
    switch(path) {
      case 'lost':
      case 'buy':
      case 'sell':
        if (!userInfo.nickname) {
          alert("닉네임이 필요합니다.")
          history.push('/modifyinfo')
        } else {
          history.push(writeBtnLink);
        }
        break;
      default:
        if (boardId === -1) {
          history.push(writeBtnLink);
        } else if (boardId === 6) {
          if (userInfo.identity !== 5) {
            alert("점주만이 홍보게시물을 작성할 수 있습니다.");
            return;
          } else {
            history.push(writeBtnLink);
          }
        } else {
          if (!userInfo.nickname) {
            alert("닉네임이 필요합니다.");
            history.push('/modifyinfo');
          } else {
            history.push(writeBtnLink);
          }
        }
    }
  }

  useEffect(() => {
    // 세션에 페이지 데이터가 없다면 페이지 1 있다면 세션에서 받아와서 초기화.
    switch (path) {
      case 'lost':
        if (!sessionStorage.getItem("lpn")) {
          setNowPageNum(1);
        } else {
          const lostPageNum = JSON.parse(sessionStorage.getItem("lpn"));
          setNowPageNum(lostPageNum);
        }
        break;
      case 'buy':
      case 'sell':
        if (!sessionStorage.getItem("mpn")) {
          setNowPageNum(1);
        } else {
          const marketPageNum = JSON.parse(sessionStorage.getItem("mpn"));
          setNowPageNum(marketPageNum[path]);
        }
        break;
      case 'search':
        setNowPageNum(1);
        break;
      default:
        if (!sessionStorage.getItem("bpn")) {
          setNowPageNum(1);
        } else {
          const boardPageNum = JSON.parse(sessionStorage.getItem("bpn"));
          setNowPageNum(boardPageNum[path]);
        }
        break;
    }
  }, [path]); 

  useEffect(() => {
    if (isMyItems) {
      setNowPageNum(1);
    }
  }, [isMyItems]);
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
        isWriteBtn &&
        <WriteBtn onClick={onClickRegisterButton}>
          글쓰기
        </WriteBtn>
      }
    </div>
  )
}
