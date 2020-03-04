import React, { Fragment } from 'react'
import styled from 'styled-components';
import Pagination from '../SharedComponents/Pagination';
import ClipLoader from 'react-spinners/ClipLoader';

const List = styled.div`
  width: 1132px;
  border-top: 2px solid #175c8e;
  margin-bottom: 32px;

  @media (max-width: 576px) {
    width: 100%;
    border-top: none;
  }
`;

const ItemCount = styled.div`
  color: #858585;
  width: 100%;
  text-align: left;
  font-size: 12px;
  margin: 25px 0 10px 0;

  @media (max-width: 576px) {
    display: none;
  }
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @media (max-width: 576px) {
    flex-wrap: none;
    flex-direction: column;
  }
`;

const LoaderWrapper = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Item = styled.div`
  width: 262px;
  height: 322px;
  text-align: left;
  margin: 30px 10px 0 10px;
  cursor: pointer;
  
  @media (max-width: 576px) {
    display: none;
  }
`;

const ItemTitleContainer = styled.div`
  font-size: 20px;
  letter-spacing: -1px;
  height: 46px;
  overflow: hidden;
  @media (max-width: 576px) {
    width: 100%;
    display: flex;
    align-items: center;
    height: auto;
    font-size: 16px;
    line-height: 1.5;
    letter-spacing: -0.8px;
    color: rgba(0, 0, 0, 0.87);
  }
`;

const ItemTitleContent = styled.span`
  @media (max-width: 576px) {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 70%;
  }
`;

const NewTag = styled.img`
  width: 14px;
  height: 14px;
  margin-left: 4px;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  margin: 13px 0 21px 0;
  @media (max-width: 576px) {
    color: #a1a1a1;
    margin: 3px 0 0 0;
  }
`;

const ItemThumbnailContainer = styled.div`
  width: 262px;
  height: 169px;
  overflow: hidden;
  @media (max-width: 576px) {
    width: 55px;
    height: 55px;
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: auto;
  min-height: 169px;
`;

const NoImage = styled.div`
  background: #cacaca;
  line-height: 169px;
  height: 169px;
  width: 262px;
  text-align: center;
  vertical-align: middle;
  color: #999999;
  font-size: 15px;
  @media (max-width: 576px) {
    width: 100%;
    height: 100%;
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #a1a1a1;
    color: #d1d1d1;
  }
`;

const ItemFooter = styled.div`
  margin-top: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemPrice = styled.span`
  color: #175c8e;
  font-weight: bold;
  letter-spacing: -0.9px;
  @media (max-width: 576px) {
    font-size: 13px;
    font-weight: normal;
    line-height: 1.54;
    letter-spacing: -0.7px;
    color: #175c8e;
    margin-top: 3px;
  }
`;

const ItemState = styled.span`
  font-size: 11px;
  border-radius: 15px;
  padding: 5px 13px;
  ${props => {
    const { state } = props;
    if (state === 0) {
      return {
        color: '#175c8e',
        border: '1px solid #175c8e'
      }
    } else if (state === 1) {
      return {
        color: '#d32525',
        border: '1px solid #d32525'
      }
    } else {
      return {
        color: '#aeaeae',
        border: '1px solid #aeaeae'
      }
    }
  }}
`;

const Line = styled.hr`
  width: 1132px;
  border: 0.5px solid #e7e7e7;
  @media (max-width: 576px) {
    display: none;  
  }
`;

const MobileItem = styled.div`
  display: none;
  @media (max-width: 576px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
    height: 89px;
    border-bottom: 1px solid #ececec;
    margin: 0;
    cursor: pointer;
  }
`;

const MobileItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: calc(100% - 55px);
`;

