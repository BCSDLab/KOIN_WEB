import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getItems, getMyItems } from '../../modules/market';
import Items from '../../components/MarketComponents/Items';
import Header from '../../components/MarketComponents/Header';
import { useLastLocation } from 'react-router-last-location';
import ButtonGroup from '../../components/MarketComponents/ButtonGroup';

export default function MarketItemListContainer({ history, match }) {
  const dispatch = useDispatch();
  const { items, totalPageNum, numOfItems } = useSelector(state => state.marketReducer);
  const [marketId, setMarketId] = useState(-1);
  const [isMyItems, setIsMyItems] = useState(false);
  const lastLocation = useLastLocation();

  const getItemList = page => {
    dispatch(getItems({
      pageNum: page,
      marketId: sessionStorage.getItem("marketId")
    }));
    setIsMyItems(false);
  }

  const getMyItemList = page => {
    console.log(page);
    let marketPageNum = JSON.parse(sessionStorage.getItem("mpn"));
    marketPageNum[match.params.type] = 1;
    sessionStorage.setItem("mpn", JSON.stringify(marketPageNum));
    dispatch(getMyItems({
      pageNum: page,
      marketId: sessionStorage.getItem("marketId"),
      token: sessionStorage.getItem("token")
    }));
    setIsMyItems(true);
  }

  // 중고장터 진입 시
  useEffect(() => {
    setMarketId(sessionStorage.getItem("marketId"));
    if (!sessionStorage.getItem("mpn")) {
      console.log("세션에 페이지 없을 때");
      getItemList(1);
      const marketPageNum = {
        'sell': 1,
        'buy': 1,
      }
      sessionStorage.setItem("mpn", JSON.stringify(marketPageNum));
    } else {
      const marketPageNum = JSON.parse(sessionStorage.getItem("mpn"));
      getItemList(marketPageNum[match.params.type]);
    }
  }, []);

  // 팝니다 -> 삽니다, 삽니다 -> 팝니다 전환
  useEffect(() => {
    if (lastLocation && !lastLocation.pathname.indexOf('/market')) {
      if (!lastLocation.pathname.includes(match.url)) {
        console.log("팝->삽 || 삽->팝");
        setIsMyItems(false);
        const marketPageNum = JSON.parse(sessionStorage.getItem("mpn"));
        getItemList(marketPageNum[match.params.type]);
      }
    }
  }, [match]);

  return (
    <>
      <Header
        match={match}
        history={history}>
        <ButtonGroup
          history={history}
          match={match}
          isMyItems={isMyItems}
          getMyItemList={getMyItemList}
          getItemList={getItemList}
        />
      </Header>
      <Items
        history={history}
        path={match.params.type}
        items={items.data}
        isMyItems={isMyItems}
        loading={items.loading}
        totalPageNum={totalPageNum}
        numOfItems={numOfItems}
        getItemList={getItemList}
        getMyItemList={getMyItemList}
      />
    </>
    
  )
}
