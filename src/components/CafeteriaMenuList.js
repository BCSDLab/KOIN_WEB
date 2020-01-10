import React from "react";
import styled from "styled-components";

const MenusContainer = styled.div`
  display: grid;
  grid-template-columns: 163px 162px 163px 162px 163px 162px 160px;
  grid-template-rows: 304.4px;
  position: relative;
  top: -7px;
  z-index: -1;
`;

const Menus = styled.div`
  width:100%;
  height:100%;
  border-radius: 2px;
  // rgb(247,148,30) = 학생식당 외 
  // rgb(23,92,142)  = 학생식당
  background-color: rgba(
    ${props => props.cafeteria === "능수관" || props.cafeteria === "수박여" || props.cafeteria === "2캠퍼스" ? 247 : 23 },
    ${props => props.cafeteria === "능수관" || props.cafeteria === "수박여" || props.cafeteria === "2캠퍼스" ? 148 : 92 },
    ${props => props.cafeteria === "능수관" || props.cafeteria === "수박여" || props.cafeteria === "2캠퍼스" ? 30 : 142 },
    ${props => props.time === "BREAKFAST" ? 0.03 : props.time === "LUNCH" ? 0.1 : 0.2 });
  color: black;
  padding-top: 33.8px;
`;

const InnerContainer = styled.div`
  margin-right: 3px;
`;

const Menu = styled.div`
  font-family: AppleSDGothicNeoR00,sans-serif;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.48px;
  text-align: left;
  color: #232323;
`;

const Info = styled.div`
  font-family: AppleSDGothicNeoR00, sans-serif;
  font-size: 11px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: -0.17px;
  text-align: left;
  color: #7a7a7a;
  margin-top: 17px
`;

export default function CafeteriaMenuList({cafeteriaList, cafeteriaMenus, time}) {
  return(
    <MenusContainer>
      {cafeteriaList.map((cafeteria,index) => {
        return(
          <InnerContainer key={index}>
            {cafeteriaMenus.map((menus, idx) => {
              if(menus.type===time){
                if(menus.place===cafeteria){
                  return(
                    <Menus
                      key={idx}
                      time={time}
                      cafeteria={cafeteria}>
                      {menus.menu.map((menu, i)=> {
                        return(
                          <Menu key={i}>
                            {menu}
                          </Menu>
                        )
                      })}
                      <Info>
                        {menus.kcal}kcal<br/>
                        {menus.price_card}원/{menus.price_cash}원
                      </Info>
                    </Menus>
                  )
                }
              }
            })}
          </InnerContainer>
        )
      })}
    </MenusContainer>
  )
}
