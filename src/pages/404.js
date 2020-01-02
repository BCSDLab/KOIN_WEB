import React from "react";
import styled from 'styled-components'

export default function page404({history}) {
  return (
    <Container>
      <img src="https://static.koreatech.in/assets/img/ic-404.png" alt="404"/>
      <h1>페이지를 찾을 수 없습니다!</h1>
      <h2>
        지금 입력하신 주소의 페이지는 존재하지 않습니다.<br/>
        주소를 다시 한번 확인해주세요.
      </h2>
      <button onClick={() => {history.push('/')}}>
        홈으로
      </button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
  min-height: 800px;
  width: 100%;
  
  img {
    height: 104px;
    margin-bottom: 42px;
  }

  h1 {
    font-size: 26px;
    font-weight: normal;
    line-height: 1.15;
    letter-spacing: normal;
    text-align: center;
    color: #f7941e;
    margin-bottom: 22px;
  }

  h2 {
    font-size: 18px;
    font-weight: normal;
    line-height: 1.56;
    letter-spacing: normal;
    text-align: center;
    color: #818181;
    margin-bottom: 60px;
  }

  button {
    width: 78px;
    height: 33px;
    font-size: 13px;
    font-weight: normal;
    line-height: 2.15;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
    background-color: #175c8e;
    cursor: pointer;
  }

  @media (max-width: 576px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 187px);
    min-height: 486px;
    
    img {
      height: 69px;
      margin-bottom: 34px;
    }
    h1 {
      font-size: 22px;
      font-weight: normal;
      line-height: 1.18;
      letter-spacing: normal;
      text-align: center;
      color: #f7941e;
      margin-bottom: 20px;
    }

    h2 {
      font-size: 15px;
      font-weight: normal;
      line-height: 1.53;
      letter-spacing: normal;
      text-align: center;
      color: #818181;
      margin-bottom: 49px;
    }

    button {
      width: 73px;
      height: 33px;
      font-size: 13px;
      font-weight: normal;
      line-height: 1.15;
      letter-spacing: normal;
      text-align: center;
      color: #ffffff;
      background-color: #175c8e;
      border-radius: 0;
      margin-top: 0;
      cursor: pointer;
    }
`;
