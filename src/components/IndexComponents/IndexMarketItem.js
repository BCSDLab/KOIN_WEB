import React, { Fragment } from 'react'
import styled, { keyframes } from 'styled-components';

const Shine = (img, title, nickname) => keyframes`
  to {
    background-position:
      120% 0, /* move highlight to right */
      0 0,
      0 ${img},
      0 ${title},
      0 ${nickname};
  }
`;

const Skeleton = styled.div`
  width: 212px;
  height: 253px;
  background-image:
    linear-gradient( 
      100deg, rgba(255, 255, 255, 0), 
      rgba(255, 255, 255, 0.5) 50%, 
      rgba(255, 255, 255, 0) 80% ),
    linear-gradient( lightgray 141px, transparent 0 ),
    linear-gradient( lightgray 42px, transparent 0 ),
    linear-gradient( lightgray 16px, transparent 0 ),
    linear-gradient( lightgray 24px, transparent 0 );

  background-repeat: no-repeat;
  background-size:
    10% 100%, /* highlight */
    100% 100%,
    100% 200%,
    40% 200%,
    100% 200%;
  background-position:
    0 0, /* highlight */
    0 0,
    0 156px,
    0 213px,
    0 230px;
  animation: ${Shine('156px', '213px', '230px')} 1s infinite;

  @media (max-width: 576px) {
    width: calc(50% - 10px);
    height: 187px;
    margin-bottom: 19px;
    background-image:
      linear-gradient( 
        100deg, rgba(255, 255, 255, 0), 
        rgba(255, 255, 255, 0.5) 50%, 
        rgba(255, 255, 255, 0) 80% ),
      linear-gradient( lightgray 100px, transparent 0 ),
      linear-gradient( lightgray 39px, transparent 0 ),
      linear-gradient( lightgray 14px, transparent 0 ),
      linear-gradient( lightgray 18px, transparent 0 );

    background-repeat: no-repeat;
    background-size:
      10% 100%, /* highlight */
      100% 100%,
      100% 200%,
      40% 200%,
      100% 200%;
    background-position:
      0 0, /* highlight */
      0 0,
      0 111px,
      0 155px,
      0 170px;
    animation: ${Shine('111px', '155px', '170px')} 1s infinite;
  }
`;

const ErrorContainer = styled.div`
  font-family: NanumBarunGothic;
  width: 100%;
  height: 253px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 576px) {
    height: 100%;
  }
`;

const ErrorMark = styled.div`
  font-size: 14px;
  font-weight: 700;
  width: 21px;
  height: 21px;
  border: 2px solid #fa5252;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  color: #fa5252;
`;

const Container = styled.div`
  width: 100%;
`;

const Title = styled.div`
  text-align: left;
  font-size: 17px;
  font-weight: 800;
  color: #175c8e;
  margin-bottom: 20px;
  font-family: NanumSquare;
  cursor: pointer;
  @media (max-width: 576px) {
    font-size: 18px;
  }
`;

const Item = styled.div`
  width: 212px;
  height: 100%;
  text-align: left;
  cursor: pointer;
  @media (max-width: 576px) {
    width: calc(50% - 10px);
    height: auto;
    margin-bottom: 19px;
  }
`;

