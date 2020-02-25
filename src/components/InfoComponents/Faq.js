import React from 'react'
import styled from "styled-components";

const Container = styled.div`
  border-top: #f7941e 5px solid;
  width:100%;
  
    @media (max-width: 576px) {
      border-top: none;
    }
`;

const Faqs = styled.div`
  width: 1132px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 64px;
  
  @media (max-width: 576px) {
    width: calc(100% - 32px);
    min-width: 300px;
    margin: 30px auto auto auto;
  }
`;

const Title = styled.div`
  font-size: 30px;
  letter-spacing: -1.5px;
  float: left;
  font-family: NanumSquare, serif;
  font-weight: 800;
  color: #175c8e;
  height: 59px;
  width: 100%;
  text-align: left;
  
  @media (max-width: 576px) {
    height: 22px;
    font-size: 20px;
    margin-bottom: 20px;
    display: none;
  }
`;

const Desc = styled.div`
  float: left;
  text-align: left;
  font-weight: 300;
  letter-spacing: -1.2px;
  line-height: 1.25;
  font-size: 24px;
  height: 80px;
  margin-bottom: 12px;
  
  @media (max-width: 576px) {
    width: 100%;
    height: 45px;
    font-size: 18px;
    line-height: 1.39;
    letter-spacing: normal;
    margin-bottom: 0;
  }
`;

const AskButton = styled.button`
  float: right;
  display: block;
  position: relative;
  top: 15px;
  margin-top: 10px;
  background: #175c8e;
  padding: 9px 15px;
  letter-spacing: -0.6px;
  color: white;
  font-size: 12px;
  text-decoration: none;
  
  @media (max-width: 576px) {
    width: 73px;
    font-size: 13px;
    letter-spacing: normal;
    padding: 9px 0;
    top: 0;
    margin-top: 0;
    margin-bottom: 20px;
  }
`;

const TabContent = styled.div`
  max-height: 0;
  overflow: hidden;
  -webkit-transition: max-height .35s;
  -o-transition: max-height .35s;
  transition: max-height .35s;
  color: #858585;
  margin-left: 1px;
  border: 1px solid #cbcbcb;
  border-top: none;
  margin-top: -1px;
  width: 1132px;
  background: #e4e4e4;
  
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const Tab = styled.div`
  position: relative;
  width: 1132px;
  color: black;
  overflow: hidden;
  margin-bottom: 15px;
  text-align: left;
  display: table;
  border-collapse: collapse;
  
  input {
    height: 0;
    display: none;
    box-sizing: border-box;
    padding: 0;
    position: absolute;
    z-index: -1;
  }
  
  label {
    position: relative;
    display: block;
    padding: 5px 5px 5px 26px;
    line-height: 3;
    cursor: pointer;
    background: white;
    font-size: 15px;
    border: 1px solid #175c8e;
    color: #252525;
    letter-spacing: -0.8px;
    margin-left: 1px;
  }
  
  label::after {
    position: absolute;
    right: 0;
    top: 0;
    display: block;
    width: 3em;
    height: 3em;
    line-height: 3;
    text-align: center;
    -webkit-transition: all .35s;
    -o-transition: all .35s;
    transition: all .35s;
  }
  
  input:checked ~ ${TabContent} {
     max-height: 10em;
   }
   
  @media (max-width: 576px) {
    width: 100%;
    display: block;
    
    label {
      color: #175c8e;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 16px;
      line-height: 1.33;
    }
    
    label b {
      margin-right: 3px;
    }
  }
`;

const UnderArrow = styled.img.attrs({
  src: "https://static.koreatech.in/assets/img/bus_dropdown.png"
})`
  width: 15px;
  float: right;
  margin-right: 22px;
  margin-top: 17px;
  
  @media (max-width: 576px) {
    margin: 0 0 0 13px;
    width: 17px;
  }
`;

const P = styled.p`
  margin: 21px 26px 27px;
  text-align: left;
  float: left;
  letter-spacing: -0.8px;
  
  @media (max-width: 576px) {
    margin: 20px 16.5px;
    line-height: 1.38;
    font-size: 13px;
    letter-spacing: normal;
  }
`;

const Answer = styled.b`
  display: block;
  float: left;
  width: 17px;
  height: 30px;
  
  @media (max-width: 576px) {
    height: auto;
  }
`;

const Pagination = styled.div`
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

export default function Faq(
  {
    faqList,
    totalPageNum,
    nowPageNum,
    clickPrevButton,
    clickNextButton,
    clickPageNum
  }) {
  return (
    <Container>
      <Faqs>
        <Title>
          FAQ
        </Title>
        <Desc>
          아래 질문 외에 다른 궁금한 것이 있다면<br/>
          직접 질문해주세요.
        </Desc>
        <AskButton onClick={() => {
          window.location = "https://docs.google.com/forms/d/1pWoxCLm5YqTlcdiXThvyGlNu_7t5hojxgjH5FA8eypo/edit?usp=drive_web"
        }}>
          질문하기
        </AskButton>
        {faqList.map((faq, index) => {
          return (
            <Tab key={index}>
              <input
                type="radio"
                name="tabs"
                id={faq.id}/>
              <label
                htmlFor={faq.id}>
                <span>
                  <b>Q. </b>{faq.question}
                </span>
                <UnderArrow/>
              </label>
              <TabContent>
                <P><Answer>A. </Answer>{faq.answer}</P>
              </TabContent>
            </Tab>
          )
        })}
      </Faqs>
      <Pagination>
        <ArrowButton onClick={clickPrevButton}>이전으로
        </ArrowButton>
        {[...Array(totalPageNum)].map((n, index) => {
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
      </Pagination>
    </Container>
  )
}
