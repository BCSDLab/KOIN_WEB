import React from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 84px);
  margin: auto;
`;

const DetailSection = styled.div`
  width: 1131px;
  margin: 63px auto 0;
  height: 120%;
  min-height: 700px;
  display: inline-block;
  
  @media (max-width: 576px) {
    width: calc(100% - 32px);
    margin: 30px auto;
    font-size: 20px;
  }
`;

const Header = styled.div`
  height: 52px;
  text-align: left;
  border-bottom: 2px #175c8e solid;
  font-size: 30px;
  font-family: NanumSquare, serif;
  font-weight: 800;
  color: #175c8e;
  letter-spacing: -1.5px;
  cursor: pointer;
  
  @media (max-width: 576px) {
    display: none;
  }
`;

const StoreInfo = styled.div`
  width: 100%;
  text-align: left;
  min-height: 407px;
  padding: 39px 0;
  box-sizing: border-box;
  border-bottom: solid 1px #ececec;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 576px) {
    flex-direction: column;
    padding: 0 0 16px 0;
    border: 0;
    margin-bottom: 0;
    height: auto;
  }
`;

const StoreInfoDetail = styled.div`
  min-height: 330px;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 576px) {
    width: 100%;
    height: auto;
  }
`;

const StoreTitle = styled.div`
  font-size: 20px;
  line-height: 0.8;
  letter-spacing: -1.5px;
  color: #252525;
  margin-bottom: 18px;
  
  @media (max-width: 576px) {
    font-weight: bold;
    letter-spacing: normal;
  }
`;

const StoreEventBadge = styled.div`
  display: inline-block;
  font-family: NanumBarunGothic;
  font-size: 10px;
  margin-left: 14px;
  border: solid 1px #f7941e;
  padding: 0 10px;
  height: 14px;
  border-radius: 7px;
  line-height: 1.6;
  letter-spacing: normal;
  color: #f7941e;
  
  &::before {
    content: "이벤트"
  }
  
  @media (max-width: 576px) {
    margin-left: 12px;
    padding: 0 5px;
  }
`;

const StoreInfoDetailText = styled.div`
  align-self: flex-start;
  font-size: 13px;
  line-height: 1.69;
  letter-spacing: -0.7px;
  color: #858585;
  
  & span {
    display: inline-block;
    color: #252525;
    margin-right: 17px;
  }
  
  & br:nth-child(2) {
    display: block;
    margin-bottom: 1px;
  }
  
  @media (max-width: 576px) {
    & span {
      margin-right: 5px;
    }
    
    & br:nth-child(2) {
      margin-bottom: -4px;
    }
  }
`;

const StoreOtherInfo = styled.div`
  display: flex;
`;

const StoreOtherInfoContent = styled.div`
  display: inline-block;
`;

const StoreInfoImageWrapper = styled.div`
  width: 330px;
  height: 330px;
  
  @media (max-width: 576px) {
    display: flex;
    width: calc(100% + 16px);
    height: 159px;
    cursor: initial;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    margin-top: 25px;
    margin-left: 16px;
  }
`;

const StoreInfoImage = styled.img`
  width: 330px;
  height: 330px;
  cursor: pointer;
  image-orientation: from-image;
  
  &:nth-child(n+2) {
    display: none;
  }
  
  @media (max-width: 576px) {
    width: 159px;
    height: 159px;
    
    & + & {
      display: block;
      margin-left: 10px;
    }
  }
`;

const StoreInfoTagWrapper = styled.div`
  margin: auto 0 37px;
  
  & span {
    display: inline-block;
    border: 1px #f7941e solid;
    margin-right: 5px;
    font-size: 12px;
    border-radius: 20px;
    padding: 5px 13px;
    background: #f7931e;
    color: white;
  }
  
  @media (max-width: 576px) {
    margin: 15px 0 30px;
    
    & span {
      height: 14px;
    }
  }
`

const StoreInfoButtonWrapper = styled.div`
  margin-bottom: 13px;
  
  @media (max-width: 576px) {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
`;

const StoreInfoButton = styled.a`
  background-color: ${props => props.type === 'primary' ? '#175c8e' : '#858585'};
  color: #ffffff;
  font-size: 15px;
  line-height: 1.33;
  letter-spacing: 0.5px;
  text-align: center;
  text-decoration: none;
  border: 1px solid ${props => props.type === 'primary' ? '#175c8e' : '#858585'};
  padding: 13px 31px;
  cursor: pointer;
  
  & + & {
    margin-left: 3px;
  }
  
  @media (max-width: 576px) {
    padding: 6px 12px;
    
    & + & {
      margin-left: 5px;
    }
  }
`;



const StoreMenuTitle = styled.div`
  text-align: left;
  font-size: 20px;
  letter-spacing: -1px;
  line-height: 1.69;
  color: #252525;
  margin: 63px 0 12px;
  font-weight: 700;
  
  @media (max-width: 576px) {
    margin-top: 31px;
  }
`;

const StoreMenuCardWrapper = styled.div`
  display: -ms-flexbox;
  -ms-flex-direction: row;
  -ms-flex-wrap: wrap;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 74px;
  grid-row-gap: 11px;
  grid-column-gap: 14px;
  height: 100%;
  margin-bottom: 24px;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    grid-auto-rows: 60px;
    margin-bottom: 0;
  }
