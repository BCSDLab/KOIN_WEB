import React from 'react';
import styled from "styled-components";
import storeCategory from '../static/storeCategory';

const Container = styled.div`
  border-top: #f7941e 5px solid;
  width: 100%;

  @media (max-width: 576px) {
    border: none;
  }
`;

const ListSection = styled.div`
  width: 1131px;
  margin: 63px auto 0 auto;
    
  @media (max-width: 576px) {
    width: 100%;
    margin-top: 30px;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 32px;
  font-size: 30px;
  font-family: NanumBarunGothic, serif;
  font-weight: 800;
  letter-spacing: -1.5px;
  color: #175c8e;
  text-align: left;
  margin-bottom: 19px;
  
  @media (max-width: 576px) {
    display: none;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  height: 142px;
  border-top: 2px #175c8e solid;
  border-bottom: 1px #175c8e solid;
  
  @media (max-width: 576px) {
    justify-content: center;
    width: calc(100% - 10px);
    padding: 10px 0 14px;
    margin-left: auto;
    margin-right: auto;
    height: auto;
  }
`;

const CategoryTitle = styled.div`
  flex: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #252525;
  font-size: 15px;
  font-family: NanumBarunGothic, serif;
  font-weight: 800;
  line-height: 1.13;
  width: 182px;
  
  @media (max-width: 576px) {
    justify-content: flex-start;
    width: 100%;
    font-size: 15px;
    line-height: 1;
    height: 17px;
  }
`;

const Category = styled.div`
  flex: none;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-family: NanumBarunGothic, serif;
  font-size: 15px;
  line-height: 1.2;
  height: 100%;
  width: 70px;
  color: #252525;
  margin-right: 35px;
  cursor: pointer;
  
  &:hover {
    color: #f7941e;
  }
  
  @media (max-width: 576px) {
    width: 64px;
    padding-top: 11px;
    letter-spacing: -0.8px;
    margin-right: ${props => props.index === 4 || props.index === 8 ? 0 : '5px'};
  }
`

const CategoryImage = styled.img.attrs( props => ({
  src: props.src
}))`
  width: 57px;
  height: 57px;
  border-width: 50%;
  margin: 0 auto 13px;
  
  @media (max-width: 576px) {
    width: 50px;
    height: 50px;
  }
`;



export default function StoreList (props) {

  return (
    <Container>
      <ListSection>
        <Header>
          주변상점
        </Header>
        <CategoryWrapper>
          <CategoryTitle>
            CATEGORY
          </CategoryTitle>
          {
            storeCategory.map( (value, index) => (
              <Category
                key={value.id}
                index={index}>
                <CategoryImage src={value.image} />
                {value.title}
              </Category>
            ))
          }
        </CategoryWrapper>
      </ListSection>
    </Container>
  )
}