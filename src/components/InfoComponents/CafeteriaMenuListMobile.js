import React from "react";
import styled from "styled-components";

const MenusContainer = styled.div`
  display: -ms-flexbox;
  -ms-flex-direction: row;
  display: grid;
  grid-template-columns: calc((100% - 32px)/3) calc((100% - 32px)/3) calc((100% - 32px)/3);
  grid-column-gap: 3.5%;
`;

const Menus = styled.div`
  font-family: AppleSDGothicNeoR00,sans-serif;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.48px;
  text-align: left;
  color: #494949;
  padding-top: 24px;
  margin-bottom: 33px;

  // IE 10+
  @media all and (-ms-high-contrast: none) {
    width: calc((100% - 32px)/3);
    margin-right: 3.5%;
    -ms-grid-column: ${props => Number(props.index) + 1};
    
    &:last-child {
      margin-right: 0;
    }
  }
`;

const Menu = styled.div`
  
`;

const KcalInfo = styled.div`
  height: 12px;
  font-family: AppleSDGothicNeoR00,sans-serif;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.9;
  letter-spacing: -0.4px;
  text-align: left;
  color: #7e7e7e;
  margin-top: 10px;
`;

const PriceInfo = styled.div`
  font-family: AppleSDGothicNeoR00,sans-serif;
  font-size: 8px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: -0.4px;
  text-align: left;
  color: #7e7e7e;
  margin-top: 4px;
`;

export default function CafeteriaMenuListMobile({cafeteria, cafeteriaMenus, times}) {
  return(
    <MenusContainer>
      {times.map((time, index1)=>{
        return(
          <Menus
            key={`tieme-${index1}`}
            index={index1}>
            {cafeteriaMenus.filter(menus => menus.place === cafeteria).map((menus, index2) =>
              (menus.type === time) && (
                <div key={`menus-${index2}`}>
                  {menus.menu.map((menu, index3) => {
                    return (
                      <Menu key={`menu-${index3}`}>
                        {menu}
                      </Menu>
                    )
                  })}
                  <KcalInfo>
                    {menus.kcal}Kcal
                  </KcalInfo>
                  <PriceInfo>
                    {menus.price_card}원/{menus.price_cash}원
                  </PriceInfo>
                </div>
            ))}
          </Menus>
        )
      })}
    </MenusContainer>
  )
}
