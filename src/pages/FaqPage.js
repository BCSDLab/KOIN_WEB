import React from 'react'
import styled from "styled-components";

const Container = styled.div`
  border-top: #f7941e 5px solid;
  width:100%;
`;

const Faq = styled.div`
  width: 1132px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 64px;
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
`;


export default function FaqPage() {
  return (
    <Container>
      <Faq>
        <Title>
          FAQ
        </Title>
        <Desc>
          아래 질문 외에 다른 궁금한 것이 있다면<br/>
          직접 질문해주세요.
        </Desc>
        <AskButton onClick={() => {window.location = "https://docs.google.com/forms/d/1pWoxCLm5YqTlcdiXThvyGlNu_7t5hojxgjH5FA8eypo/edit?usp=drive_web"}}>
          질문하기
        </AskButton>

      </Faq>
    </Container>
  )
}
