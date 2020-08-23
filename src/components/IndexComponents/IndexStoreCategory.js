import storeCategory from "../../static/storeCategory";
import React from "react";
import styled from "styled-components";
import useMobileFlag from "../../hooks/useMobileFlag";

const Container = styled.div`
  margin: 0;
  
  @media (max-width: 576px) {
    margin-top: 29px;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  height: 120px;
  
  @media (max-width: 576px) {
    justify-content: center;
    width: 100%;
    padding-top: 2px;
    height: auto;
  }
`;

const CategoryTitle = styled.div`
  font-family: NanumSquare;
  font-size: 17px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  cursor: pointer;
  color: #175c8e;
  
  @media(max-width: 576px){
    font-size: 15px;
    font-weight: bold;
    color: #175c8e;
    padding-left: 3px;
  }
`

const CategoryMenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-left: 5px;
  
  @media (max-width: 576px) {
    width: 100%;
    justify-content: flex-start;
    padding: 0;
    flex-wrap: nowrap;
    overflow: scroll;
    &::-webkit-scrollbar { 
      display: none !important;
    }
  }
`;

const CategoryMenu = styled.div`
  flex: none;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-family: NanumBarunGothic, serif;
  height: 100%;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
  width: 73px;
  margin-right: 23px;
  cursor: pointer;
  
  &:hover {
    color: #f7941e;
  }
  
  @media (max-width: 576px) {
    letter-spacing: -0.8px;
    width: 40px;
    padding-top: 11px;
    margin-right: 8px;
    font-size: 12px;
    color: #252525;
  }
`;

const CategoryImage = styled.img`
  width: 56px;
  height: 56px;
  border-width: 50%;
  margin: 0 auto 13px;
  
  @media (max-width: 576px) {
    width: 40px;
    height: 40px;
  }
`;


export default function IndexStoreCategory(
  {
    selectCategory
  }
){
  const mobileFlag = useMobileFlag();
  return (
    <Container>
    <CategoryTitle onClick={() => selectCategory("ALL")}>
      주변상점
    </CategoryTitle>
    <CategoryWrapper>
      <CategoryMenuWrapper>
        {
          storeCategory.map( (value, index) => (
            <CategoryMenu
              key={value.tag}
              index={index}
              onClick={() => selectCategory(value.tag)}>
              <CategoryImage src={value.image} />
              {value.title &&
                value.title === "일반음식점"? mobileFlag ? "일반음식" : value.title: value.title
              }
            </CategoryMenu>
          ))
        }
      </CategoryMenuWrapper>
    </CategoryWrapper>
    </Container>
  )
}
