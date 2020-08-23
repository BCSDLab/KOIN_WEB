import React, {useEffect, useState} from "react";
import IndexCafeteria from "../../components/IndexComponents/IndexCafeteria";
import {useDispatch, useSelector} from "react-redux";
import {getCafeteriaMenu} from "../../modules/cafeteriaMenu";

export default function IndexCafeteriaContainer({history}) {
  const [selected, setSelected] = useState(0);
  const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
  const today = new Date(Date.now() - timezoneOffset);
  const realTime = new Date;
  const { data } = useSelector(state => state.cafeteriaMenuReducer.cafeteriaMenus);
  const dispatch = useDispatch();
  const [allMenus, setAllMenus] = useState([[],[],[],[]]);
  const [type, setType] = useState(0);

  function getApiDate(dateString) {
    return String(dateString.slice(2,4)) + dateString.slice(5,7) + dateString.slice(8,10)
  }
  function setTime() {
    const hour = realTime.getHours()
    if(hour < 9){
      setType(0)
    }
    else if (hour < 14){
      setType(1)
    }
    else setType(2)
  }

  useEffect(() => {
    dispatch(getCafeteriaMenu(getApiDate(today.toISOString())));
    setTime();
  }, [dispatch]);

  useEffect(() => {
    setMenus();
  },[data])

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

  function setMenus() {
    let koreanFood = ["","",""];
    let oneDishFood = ["","",""];
    let westernFood = ["","",""];
    let specialFood = ["","",""];

    data.map((menus)=> {
      console.log(menus)
      if(menus.place === "한식"){
        setMenuByType(koreanFood, menus)
      }
      if(menus.place === "일품식"){
        setMenuByType(oneDishFood, menus)
      }
      if(menus.place === "양식"){
        setMenuByType(westernFood, menus)
      }
      if(menus.place === "특식"){
        setMenuByType(specialFood, menus)
      }
    })
    setAllMenus([koreanFood,oneDishFood,westernFood,specialFood]);
  }

  useEffect(()=> {
    console.log(allMenus)
  },[allMenus])

  return (
    <IndexCafeteria
      history={history}
      cafeteriaList={["한식","일품","양식","특식"]}
      selected={selected}
      setSelected={setSelected}
      type={type}
      setType={setType}
      allMenus={allMenus}/>
  )
}