export default function Items({
  history,
  path,
  items,
  isMyItems,
  loading,
  totalPageNum,
  numOfItems,
  getItemList,
  getMyItemList
}) {
  const setState = state => {
    const marketId = JSON.parse(sessionStorage.getItem("marketId"));
    if (marketId === 0) {
      if (state === 0) return '판매중';
      else if (state === 1) return '판매중지';
      else return '판매완료';
    } else {
      if (state === 0) return '구매중';
      else if (state === 1) return '구매중지';
      else return '구매완료';
    }
  }

  const convertDate = (time) => {
    const times = time.split(" ");
    const date = times[0].split("-");
    const tim = times[1].split(":");
    let created = new Date();
    created.setFullYear(date[0]);
    created.setMonth(date[1] - 1);
    created.setDate(date[2]);
    created.setHours(tim[0]);
    created.setMinutes(tim[1]);
    created.setSeconds(tim[2]);
    return created;
  }

  const setDate = (time) => {
    const today = new Date();
    let created = convertDate(time);
    if (Math.ceil((today - created) / 1000 / 60) < 60)
      return [Math.floor((today - created) / 1000 / 60) + "분 전", true];
    if (Math.floor((today - created) / 60 / 1000) < 4)
      return [Math.floor((today - created) / 60 / 1000) + "시간 전", true];
    else if (Math.floor((today - created) / 60 / 1000) < 24)
      return [Math.floor((today - created) / 60 / 1000) + "시간 전", false];
    else {
      let year = created.getFullYear();
      let month = created.getMonth() + 1 < 10 ? "0" + (created.getMonth() + 1) : created.getMonth() + 1;
      let date = (created.getDate() < 10) ? "0" + created.getDate() : created.getDate();
      let hour = created.getHours() < 10 ? "0" + created.getHours() : created.getHours();
      let minutes = created.getMinutes() < 10 ? "0" + created.getMinutes() : created.getMinutes();
      return [String(year) + "." + String(month) + "." + String(date) + " " + String(hour) + ":" + String(minutes), false]
    }
  }

  return (
    <>
      <List>
        <ItemCount>총 {numOfItems.toLocaleString()}개의 게시물이 있습니다.</ItemCount>
        <Row>
          {loading &&
            <LoaderWrapper>
              <ClipLoader
                color={"#175c8e"}
                size={150}
                loading={loading}
              />
            </LoaderWrapper>
          }
          {items && items.map((item, index) =>
            <Fragment key={item.id}>
              <Item onClick={() => history.push(`/market/${path}/${item.id}`)}>
                <ItemTitleContainer>
                  <ItemTitleContent>{item.title.length > 22 ? `${item.title.substr(0, 22)}···` : item.title}</ItemTitleContent>
                  {setDate(item.created_at)[1] &&
                    <NewTag src={"https://static.koreatech.in/upload/7f2af097aeeca368b0a491f9e00f80ca.png"}/>
                  }  
                </ItemTitleContainer>
                <ItemInfo>
                  <span style={{ color: "#175c8e" }}>{item.nickname}</span>
                  <span style={{ color: "#858585", fontSize: '12px', marginLeft: '15px' }}>{setDate(item.created_at)[0]}</span>
                </ItemInfo>
                <ItemThumbnailContainer>
                  {item.thumbnail
                    ? <ThumbnailImage src={item.thumbnail} />
                    : <NoImage>No Image</NoImage>
                  }
                </ItemThumbnailContainer>
                <ItemFooter>
                  <ItemPrice>{item.price ? item.price.toLocaleString() : '- '}원</ItemPrice>
                  <ItemState
                    state={item.state}>
                    {setState(item.state)}
                  </ItemState>
                </ItemFooter>
              </Item>
              {!((index + 1) % 4) && <Line />}
              <MobileItem onClick={() => history.push(`/market/${path}/${item.id}`)}>
                <MobileItemInfo>
                  <ItemTitleContainer>
                    [{setState(item.state)}]
                    <ItemTitleContent>{item.title}</ItemTitleContent>
                    {setDate(item.created_at)[1] &&
                      <NewTag src={"https://static.koreatech.in/upload/7f2af097aeeca368b0a491f9e00f80ca.png"}/>
                    } 
                  </ItemTitleContainer>
                  <ItemInfo>
                    <span>조회 {item.hit} ·</span>
                    <span> {item.nickname}</span>
                  </ItemInfo>
                  <ItemPrice>{item.price ? item.price.toLocaleString() : '- '}원</ItemPrice>

                </MobileItemInfo>
                <ItemThumbnailContainer>
                  {item.thumbnail
                    ? <ThumbnailImage src={item.thumbnail} />
                    : <NoImage>No Image</NoImage>
                  }
                </ItemThumbnailContainer>
              </MobileItem>
            </Fragment>
          )}
        </Row>
      </List>
      <Pagination
        totalPageNum={totalPageNum}
        setPageData={isMyItems ? getMyItemList : getItemList}
        isWriteBtn={true}
        writeBtnLink={`/market/${path}/register`}
        path={path}
        isMyItems={isMyItems}
        history={history}
      />
    </>
  )
}
