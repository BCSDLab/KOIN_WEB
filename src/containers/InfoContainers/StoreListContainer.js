import React, {useState, useLayoutEffect, useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useInterval from "../../hooks/useInterval";
import {getStoreList, getRandomPromotion, shuffleStoreList} from '../../modules/store';
import StoreList from '../../components/InfoComponents/StoreList';
import StoreBanner from "../../components/InfoComponents/StoreBanner";
import useMobileFlag from "../../hooks/useMobileFlag";

export default function StoreListContainer () {
  const [tag, setTag] = useState(sessionStorage.getItem("storeCategory") || "ALL");
  // 이진수로 체크한다. 계좌이체 / 카드결제 / 배달 순
  const [filter, setFilter] = useState(Number(sessionStorage.getItem("storeFilter")) || 0);
  const dispatch = useDispatch();
  const { stores: { data, loading, error }, promotion: { promotionData } } = useSelector(state => state.storeReducer);

  const history = useHistory();
  const mobileFlag = useMobileFlag();

  const selectCategory = useCallback( tag => {
    setTag(prevState => {
      const nowTag = prevState === tag ? "ALL" : tag;
      sessionStorage.setItem("storeCategory", nowTag);
      return nowTag
    });
  }, [dispatch]);

  const selectFilter = useCallback( index => {
    setFilter(prevState => {
      const selectedIndex = index ? index * 2 : 1;
      const nowFilter = prevState ^ selectedIndex;
      sessionStorage.setItem("storeFilter", nowFilter ? nowFilter : prevState);
      return nowFilter
    });
  }, [dispatch]);

  const handleStoreEvent = useCallback((event, link) => {
    event.preventDefault();
    history.push(`/board/promotion/${link}`);
  }, [history]);

  const convertEventDDay = useCallback(endDate => {
    const nowTime = Date.now();
    const endTime = new Date(endDate).getTime();
    const DDay = Math.ceil((endTime - nowTime) / (1000 * 3600 * 24));

    return DDay > 7 ?
      '진행중' :
      `마감 D-${DDay}`
  }, []);

  useInterval(()=> {dispatch(getRandomPromotion())}, 5000);

  useEffect(() => {
    return () => {
      sessionStorage.setItem("storeNewFlag", JSON.stringify(true));
    };
  }, [dispatch]);

  useEffect(() => {
    if(JSON.parse(sessionStorage.getItem("storeNewFlag")) === true || data.length === 0) {
      async function getStores() {
        await dispatch(getStoreList());
        dispatch(shuffleStoreList());
      }
      getStores();
      console.log("refresh StoreList");
    } else if (JSON.parse(sessionStorage.getItem("storeNewFlag")) !== false) {
      dispatch(shuffleStoreList());
      console.log("shuffle StoreList");
    }
    dispatch(getRandomPromotion())
  }, [dispatch]);



  return (
    <StoreList
      mobileFlag={mobileFlag}
      tag={tag}
      filter={filter}
      storeList = {data}
      selectCategory={selectCategory}
      selectFilter={selectFilter}
      handleStoreEvent={handleStoreEvent}
      convertEventDDay={convertEventDDay} >
      {promotionData !== null && promotionData !== "" && (
        <StoreBanner
          promotionData={promotionData} />
      )}
    </StoreList>
  )
}
