import React, {useState, useEffect, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import CafeteriaMenu from "../components/CafeteriaMenu";
import {getCafeteriaMenu} from "../modules/cafeteriaMenu"

export default function CafeteriaMenuContainer() {
  const getApiDate = (dateString) => {
    return String(dateString.slice(2,4)) + dateString.slice(5,7) + dateString.slice(8,10)
  };
  const [today] = useState(new Date());
  const [dateString, setDateString] = useState(today.toISOString());
  const dispatch = useDispatch();
  const cafeteriaList = ["한식","일품식","양식","특식","능수관","수박여","2캠퍼스"];
  const [apiToday, setApiToday] = useState(String(getApiDate(dateString)));
  const {data, loading, error} = useSelector(state => state.cafeteriaMenuReducer.cafeteriaMenus);
  const breakfast = [];
  const lunch = [];
  const dinner = [];

  const clickPrev = useCallback( date => {
    today.setDate(today.getDate() - 1);
    setDateString(today.toISOString());
  }, [dispatch]);

  const clickNext = () => {
    today.setDate(today.getDate() + 1);
    setDateString(today.toISOString());
  };

  useEffect(() => {
    dispatch(getCafeteriaMenu(apiToday));
  }, [dispatch]);

  return (
    <CafeteriaMenu
      date={dateString}
      clickPrev={clickPrev}
      clickNext={clickNext}
      cafeteriaList={cafeteriaList}
      cafeteriaMenus={data}/>
  )
}
