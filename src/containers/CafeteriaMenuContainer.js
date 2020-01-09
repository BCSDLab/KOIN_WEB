import React, {useState, useEffect, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import CafeteriaMenu from "../components/CafeteriaMenu";

export default function CafeteriaMenuContainer() {
  const [today] = useState(new Date());
  const [date, setToday] = useState(today.toISOString());

  const clickPrev = () => {
    today.setDate(today.getDate() - 1);
    setToday(today.toISOString());

  };

  const clickNext = () => {
    today.setDate(today.getDate() + 1);
    setToday(today.toISOString());

  };

  useEffect(() => {

  });

  return (
    <CafeteriaMenu
      date={date}
      clickPrev={clickPrev}
      clickNext={clickNext}/>
  )
}
