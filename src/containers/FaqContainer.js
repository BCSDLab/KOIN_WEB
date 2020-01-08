import React, {useState, useEffect, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import Faq from "../components/Faq";
import {getFaqList} from "../modules/faq"

export default function FaqContainer() {
  const [totalPageNum] = useState(4);
  const [nowPageNum, setNowPageNum] = useState(1);
  const {filteredData, loading, error} = useSelector(state => state.faqReducer.faqs)

  const dispatch = useDispatch();

  const clickPrevButton = () => {
    if (nowPageNum === 1) {
      alert("첫 페이지입니다.");
    } else setPage(nowPageNum - 1);
  };

  const clickNextButton = () => {
    if (nowPageNum === 4) {
      alert("마지막 페이지입니다.");
    } else setPage(nowPageNum + 1);
  };

  const clickPageNum = (n) => () => {
    setPage(n)
  };

  const setPage = useCallback(page => {
    setNowPageNum(page);
    dispatch(getFaqList(page));
  }, [dispatch, getFaqList]);

  useEffect(() => {
    dispatch(getFaqList(nowPageNum));
  }, [dispatch]);

  return (
    <Faq
      faqList={filteredData}
      loading={loading}
      error={error}
      totalPageNum={totalPageNum}
      nowPageNum={nowPageNum}
      clickPrevButton={clickPrevButton}
      clickNextButton={clickNextButton}
      clickPageNum={clickPageNum}/>
  )
}
