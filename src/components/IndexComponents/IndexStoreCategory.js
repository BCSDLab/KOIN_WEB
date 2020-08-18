import storeCategory from "../../static/storeCategory";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 0;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  height: 120px;
  margin-bottom: 25px;
  
  @media (max-width: 576px) {
    justify-content: center;
    width: calc(100% - 34px);
    padding: 10px 0 14px;
    margin-left: auto;
    margin-right: auto;
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
`

const CategoryMenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-left: 5px;
  
  @media (max-width: 576px) {
    width: 330px;
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
    width: 64px;
    padding-top: 11px;
    margin-right: ${props => props.index === 4 || props.index === 8 ? 0 : '2px'};
  }
`;

const CategoryImage = styled.img`
  width: 56px;
  height: 56px;
  border-width: 50%;
  margin: 0 auto 13px;
  
  @media (max-width: 576px) {
    width: 50px;
    height: 50px;
  }
`;


export default function IndexStoreCategory(
  {
    selectCategory
  }
){
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
              {value.title}
            </CategoryMenu>
          ))
        }
      </CategoryMenuWrapper>
    </CategoryWrapper>
    </Container>
  )
}
