import React, {useState, useLayoutEffect, useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useInterval from "../hooks/useInterval";
import {getStoreList, filterStoreList, getRandomPromotion} from '../modules/store';
import StoreList from '../components/StoreList';
import StoreBanner from "../components/StoreBanner";

export default function StoreListContainer () {
  const [mobileFlag, setMobileFlag] = useState(true);
  const [tag, setTag] = useState(sessionStorage.getItem("storeCategory") || "ALL");
  // 이진수로 체크한다. 계좌이체 / 카드결제 / 배달 순
  const [filter, setFilter] = useState(Number(sessionStorage.getItem("storeFilter")) || 0);
  const dispatch = useDispatch();
  const { filteredData, loading, error, promotionData } = useSelector(state => state.storeReducer.stores);

  const history = useHistory();

  const selectCategory = useCallback( tag => {
    setTag(prevState => {
      const nowTag = prevState === tag ? "ALL" : tag;
      sessionStorage.setItem("storeCategory", nowTag);
      dispatch(filterStoreList(nowTag, undefined));
      return nowTag
    });
  }, [dispatch]);

  const selectFilter = useCallback( index => {
    setFilter(prevState => {
      const selectedIndex = index ? index * 2 : 1;
      const nowFilter = prevState ^ selectedIndex;
      sessionStorage.setItem("storeFilter", nowFilter ? nowFilter : prevState);
      dispatch(filterStoreList(undefined,nowFilter));
      return nowFilter
    });
  }, [dispatch]);

  const handleStoreEvent = useCallback((event, link) => {
    event.preventDefault();
    history.push(`/board/promotion/${link}`);
  }, [history]);

  useInterval(()=> {dispatch(getRandomPromotion())}, 5000)

  useEffect(() => {
    return () => {
      sessionStorage.setItem("storeNewFlag", JSON.stringify(true));
    };
  }, [dispatch]);

  useEffect(() => {
    if(JSON.parse(sessionStorage.getItem("storeNewFlag")) === true || filteredData.length === 0) {
      dispatch(getStoreList(tag, filter));
      console.log("refresh StoreList");
    } else if (JSON.parse(sessionStorage.getItem("storeNewFlag")) !== false) {
      dispatch(filterStoreList());
      console.log("shuffle StoreList");
    }
    dispatch(getRandomPromotion())
  }, [dispatch]);

  useLayoutEffect(() => {
    function updateSize () {
      setMobileFlag(window.innerWidth < 576)
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize)
  }, []);



  return (
    <StoreList
      mobileFlag={mobileFlag}
      tag={tag}
      filter={filter}
      storeList = {filteredData}
      selectCategory={selectCategory}
      selectFilter={selectFilter}
      handleStoreEvent={handleStoreEvent} >
      {promotionData !== null && promotionData !== undefined && (
        <StoreBanner
          promotionData={promotionData} />
      )}
    </StoreList>
  )
}