import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPromotions } from '../../modules/promotion'
import Header from '../../components/BoardComponents/Header';
import ButtonGroup from '../../components/BoardComponents/ButtonGroup'
import PromotionList from '../../components/PromotionComponents/PromotionList';

export default function PromotionListContainer ({history, match}) {
  const dispatch = useDispatch();

  const [todayTime, setTodayTime] = useState(new Date().getTime())
  //이진수로 체크한다. 진행중 이벤트 / 종료된 이벤트 순.
  const [filter, setFilter] = useState(3);
  const { loading, error, data, totalPageNum } = useSelector(state => state.promotionReducer.posts);

  const getPromotionList = (page, filter) => {
    let filterType;
    switch (filter) {
      case 1:
        filterType = 'Closed';
        break;
      case 2:
        filterType = 'Pending';
        break;
      case 3:
        filterType = 'All';
        break;
      default:
        return;
    }

    dispatch(getPromotions({
      pageNum: page,
      filter: filterType
    }))

    setTodayTime((new Date().getTime()));
  };

  const changeFilter = (prevFilter, index) => {
    console.log("Checkbox 클릭", index);
    const nowFilter = (prevFilter ^ index) ? (prevFilter ^ index) : prevFilter;
    setFilter(nowFilter);
    getPromotionList(1, nowFilter);
  };
  const checkDisabled = endDateString => {
    const endDate = new Date(endDateString);
    endDate.setHours(0);
    endDate.setDate(endDate.getDate() + 1);
    return endDate.getTime() <= todayTime
  }

  useEffect(() => {
    console.log("홍보게시판 진입");
    sessionStorage.setItem("boardId", 11);
    if (!sessionStorage.getItem("bpn")) {
      console.log("세션에 페이지 없을 때");
      getPromotionList(1, filter);
      const boardPageNum = {
        'free': 1,
        'job': 1,
        'anonymous': 1,
        'question': 1,
        'notice': 1,
        'promotion': 1
      }
      sessionStorage.setItem("bpn", JSON.stringify(boardPageNum));
    } else {
      console.log("세션에 페이지 있을 때");
      const boardPageNum = JSON.parse(sessionStorage.getItem("bpn"));
      getPromotionList(boardPageNum.promotion, filter);
    }
    console.log(totalPageNum)
  }, []);
  return (
    <>
      <Header
        match={match}
        history={history}>
        <ButtonGroup
          match={match}
          history={history}
        />
      </Header>
      <PromotionList
        history={history}
        path={match.params.type}
        loading={loading}
        error={error}
        totalPageNum={totalPageNum}
        getPromotionList={getPromotionList}
        promotions={data}
        filter={filter}
        changeFilter={changeFilter}
        checkDisabled={checkDisabled} />
    </>
  )
}
