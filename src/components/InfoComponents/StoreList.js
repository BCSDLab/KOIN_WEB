import React from 'react';
import styled from "styled-components";
import storeCategory from '../../static/storeCategory';
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
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
  font-family: NanumSquare, serif;
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
  flex: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #252525;
  font-size: 15px;
  font-family: NanumSquare, serif;
  font-weight: 800;
  letter-spacing: -0.8px;
  width: 182px;
  
  @media (max-width: 576px) {
    justify-content: flex-start;
    width: 100%;
    font-size: 15px;
    line-height: 1;
    height: 17px;
  }
`;

const CategoryMenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  
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
    margin-right: ${props => props.index === 4 || props.index === 8 ? 0 : '2px'};
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
  height: 24px;
  margin-top: 20px;
  
  @media (max-width: 576px) {
    flex-wrap: wrap;
    margin-top: 24px;
    margin-left: auto;
    margin-right: auto;
    width: calc(100% - 32px);
    height: auto;
  }
`;

const Counter = styled.span`
  flex: none;
  float: left;
  font-size: 12px;
  font-color: #858585;
  color: #858585;
  letter-spacing: -0.6px;
  
  @media (max-width: 576px) {
    width: 100%;
    margin-bottom: 33px;
    text-align: left;
  }
`;

const CheckboxWrapper = styled.div`
  width: fit-content;
  margin-left: ${props => props.first ? 'auto' : '25px'};
  color: #175c8e;
  letter-spacing: -0.6px;
  font-size: 12px;
  
  @media (max-width: 576px) {
    margin-bottom: 15px;
  }
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

const ListHeaderMobile = styled.div`
  background-color: #e6ecf2;
  color: #a1a1a1;
  line-height: 1.46;
  width: 100%;
  height: 31px;
  display: flex;
  align-items: center;
  
  &::before {
    content: "상점목록";
    font-size: 13px;
    margin-left: 16px;
  }
  &::after {
    content: "\\00a0\\00a0\\00a0\\00a0 : 이벤트 진행중";
    font-size: 10px;
    line-height: 1.5;
    margin-left: auto;
    margin-right: 16px;
    background: url("https://stage-static.koreatech.in/upload/8c621c1a7b4e016debf3a1164b51d96b.png") 0 50% no-repeat;
    background-size: 10px;
  }
`;

const ListWrapper = styled.div`
  width: 1131px;
  min-height: 58vh;
  margin-top: 15px;
  margin-bottom: 30px;
  height: 100%;
  display: -ms-flexbox;
  -ms-flex-direction: row;
  -ms-flex-wrap: wrap;
  display: grid;
  grid-template-columns: repeat(3, 358px);
  grid-column-gap: 29px;
  grid-row-gap: 30px;
  grid-auto-rows: 176px;
  
  @media (max-width: 576px) {
    margin-left: auto;
    margin-right: auto;
    width: calc(100% - 32px);
    grid-template-columns: repeat(1, 1fr);
    grid-auto-rows: 60px;
    grid-row-gap: 14px;
  }
