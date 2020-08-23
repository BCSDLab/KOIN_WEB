import React, {useState, useEffect, useCallback, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import BusLookUp from "../../components/InfoComponents/BusLookUp";
import BusTimeTable from "../../components/InfoComponents/BusTimeTable";
import setBusTime from "../../modules/setBusTime";
import {getBusInfo} from "../../modules/bus";
import {semesterTimeTable, vacationTimeTable} from "../../static/shuttleBusTimeTable";
import useInterval from "../../hooks/useInterval";

export default function BusContainer() {

  // BusLookUp.js
  const [departList, setDepartList] = useState(["한기대","야우리","천안역"]);
  const [arrivalList, setArrivalList] = useState(["야우리","한기대","천안역"]);
  const [fastestShuttleTime, setFastestShuttleTime] = useState(0);
  const [fastestDaesungTime, setFastestDaesungTime] = useState(0);
  const [nextFastestShuttleTime, setNextFastestShuttleTime] = useState(0);
  const [nextFastestDaesungTime, setNextFastestDaesungTime] = useState(0);
  const [shuttleTime, setShuttleTime] = useState([{ "hour": 0, "minute": 0}, { "hour": 0, "minute": 0}]);
  const [daesungTime, setDaesungTime] = useState([{ "hour": 0, "minute": 0}, { "hour": 0, "minute": 0}]);
  const {data, loading, error} = useSelector(state => state.busReducer.cityBusData);

  // BusTimeTable.js
  const vacationFlag = true;

  const [selectedTab, setSelectedTab] = useState("학교셔틀");
  const [shuttleTimeTable, setShuttleTimeTable] = useState(semesterTimeTable);
  const [shuttleTimeTableTitle, setShuttleTimeTableTitle] = useState(semesterTimeTable[0].title);
  const [daesungTimeTableTitle, setDaesungTimeTableTitle] = useState("학교 -> 야우리");

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
    setBusTime(departList[0]+arrivalList[0],departList[0]+arrivalList[0], setFastestShuttleTime, setNextFastestShuttleTime, setFastestDaesungTime, setNextFastestDaesungTime, setShuttleTime, setDaesungTime);
  },1000);

  useEffect(() => {
    dispatch(getBusInfo(changeEnglish(departList[0]), changeEnglish(arrivalList[0])));
    setBusTime(departList[0]+arrivalList[0],departList[0]+arrivalList[0], setFastestShuttleTime, setNextFastestShuttleTime, setFastestDaesungTime, setNextFastestDaesungTime, setShuttleTime, setDaesungTime);
  }, [departList, arrivalList, dispatch]);

  useEffect(() => {
    setIsVacation(vacationFlag);
  }, [shuttleTimeTable]);

  const selectTab = (tab) => () =>{
    setSelectedTab(tab);
  };

  const setIsVacation = (vacationFlag) => {
    vacationFlag ? setShuttleTimeTable(vacationTimeTable) : setShuttleTimeTable(semesterTimeTable);
  };

  const setShuttleDropDownTitle = (title) => () => {
    setShuttleTimeTableTitle(title);
  };

  const setDaesungDropDownTitle = (title) => () => {
    setDaesungTimeTableTitle(title);
  };

  useEffect(() => {
    console.log(shuttleTimeTable)
    setShuttleTimeTableTitle(shuttleTimeTable[0].title)
  },[shuttleTimeTable]);

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
      <BusTimeTable
        tabs={["학교셔틀","대성고속","시내버스"]}
        vacationFlag={vacationFlag}
        selectedTab={selectedTab}
        selectTab={selectTab}
        shuttleTimeTable={shuttleTimeTable}
        shuttleTimeTableTitle={shuttleTimeTableTitle}
        setShuttleDropDownTitle={setShuttleDropDownTitle}
        daesungTimeTable={["학교 -> 야우리","야우리 -> 학교"]}
        daesungTimeTableTitle={daesungTimeTableTitle}
        setDaesungDropDownTitle={setDaesungDropDownTitle}
        />
    {/*  TODO : add mobile! */}
    </div>
  )
}
