import React, {useState, useEffect, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import BusLookUp from "../components/BusLookUp";
import BusTimeTable from "../components/BusTimeTable";

export default function BusContainer() {
  const [departList, setDepartList] = useState(["한기대","야우리","천안역"]);
  const [arrivalList, setArrivalList] = useState(["야우리","한기대","천안역"]);

  function switchDropDown(target, setFunction) {
    switch (target) {
      case "한기대": {
        setFunction(["한기대","야우리","천안역"]);
        break;
      }
      case "야우리": {
        setFunction(["야우리","한기대","천안역"]);
        break;
      }
      case "천안역": {
        setFunction(["천안역","한기대","야우리"]);
        break;
      }
    }
  }

  const selectDepart = (depart) => {
    if(depart === arrivalList[0]){
      switchDropDown(departList[0],setArrivalList)
    }
    switchDropDown(depart,setDepartList)
  };

  const selectArrival = (arrival) => {
    if(arrival === departList[0]){
      switchDropDown(arrivalList[0],setDepartList)
    }
    switchDropDown(arrival,setArrivalList)
  };



  return (
    <div>
      <BusLookUp
        departList={departList}
        arrivalList={arrivalList}
        selectDepart={selectDepart}
        selectArrival={selectArrival}/>
      <BusTimeTable/>
    </div>
  )
}
