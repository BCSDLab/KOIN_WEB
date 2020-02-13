import React, {useState, useLayoutEffect, useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getStoreList, shuffleStoreList, filterStoreList} from '../modules/store';
import StoreList from '../components/StoreList';
import Cookies from 'js-cookie';

export default function StoreListContainer () {
  const [mobileFlag, setMobileFlag] = useState(true);
  const [tag, setTag] = useState(sessionStorage.getItem("storeCategory") || "ALL");
  // 이진수로 체크한다. 계좌이체 / 카드결제 / 배달 순
  const [filter, setFilter] = useState(Number(sessionStorage.getItem("storeFilter")) || 0);
  const dispatch = useDispatch();
  const { filteredData, loading, error } = useSelector(state => state.storeReducer.stores);

  const selectCategory = useCallback( tag => {
    setTag(prevState => {
      const nowTag = prevState === tag ? "ALL" : tag;
      sessionStorage.setItem("storeCategory", nowTag);
      dispatch(filterStoreList(nowTag, undefined));
      return nowTag
    });
  }, [setTag]);

  const selectFilter = useCallback( index => {
    setFilter(prevState => {
      const selectedIndex = index ? index * 2 : 1;
      const nowFilter = prevState ^ selectedIndex;
      sessionStorage.setItem("storeFilter", nowFilter ? nowFilter : prevState);
      dispatch(filterStoreList(undefined,nowFilter));
      return nowFilter
    });
  }, [setFilter]);

  useEffect(() => {
    return () => Cookies.set("storeNewFlag", true);
  }, []);

  useEffect(() => {
    if(Cookies.get("storeNewFlag") === "true" || filteredData.length === 0) {
      dispatch(getStoreList(tag, filter));
      console.log("refresh StoreList");
    } else if (Cookies.get("storeNewFlag") !== "false") {
      dispatch(filterStoreList());
      console.log("shuffle StoreList");
    }
  }, [dispatch]);

  useLayoutEffect(() => {
    function updateSize () {
      setMobileFlag(window.innerWidth < 576)
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize)
  }, [])



  return <StoreList
    mobileFlag={mobileFlag}
    tag={tag}
    filter={filter}
    storeList = {filteredData}
    selectCategory={selectCategory}
    selectFilter={selectFilter} />
}