import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import CafeteriaMenu from "../../components/InfoComponents/CafeteriaMenu";
import {getCafeteriaMenu} from "../../modules/cafeteriaMenu";

export default function CafeteriaMenuContainer() {
  const timezoneOffset = new Date().getTimezoneOffset() * 60000;
  const [today,setToday] = useState(new Date(Date.now() - timezoneOffset));
  const dispatch = useDispatch();
  const cafeteriaList = ["A코너","B코너","C코너","능수관","2캠퍼스"];
  const {data, loading, error} = useSelector(state => state.cafeteriaMenuReducer.cafeteriaMenus);

  function getApiDate(dateString) {
    return String(dateString.slice(2,4)) + dateString.slice(5,7) + dateString.slice(8,10)
  }

  const clickPrev = () => {
    setToday(new Date(today.getTime() - 24*60*60*1000));
    dispatchAction(new Date(today.getTime() - 24*60*60*1000))
  };

  function dispatchAction(date){
    dispatch(getCafeteriaMenu(getApiDate(date.toISOString())))
  }

  const clickNext = () => {
    setToday(new Date(today.getTime() + 24*60*60*1000));
    dispatchAction(new Date(today.getTime() + 24*60*60*1000))
  };

  useEffect(() => {
    dispatch(getCafeteriaMenu(getApiDate(today.toISOString())));
  }, [dispatch]);

  return (
    <CafeteriaMenu
      date={today.toISOString()}
      clickPrev={clickPrev}
      clickNext={clickNext}
      cafeteriaList={cafeteriaList}
      cafeteriaMenus={data}/>
  )
}
