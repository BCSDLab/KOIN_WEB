import React, {useState, useEffect, useCallback, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import BusLookUp from "../components/BusLookUp";
import BusTimeTable from "../components/BusTimeTable";
import setBusTime from "../modules/setBusTime";
import {getBusInfo} from "../modules/bus";

export default function BusContainer() {
  const [departList, setDepartList] = useState(["한기대","야우리","천안역"]);
  const [arrivalList, setArrivalList] = useState(["야우리","한기대","천안역"]);
  const [fastestShuttleTime, setFastestShuttleTime] = useState(0);
  const [fastestDaesungTime, setFastestDaesungTime] = useState(0);
  const [nextFastestShuttleTime, setNextFastestShuttleTime] = useState(0);
  const [nextFastestDaesungTime, setNextFastestDaesungTime] = useState(0);
  const [shuttleTime, setShuttleTime] = useState([{ "hour": 0, "minute": 0}, { "hour": 0, "minute": 0}]);
  const [daesungTime, setDaesungTime] = useState([{ "hour": 0, "minute": 0}, { "hour": 0, "minute": 0}]);
  const {data, loading, error} = useSelector(state => state.busReducer.cityBusData);
  const dispatch = useDispatch();

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

  function changeEnglish (place) {
    switch (place) {
      case '한기대':
        return "koreatech";
      case '야우리':
        return "terminal";
      case '천안역':
        return "station";
    }
  }

  useInterval(() => {
    dispatch(getBusInfo(changeEnglish(departList[0]), changeEnglish(arrivalList[0])));
    setBusTime(departList[0]+arrivalList[0], setFastestShuttleTime, setNextFastestShuttleTime, setFastestDaesungTime, setNextFastestDaesungTime, setShuttleTime, setDaesungTime);
  },1000);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useEffect(() => {
    dispatch(getBusInfo(changeEnglish(departList[0]), changeEnglish(arrivalList[0])));
    setBusTime(departList[0]+arrivalList[0], setFastestShuttleTime, setNextFastestShuttleTime, setFastestDaesungTime, setNextFastestDaesungTime, setShuttleTime, setDaesungTime);
  }, [departList, arrivalList, dispatch]);

  return (
    <div>
      <BusLookUp
        departList={departList}
        arrivalList={arrivalList}
        selectDepart={selectDepart}
        selectArrival={selectArrival}
        fastestShuttleTime={fastestShuttleTime}
        nextFastestShuttleTime={nextFastestShuttleTime}
        fastestDaesungTime={fastestDaesungTime}
        nextFastestDaesungTime={nextFastestDaesungTime}
        shuttleTime={shuttleTime}
        daesungTime={daesungTime}
        cityBusData={data}/>
      <BusTimeTable/>
    </div>
  )
}
