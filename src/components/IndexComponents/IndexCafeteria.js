import React, {Fragment} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

const Container = styled.section`
  @media(max-width: 576px){
    margin-top: 33px;
    max-width: 100%;
  }
`;

const Title = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-family: NanumSquare;
  font-weight: 800;
  font-size: 17px;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.15;
  letter-spacing: normal;
  text-align: left;
  color: #175c8e;
  margin: 0;
  
  @media(max-width: 576px){
    font-size: 15px;
    padding-left: 3px;
  }
`;

const MoreLink = styled(Link)`
  font-family: NanumBarunGothic;
  font-size: 12px;
  font-weight: normal;
  color: #252525;
  text-decoration: none;
  cursor: pointer;
  
  ::after {
    display: inline-block;
    width: 12px;
    height: 8px;
    background: url("https://static.koreatech.in/assets/img/bus_dropdown.png") center/12px 8px no-repeat;
    transform: rotate(-90deg);
    content: "";
  }
  
  @media(max-width: 576px){
    display: none;
  }
`;

const CafeteriaCard = styled.div`
  display: grid;
  grid-template: 26px 159px/27px 1fr;
  width: 256px;
  height: 203px;
  margin-top: 16px;
  padding: 15px 12px 0 12px;
  border: solid 1px #e4e4e4;
  box-sizing: border-box;
  
  @media(max-width: 576px){
    grid-template: 27px 156px/ 1fr 28px;
    max-width: 100%;
    width: 544px;
    padding: 11px 15px 0 17px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
    border: solid 1px rgba(216, 216, 216, 0);
    background-image: linear-gradient(to top, #ffffff, rgba(255, 255, 255, 0)), linear-gradient(to bottom, #ffffff, #ffffff);
  }
`;

const CafeteriaContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-row: 1 / 3;
  width: 27px;
  height: 100%;
  
  @media(max-width: 576px){
    flex-direction: row;
    align-items: center;
    grid-row: 1 / 2;
    width: 100%;
  }
`

const Cafeteria = styled.div`
  margin-bottom: 24px;
  width: 26px;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: center;
  color: ${props => props.selected ? "#175c8e" :"#bbbbbb"};
  cursor: pointer;
  
  @media(max-width: 576px) {
    margin-right: 16px;
    margin-bottom: 0;
  }
`;

const TypeContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Type = styled.div`
  font-family: NanumSquare;
  font-size: 14px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 26px;
  color: #000000;
  letter-spacing: normal;
  text-align: center;
  
  @media(max-width: 576px) {
    font-size: 13px;  
  }
`;

const TypeControlButton = styled.button`
  width: 26px;
  height: 26px;
  margin: 0 8px;
  padding: 0;
  border: 0;
  background: url("https://static.koreatech.in/assets/img/ic-more.png") center/26px 26px no-repeat;
  transform: ${props => props.direction === 'left' ? 'rotate(180deg)' : 'none'};
  cursor: pointer;
  
  @media(max-width: 576px) {
    display: none;
  }
`

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
  padding: 15px 0 0 19px;
  
  @media(max-width: 576px){
    grid-column: 1 / 3;
    padding: 27px 0 0 19px;
  }
`;

const Menu = styled.div`
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: normal;
  color: #252525;
  text-align: left;
  margin-bottom: 14px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 75px;
  
  @media(max-width: 576px){
    margin-bottom: 10px;
    width: 78px;
  }
`;


const NoMenu = styled.div`
  height: 18px;
  font-family: "NanumBarunGothic", serif;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: normal;
  color: #9fa9b3;
  text-align: center;
  margin: 27px 0 0 -15px;
  
  @media(max-width: 576px){
    margin: 27px 0 0 -19px;
  }
`

export default React.memo(function IndexCafeteria({
  history,
  cafeteriaList,
  selected,
  setSelected,
  type,
  setType,
  allMenus
}) {
  const today = new Date;
  function getType(type) {
    if(type === 0 && today.getHours() < 9) {
      return "아침"
    }
    else if(type === 0) {
      return "내일 아침"
    }
    else if(type === 1) {
      return "점심"
    }
    else return "저녁"
  }
  return (
    <Container>
      <Title>
        식단
        <MoreLink to="/cafeteria">더 보기</MoreLink>
      </Title>
      <CafeteriaCard>
        <CafeteriaContainer>
          {cafeteriaList.map((cafeteria, index) => {
            return (
              <Cafeteria
                selected={selected === index}
                onClick={() => setSelected(index)}
                key={index}>
                {cafeteria}
              </Cafeteria>
            )
          })}
        </CafeteriaContainer>
        <TypeContainer>
          <TypeControlButton
            direction="left"
            onClick={() => setType(state => state === 0 ? 0 : state - 1)} />
          <Type>
            {getType(type)}
          </Type>
          <TypeControlButton
            onClick={() => setType(state => state === 2 ? 2 : state + 1)} />
        </TypeContainer>
        <MenuContainer>
          {allMenus.map((menus,idx) => {
            return (
              <Fragment key={idx}>
                {selected === idx &&
                menus.map((menu,index) => {
                  return (
                    <Fragment key={index}>
                      {index === type &&
                      <>
                        {menu &&
                        menu.map((dish,id) => {
                          return(
                            <Fragment key={id}>
                              {id < 10 &&
                              <Menu>
                                {dish}
                              </Menu>
                              }
                              {id === 10 &&
                              <Menu>
                                ...
                              </Menu>
                              }
                            </Fragment>
                          )
                        })}
                        {!menu &&
                        <NoMenu>
                          오늘의 식단 정보가 없습니다!
                        </NoMenu>
                        }
                      </>}
                    </Fragment>
                  )})}
              </Fragment>
            )})
          }
        </MenuContainer>
      </CafeteriaCard>
    </Container>
  )
})
