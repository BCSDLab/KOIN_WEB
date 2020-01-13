import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border-top: #f7941e 5px solid;
  width: 100%;
`;

const LookUp = styled.div`
  width: 1131px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 63px;
`;

const Title = styled.div`
  text-align: left;
  letter-spacing: -1.5px;
  font-size: 30px;
  color: #175c8e;
  font-family: NanumSquare, serif;
  font-weight: 800;
  margin-bottom: 27px;
`;

const Desc = styled.div`
  text-align: left;
  letter-spacing: -1.2px;
  font-size: 24px;
  color: black;
  width: 55%;
  font-weight: 300;
  float: left;
`;

const SelectForm = styled.div`
  width: 45%;
  text-align: right;
  //position: relative;
  //bottom: 4px;
  float: right;
  font-size: 24px;
`;

const DropDownContentsContainer = styled.div`
  display: none;
  position: absolute;
  background-color: #ffffff;
  width: 120px;
  left: -10px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
  font-size: 14px;
`;

const DropDown = styled.div`
  position: relative;
  display: inline-block;
  width: 99px;
  justify-content: center;
  
  &:hover ${DropDownContentsContainer}{
    display: block;
  }
`;

const DropDownBtn = styled.button`
  background-color: #ffffff;
  color: black;
  top: 1px;
  position: relative;
  border: none;
  cursor: pointer;
  width: 99px;
  font-size: 24px;
  font-weight: 700;
  display: contents;
`;

const ArrowImg = styled.img.attrs({
  src: "https://static.koreatech.in/assets/img/bus_dropdown.png"
})`
  width: 15px;
  margin: 0 5px 2px 5px;
`;

const DropDownContent = styled.a`
  color: black;
  padding: 10px 10px;
  text-decoration: none;
  display: block;
  border: 1px #d0d0d0 solid;
  text-align: center;
  border-collapse: collapse;
  margin-top: -1px;
  cursor: pointer;
`;


export default function BusLookUp(
  {
    departList,
    arrivalList,
    selectDepart,
    selectArrival
  }
) {
  return (
    <Container>
      <LookUp>
        <Title>
          버스 / 교통 운행정보
        </Title>
        <Desc>
          어디를 가시나요?
        </Desc>
        <div>
          <Desc>
            운행수단별로 간단히 비교해드립니다.
          </Desc>
          <SelectForm>
            <DropDown>
              <DropDownBtn>
                {departList[0]}
                <ArrowImg/>
              </DropDownBtn>
              <DropDownContentsContainer>
                <DropDownContent onClick={() => selectDepart(departList[1])}>
                  {departList[1]}
                </DropDownContent>
                <DropDownContent onClick={() => selectDepart(departList[2])}>
                  {departList[2]}
                </DropDownContent>
              </DropDownContentsContainer>
            </DropDown>

            <span>에서</span>

            <DropDown>
              <DropDownBtn>
                {arrivalList[0]}
                <ArrowImg/>
              </DropDownBtn>
              <DropDownContentsContainer>
                <DropDownContent onClick={() => selectArrival(arrivalList[1])}>
                  {arrivalList[1]}
                </DropDownContent>
                <DropDownContent onClick={() => selectArrival(arrivalList[2])}>
                  {arrivalList[2]}
                </DropDownContent>
              </DropDownContentsContainer>
            </DropDown> 갑니다
          </SelectForm>
        </div>


      </LookUp>
    </Container>
  )
}