`;

const StoreMenuCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  border: solid 1px #d7d7d7;
  padding-left: 29px;
  padding-right: 30px;
  user-select: text;
  text-align: left;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.8px;
  line-height: 1.5;
  color: #252525;
  word-wrap: break-word;
  
  & span {
    margin-left: auto;
    font-size: 15px;
    font-weight: bold;
    font-family: Verdana, NanumSquare;
    letter-spacing: -0.8px;
    color: #175c8e;
  }
  
  @media (max-width: 576px) {
    padding: 0 12px;
    line-height: 1;
    font-size: 13px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    
    & span {
      font-size: 13px;
    }
  }
  
  // IE 10+
  @media all and (-ms-high-contrast: none) {
    width: 497px;
    height: 72px;
    margin-right: 14px;
    margin-bottom: 11px;
    
    &:nth-child(2n) {
      margin-right: 0;
    }
  }
  
  @media all and (-ms-high-contrast: none) and (max-width: 576px) {
    width: calc(100% - 26px);
    height: 60px;
    margin-right: 0;
    margin-bottom: 14px;
  }
`

export default function StoreDetail ({
  store,
  selectImage,
  convertEventDDay,
  history,
  children
}) {
  return (
    <Container>
      {store && (
        <DetailSection>
          <Header onClick={() => history.push('/store')}>
            주변 상점
          </Header>
          <StoreInfo>
            <StoreInfoDetail>
              <StoreTitle>
                { store.name }
                {!!store.event_articles.length && <StoreEventBadge>{convertEventDDay(store.event_articles[0].end_date)}</StoreEventBadge>}
              </StoreTitle>
              <StoreInfoDetailText>
                <span>전화번호</span>
                {store.phone}
                <br/>
                <span>운영시간</span>
                {!!store.open_time ? `${store.open_time} ~ ${store.close_time}` : '-'}
                <br/>
                <span>주소정보</span>
                {store.address}
                <br/>
                <span>배달요금</span>
                {store.delivery_price.toLocaleString()}원
                <br/>
                <StoreOtherInfo>
                  <span>기타정보</span>
                  <StoreOtherInfoContent>
                    {store.description ?
                      parse(store.description.replace(/(?:\\r\\n|\\r|\\n|\r|\n|\r\n)/g, '<br />')) :
                      '-'
                    }
                  </StoreOtherInfoContent>
                </StoreOtherInfo>
              </StoreInfoDetailText>
              <StoreInfoTagWrapper>
                {store.delivery && <span>#배달가능</span>}
                {store.pay_card && <span>#카드가능</span>}
                {store.pay_bank && <span>#계좌이체가능</span>}
              </StoreInfoTagWrapper>
              <StoreInfoButtonWrapper>
                <StoreInfoButton
                  href={`tel:${store.phone}`}
                  type="primary">
                  전화하기
                </StoreInfoButton>
                <StoreInfoButton
                  type="secondary"
                  onClick={() => history.push('/store')}>
                  상점목록
                </StoreInfoButton>
              </StoreInfoButtonWrapper>
            </StoreInfoDetail>
            <StoreInfoImageWrapper>
              {!!store.image_urls && store.image_urls.map(img => (
                <StoreInfoImage
                  key={img}
                  src={img}
                  onClick={() => selectImage(img)} />
              ))}
            </StoreInfoImageWrapper>
          </StoreInfo>
          {/* 배너 */}
          { children }
          {!!store.menus.length && (
            <>
              <StoreMenuTitle>MENU</StoreMenuTitle>
              <StoreMenuCardWrapper>
                {store.menus.filter(menu => menu.price_type).map(
                  menu => {
                    return menu.price_type.map(
                        price => ({...price, name: menu.name})
                    )
                  }
                ).flat(1)
                .map(menu => (
                  <StoreMenuCard key={menu.name + menu.size}>
                    { menu.name } { menu.size !== '기본' && menu.size }
                    <span>{!!menu.price && menu.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</span>
                  </StoreMenuCard>
                ))}
              </StoreMenuCardWrapper>
            </>
          )}
        </DetailSection>
      )}
    </Container>
  )
}