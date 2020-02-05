import React, {useState, useLayoutEffect, useEffect, useCallback} from 'react';
import StoreList from '../components/StoreList';

export default function StoreListContainer () {
  const [mobileFlag, setMobileFlag] = useState(true);
  const [tag, setTag] = useState(sessionStorage.getItem("storeCategory") || "ALL");
  // 이진수로 체크한다. 계좌이체 / 카드결제 / 배달 순
  const [filter, setFilter] = useState(Number(sessionStorage.getItem("storeFilter")) || 0);
  const selectCategory = useCallback( tag => {
    setTag(prevState => {
      const nowTag = prevState === tag ? "ALL" : tag;
      sessionStorage.setItem("storeCategory", nowTag);
      return nowTag
    });
  }, [setTag]);
  const selectFilter = useCallback( index => {
    setFilter(prevState => {
      const selectedIndex = index ? index * 2 : 1;
      const nowFilter = prevState ^ selectedIndex;
      sessionStorage.setItem("storeFilter", nowFilter ? nowFilter : prevState);
      return nowFilter
    });
  }, [setFilter]);

  useEffect(() => {
    sessionStorage.setItem("storeNewFlag", false);
  }, []);

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
}