import React, {useCallback, useEffect, useRef, useState} from "react";
import IndexCafeteria from "../../components/IndexComponents/IndexCafeteria";
import {useDispatch, useSelector} from "react-redux";
import {getCafeteriaMenu} from "../../modules/cafeteriaMenu";

export default function IndexCafeteriaContainer({history}) {
  const [selected, setSelected] = useState(0);
  const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
  const today = useRef(new Date(Date.now() - timezoneOffset));
  const realTime = useRef(new Date());
  const { data } = useSelector(state => state.cafeteriaMenuReducer.cafeteriaMenus);
  const dispatch = useDispatch();
  const [allMenus, setAllMenus] = useState([[],[],[],[]]);
  const [type, setType] = useState(0);

  function getApiDate(dateString) {
    return String(dateString.slice(2,4)) + dateString.slice(5,7) + dateString.slice(8,10)
  }
  const setTime = useCallback(() => {
    const hour = realTime.current?.getHours()
    if(hour < 9){
      setType(0)
    }
    else if (hour < 14){
      setType(1)
    }
    else setType(2)
  }, [])

  useEffect(() => {
    dispatch(getCafeteriaMenu(getApiDate(today.current?.toISOString())));
    setTime();
  }, [dispatch, setTime]);

  useEffect(() => {
    setMenus();
  },[data, setMenus])

  function setMenuByType (place, menus) {
    if(menus.type === "BREAKFAST"){
      place.splice(0,1,menus.menu);
    }
    if(menus.type === "LUNCH"){
      place.splice(1,1,menus.menu);
    }
    if(menus.type === "DINNER"){
      place.splice(2,1,menus.menu);
    }
  }

  const setMenus = useCallback(() => {
    let corseA = ["","",""];
    let corseB = ["","",""];
    let corseC = ["","",""];
    let neungSu = ["","",""];

    data.map((menus)=> {
      console.log(menus)
      if(menus.place === "A코너"){
        setMenuByType(corseA, menus)
      }
      if(menus.place === "B코너"){
        setMenuByType(corseB, menus)
      }
      if(menus.place === "C코너"){
        setMenuByType(corseC, menus)
      }
      if(menus.place === "능수관"){
        setMenuByType(neungSu, menus)
      }
    })
    setAllMenus([corseA, corseB, corseC, neungSu]);
  })

  return (
    <IndexCafeteria
      history={history}
      cafeteriaList={["A코너","B코너","C코너","능수관"]}
      selected={selected}
      setSelected={setSelected}
      type={type}
      setType={setType}
      allMenus={allMenus}/>
  )
}