const Items = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 576px) {
    flex-wrap: wrap;
    height: 412px;
    overflow: hidden;

    & ${Item}:last-child, & ${Skeleton}:last-child {
      display: none;
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
`;

const Thumbnail = styled.img`
  width: 212px;
  height: 141px;
  @media (max-width: 576px) {
    width: 100%;
    height: 100px;
  }
`;

const NoImage = styled.div`
  background: #cacaca;
  height: 141px;
  width: 212px;
  color: #999999;
  font-size: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 576px) {
    width: 100%;
    height: 100px;
  }
`;

const StateTag = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  font-family: NanumSquareR;
  font-size: 12px;
  line-height: 1.5;
  letter-spacing: -0.48px;
  text-align: center;
  width: 40px;
  height: 17px;
  background: #ffffff;
  color: ${props => props.type ? "#f7941e" : "#175c8e"};
  border: 1px solid ${props => props.type ? "#f7941e" : "#175c8e"};
`;

const ItemTitle = styled.div`
  font-family: NanumBarunGothic;
  font-size: 15px;
  line-height: 1.6;
  color: #252525;
  margin: 15px 0;
  height: 42px;
  overflow: hidden;
  word-break: break-all;
  @media (max-width: 576px) {
    margin: 11px 0 5px 0;
    height: 39px;
    line-height: 1.27;
  }
`;

const Nickname = styled.div`
  font-family: NanumBarunGothic;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.3;
  letter-spacing: -0.64px;
  text-align: left;
  color: #175c8e;
  @media (max-width: 576px) {
    font-size: 11px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CreatedAt = styled.div`
  font-family: NanumBarunGothic;
  font-size: 12px;
  line-height: 2;
  letter-spacing: -0.6px;
  color: #9fa9b3;
  @media (max-width: 576px) {
    font-size: 8px;
    line-height: 1.5;
    letter-spacing: -0.48px;
  }
`;

const Price = styled.div`
  font-family: NanumBarunGothic;
  font-size: 15px;
  font-weight: bold;
  line-height: 1.5;
  letter-spacing: -0.72px;
  color: #252525;
  @media (max-width: 576px) {
    font-size: 15px;
    line-height: 1.215;
    letter-spacing: -0.6px;
  }
`;

const NewTag = styled.img`
  width: 14px;
  height: 14px;
  margin-left: 5px;
`;


export default function IndexMarketItem({
  history,
  items,
  loading,
  error
}) {
  const setDate = (time) => {
    const created = new Date(time);
    const today = new Date();
    if (Math.ceil((today - created) / 1000 / 60) < 60)
      return [Math.floor((today - created) / 1000 / 60) + "분 전", true];
    if (Math.floor((today - created) / 60 / 1000 / 60) < 4)
      return [Math.floor((today - created) / 60 / 60 / 1000) + "시간 전", true];
    else if (Math.floor((today - created) / 60 / 1000 / 60) < 24)
      return [Math.floor((today - created) / 60 / 1000 / 60) + "시간 전", false];
    else {
      let year = created.getFullYear();
      let month = created.getMonth() + 1 < 10 ? "0" + (created.getMonth() + 1) : created.getMonth() + 1;
      let date = (created.getDate() < 10) ? "0" + created.getDate() : created.getDate();
      return [String(year) + "." + String(month) + "." + String(date) + " ", false]
    }
  }


  return (
    <Container>
      <Title>중고장터</Title>
      <Items>
        {error && 
          <ErrorContainer>
            <ErrorMark>!</ErrorMark>
            데이터 조회에<br />문제가 발생했습니다.
          </ErrorContainer>
        }
        {[...Array(5)].map((n, index) => 
          <Fragment key={index}>
            {loading && <Skeleton />}
            {items && 
              <Item
                onClick={() => history.push(`/market/${items[index].type ? 'buy' : 'sell'}/${items[index].id}`)}>
                <ImageContainer>
                  {items[index].thumbnail
                    ? <Thumbnail src={items[index].thumbnail} />
                    : <NoImage>No Image</NoImage>
                  }
                  <StateTag type={items[index].type}>
                    {items[index].type ? "구매중" : "판매중"}
                  </StateTag>
                </ImageContainer>
                <ItemTitle>
                  {items[index].title.length > 22 ? `${items[index].title.substring(0, 22)}···`: items[index].title}
                  {setDate(items[index].created_at)[1] &&
                    <NewTag src={"https://static.koreatech.in/upload/7f2af097aeeca368b0a491f9e00f80ca.png"}/>
                  }
                </ItemTitle>
                <Nickname>{items[index].nickname}</Nickname>
                <Wrapper>
                  <CreatedAt>{setDate(items[index].created_at)[0]}</CreatedAt>
                  <Price>{items[index].price ? items[index].price.toLocaleString() : '- '}원</Price>
                </Wrapper>
              </Item>
            }
          </Fragment>
        )}
      </Items>
      
    </Container>
  )
}
