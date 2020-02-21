import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`;

const Title = styled.div`
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
  cursor: pointer;
`;

const CafeteriaCard = styled.div`
  margin-top: 20px;
  width: 295px;
  height: 157px;
  padding: 15px 15px 0 15px;
  border: solid 1px #175c8e;
  box-sizing: border-box;
`;

const CafeteriaCategory = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const CafeteriaList = styled.div`
  float:left;
  margin-right: 10px;
  width: auto;
  height: 18px;
  font-size: 13px;
  font-weight: ${props => props.selected? "bold": "normal"};
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: center;
  color: ${props => props.selected ? "#175c8e" :"#bbbbbb"};
  border-bottom: ${props => props.selected? "solid 1px #175c8e": "none"};
  cursor: pointer;
`;

const Type = styled.div`
  float: right;
  font-size: 13px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: center;
  color: #175c8e;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  height: 95px;
  box-sizing: border-box;
  padding: 21px 35px 0 35px;
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
  margin-bottom: 4px;
`;

const ShowMore = styled.div`
  font-family: NanumBarunGothic;
  font-size: 12px;
  width: 60px;
  letter-spacing: -0.48px;
  color: #bbbbbb;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  float:right;
`;

const ShowMoreIcon = styled.img.attrs({
  src: "http://static.koreatech.in/assets/img/ic-more.png"
})`
  width: 15px;
  height: 15px;
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
  margin: 27px 0 0 0;
`

export default function IndexCafeteria(
  {
    history,
    cafeteriaList,
    selected,
    setSelected,
    type,
    allMenus
  }
) {
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
      <Title>오늘의 식단</Title>
      <CafeteriaCard>
        <CafeteriaCategory>
          {cafeteriaList.map((cafeteria, index) => {
            return (
              <CafeteriaList
                selected={selected === index}
                onClick={() => setSelected(index)}>
                {cafeteria}
              </CafeteriaList>
            )
          })}
          <Type>
            {getType(type)}
          </Type>
          <MenuContainer>
            {allMenus.map((menus,idx) => {
              return (
                <>
                  {selected === idx &&
                    menus.map((menu,index) => {
                    return (
                      <>
                      {index === type &&
                        <>
                          {menu &&
                            menu.map((dish) => {
                            return(
                              <Menu>
                                {dish}
                              </Menu>
                            )
                          })}
                          {!menu &&
                            <NoMenu>
                              오늘의 식단 정보가 없습니다!
                            </NoMenu>
                          }
                        </>}
                      </>
                    )})}
                </>
              )})
            }
          </MenuContainer>
          <ShowMore onClick={() => history.push('/cafeteria')}>
            더보기
            <ShowMoreIcon/>
          </ShowMore>
        </CafeteriaCategory>
      </CafeteriaCard>
    </Container>
  )
}
