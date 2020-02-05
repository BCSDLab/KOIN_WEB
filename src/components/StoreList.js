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
  font-weight: ${props => props.selected ? '700' : 'normal'};
  font-size: 15px;
  line-height: 1.2;
  height: 100%;
  width: 70px;
  color: ${props => props.selected ? '#f7941e' : '#252525'};
  margin-right: 35px;
  cursor: pointer;
  
  &:hover {
    color: #f7941e;
  }
  
  @media (max-width: 576px) {
    letter-spacing: -0.8px;
    width: 64px;
    padding-top: 11px;
    margin-right: ${props => props.index === 4 || props.index === 8 ? 0 : '5px'};
  }
`;

const CategoryImage = styled.img`
  width: 57px;
  height: 57px;
  border-width: 50%;
  margin: 0 auto 13px;
  
  @media (max-width: 576px) {
    width: 50px;
    height: 50px;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  height: 25px;
  margin-top: 20px;
`;

const Counter = styled.div`
  float: left;
  font-size: 12px;
  font-color: #858585;
  color: #858585;
  letter-spacing: -0.6px;
`;

const CheckboxWrapper = styled.div`
  width: fit-content;
  margin-left: ${props => props.first ? 'auto' : '33px'};
  color: #175c8e;
  letter-spacing: -0.6px;
  font-size: 12px;
`;

const Checkbox = styled.input.attrs({type: 'checkbox'})`
  display: none;
  
  &:checked + label:before {
    content: "";
    border: 1px solid #175c8e;
    background-image: url("https://static.koreatech.in/assets/img/check.png");
    background-size: cover;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  cursor: pointer;
  position: relative;
  width: 100%;
  
  &:before {
    content: "";
    display: block;
    line-height: 13px;
    width: 12px;
    height: 12px;
    margin-right: 8px;
    border: 1px solid #d2dae2;
    position: relative;
    left: 0;
    bottom: 1px;
    background-color: #ffffff;
  }
`;

const ListWrapper = styled.div`
  width: 1131px;
  min-height: 58vh;
  margin-top: 15px;
  margin-bottom: 30px;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 358px);
  grid-column-gap: 29px;
  grid-row-gap: 30px;
  grid-auto-rows: 176px;
`



export default function StoreList ({
  mobileFlag,
  tag,
  filter,
}) {

  return (
    <Container>
      <ListSection>
        <Header>
          주변상점
        </Header>
        {/* Category 부분 */}
        <CategoryWrapper>
          <CategoryTitle>
            CATEGORY
          </CategoryTitle>
          {
            storeCategory.map( (value, index) => (
              <Category
                key={value.tag}
                index={index}
                selected={tag === value.tag}
                <CategoryImage src={value.image} />
                {value.title}
              </Category>
            ))
          }
        </CategoryWrapper>
        {/* Category 밑에 있는 것들 */}
        <FilterWrapper>
          <Counter>
          </Counter>
          <CheckboxWrapper first>
            <Checkbox
              id="delivery"
              checked={filter & 1}
              onChange={() =>selectFilter(0)}
              />
            <CheckboxLabel htmlFor="delivery">배달 가능</CheckboxLabel>
          </CheckboxWrapper>
          <CheckboxWrapper>
            <Checkbox
              id="card"
              checked={filter & 2}
              onChange={() => selectFilter(1)} />
            <CheckboxLabel htmlFor="card">카드결제 가능</CheckboxLabel>
          </CheckboxWrapper>
          <CheckboxWrapper>
            <Checkbox
              id="bank"
              checked={filter & 4}
              onChange={() => selectFilter(2)} />
            <CheckboxLabel htmlFor="bank">계좌이체 가능</CheckboxLabel>
          </CheckboxWrapper>
        </FilterWrapper>
        <ListWrapper>

        </ListWrapper>
      </ListSection>
    </Container>
  )
}