`

const ListItem = styled(Link)`
  display: block;
  border: 1px #175c8e solid;
  padding: 22px 27px;
  cursor: pointer;
  position: relative;
  color: #252525;
  text-decoration: none;
  
  &:hover {
    border: 1px #f7941e solid;
  }
  
  @media (max-width: 576px) {
    width: auto;
    height: auto;
    padding: 0 16px;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
    border: solid 1px #d2dae2;
    display: flex;
    align-items: center;
    flex: none;
    
    &:hover {
      border: 1px #f7941e solid;
    }
  }
  
  // IE 10+
  @media all and (-ms-high-contrast: none) {
    width: 300px;
    height: 132px;
    margin-right: 30px;
    margin-bottom: 29px;
    
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
  
  @media all and (-ms-high-contrast: none) and (max-width: 576px) {
    width: calc(100% - 34px);
    height: 60px;
    margin-right: 0;
    margin-bottom: 14px;
  }
`;

const ListItemTitle = styled.div`
  text-align: left;
  font-size: 20px;
  height: 39px;
  width: 100%;
  letter-spacing: -1px;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
  
  ${ListItem}:hover & {
    color: #f7941e;
  }
  
  @media (max-width: 576px) {
    height: auto;
    width: auto;
    max-width: 120px;
    word-break: break-all;
    text-overflow: unset;
    overflow: unset;
    white-space: unset;
    font-family: NotoSansCJKKR;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: left;
    color: #252525;
    
    ${ListItem}:hover & {
      color: #202020;
    }
  }
`;

const ListItemEventDate = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px 11px;
  font-family: NanumBarunGothic;
  font-size: 11px;
  line-height: 1.09;
  letter-spacing: normal;
  color: #ffffff;
  background-color: #175c8e;
  text-align: center;
  
  ${ListItem}:hover & {
    background-color:  #f7941e;
  }
  
  &:before {
  content: "이벤트";
  }
`;

const ListItemEventLink = styled.div`
  position: absolute;
  bottom: 11px;
  right: 11px;
  font-family: NanumBarunGothic;
  font-size: 11px;
  color: #175c8e;
  text-decoration: none;
  line-height: 1.36;
  letter-spacing: normal;
  
  ${ListItem}:hover & {
    color:  #f7941e;
  }
`;

const ListItemEventImage = styled.img`
  width: 11px;
  margin-left: 10px;
`

const ListItemPhone = styled.div`
  text-align: left;
  font-size: 13px;
  height: 22px;
  width: 100%;
  letter-spacing: -0.7px;
  
  & span {
    display: inline-block;
    margin-left: 17px;
    color: #858585;
  }
`;

const ListItemTime = styled.div`
  text-align: left;
  font-size: 13px;
  height: 32px;
  width: 100%;
  letter-spacing: -0.7px;
  
  & span {
    display: inline-block;
    margin-left: 17px;
    color: #858585;
  }
`;

const ListItemOptionWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 24px;
  
  @media (max-width: 576px) {
    margin-left: auto;
  }
`;

const ListItemOption = styled.span`
  border: 1px #f7941e solid;
  margin-right: 4px;
  font-size: 11px;
  border-radius: 20px;
  padding: 5px 10px;
  background: #f7931e;
  color: white;
  
  @media (max-width: 576px) {
    font-size: 11px;
    background: transparent;
    color: ${props => props.disabled ? "#d2dae2" : "#f7931e"};
    margin: 0 6px;
    padding: 0;
    border: 0;
  }
`;



export default function StoreList ({
  mobileFlag,
  selectCategory,
  selectFilter,
  tag,
  filter,
  storeList,
  handleStoreEvent,
  convertEventDDay,
  children
}) {
  const filteredStoreList = storeList.filter(store =>
      (tag === "ALL" || store.category === tag) &&
      ((store.pay_bank * 4 + store.pay_card * 2 + store.delivery) & filter) === filter
  )

  return (
    <Container>
      <ListSection>
        <Header>
          주변 상점
        </Header>
        {/* Category 부분 */}
        <CategoryWrapper>
          <CategoryTitle>
            CATEGORY
          </CategoryTitle>
          <CategoryMenuWrapper>
            {
              storeCategory.map( (value, index) => (
                <CategoryMenu
                  key={value.tag}
                  index={index}
                  selected={tag === value.tag}
                  onClick={() => selectCategory(value.tag)}>
                  <CategoryImage src={value.image} />
                  {value.title}
                </CategoryMenu>
              ))
            }
          </CategoryMenuWrapper>
        </CategoryWrapper>
        {/* Category 밑에 있는 것들 */}
        { children }
        <FilterWrapper>
          <Counter>
            총 <b>{ filteredStoreList.length }개의 업체가</b> 있습니다.
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
        {/* 상점 리스트 */}
        {!!mobileFlag && <ListHeaderMobile />}
        <ListWrapper>
          {
            filteredStoreList.map((store, index) => (
              <ListItem
                to={`/store/${store.permalink}`}
                index={index}
                key={store.id}>
                <ListItemTitle>{store.name}</ListItemTitle>
                {!mobileFlag ? (
                  <>
                    {!!store.event_articles.length && (
                      <>
                        <ListItemEventDate> {convertEventDDay(store.event_articles[0].end_date)}</ListItemEventDate>
                        <ListItemEventLink onClick={e => handleStoreEvent(e, store.event_articles[0].id)}>이벤트 확인하러 가기 ></ListItemEventLink>
                      </>
                    )}
                    <ListItemPhone>전화번호<span>{store.phone}</span></ListItemPhone>
                    <ListItemTime>운영시간<span>{store.phone}</span></ListItemTime>
                    <ListItemOptionWrapper>
                      {!!store.delivery && <ListItemOption>#배달가능</ListItemOption>}
                      {!!store.pay_card && <ListItemOption>#카드가능</ListItemOption>}
                      {!!store.pay_bank && <ListItemOption>#계좌이체가능</ListItemOption>}
                    </ListItemOptionWrapper>
                  </>
                ) : (
                  <>
                    {!!store.event_articles.length && <ListItemEventImage src="https://stage-static.koreatech.in/upload/8c621c1a7b4e016debf3a1164b51d96b.png"/>}
                    <ListItemOptionWrapper>
                      <ListItemOption disabled={!store.delivery}>배달</ListItemOption>
                      <ListItemOption disabled={!store.pay_card}>카드</ListItemOption>
                      <ListItemOption disabled={!store.pay_bank}>계좌이체</ListItemOption>
                    </ListItemOptionWrapper>
                  </>
                )}

              </ListItem>
            ))
          }
        </ListWrapper>
      </ListSection>
    </Container>
  )
}
