import React, {useState, useEffect, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import CafeteriaMenu from "../components/CafeteriaMenu";
import {getCafeteriaMenu} from "../modules/cafeteriaMenu"
import {getCircleList} from "../modules/circle";

export default function CafeteriaMenuContainer() {
  const timezoneOffset = new Date().getTimezoneOffset() * 60000;
  const [today,setToday] = useState(new Date());
  const dispatch = useDispatch();
  const cafeteriaList = ["한식","일품식","양식","특식","능수관","수박여","2캠퍼스"];
  const {data, loading, error} = useSelector(state => state.cafeteriaMenuReducer.cafeteriaMenus);

  function getApiDate(dateString) {
    return String(dateString.slice(2,4)) + dateString.slice(5,7) + dateString.slice(8,10)
  }

  const clickPrev = () => {
    setToday(new Date(today.getTime() - 24*60*60*1000));
    dispatchAction(new Date(today.getTime() - 24*60*60*1000 - timezoneOffset))
  };

  function dispatchAction(date){
    dispatch(getCafeteriaMenu(getApiDate(date.toISOString())))
  }

  const clickNext = () => {
    setToday(new Date(today.getTime() + 24*60*60*1000));
    dispatchAction(new Date(today.getTime() + 24*60*60*1000 - timezoneOffset))
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
