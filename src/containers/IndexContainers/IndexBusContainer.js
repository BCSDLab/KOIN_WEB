import React, {useEffect, useState} from "react";
import IndexBus from "../../components/IndexComponents/IndexBus";
import useInterval from "../../hooks/useInterval";
import setBusTime from "../../modules/setBusTime";
import {getBusInfo} from "../../modules/bus";
import {useDispatch, useSelector} from "react-redux";

export default function IndexBusContainer({history}) {
  const dispatch = useDispatch();
  const busTypes = ["shuttle","daesung","cityBus"];
  const [depart, setDepart] = useState("한기대");
  const [arrival, setArrival] = useState("야우리");
  const [daesungDepart, setDaesungDepart] = useState("한기대");
  const [daesungArrival, setDaesungArrival] = useState("야우리");
  const [cityDepart, setCityDepart] = useState("한기대");
  const [cityArrival, setCityArrival] = useState("야우리");

  const [fastestShuttleTime, setFastestShuttleTime] = useState(0);
  const [fastestDaesungTime, setFastestDaesungTime] = useState(0);
  const [nextFastestShuttleTime, setNextFastestShuttleTime] = useState(0);
  const [nextFastestDaesungTime, setNextFastestDaesungTime] = useState(0);
  const [shuttleTime, setShuttleTime] = useState([{ "hour": 0, "minute": 0}, { "hour": 0, "minute": 0}]);
  const [daesungTime, setDaesungTime] = useState([{ "hour": 0, "minute": 0}, { "hour": 0, "minute": 0}]);
  const {data} = useSelector(state => state.busReducer.cityBusData);

  useInterval(() => {
    setBusTime(depart+arrival, daesungDepart+daesungArrival, setFastestShuttleTime, setNextFastestShuttleTime, setFastestDaesungTime, setNextFastestDaesungTime, setShuttleTime, setDaesungTime);
  },1000);

  function changeEnglish (place) {
    switch (place) {
      case '한기대':
        return "koreatech";
      case '야우리':
        return "terminal";
      default:
        return "koreatech";
    }
  }

  const shiftDestination = (index) => {
    switch(index){
      case 0:
        setDepart(arrival);
        setArrival(depart);
        break;
      case 1:
        setDaesungDepart(daesungArrival);
        setDaesungArrival(daesungDepart);
        break;
      case 2:
        setCityDepart(cityArrival);
        setCityArrival(cityDepart);
        break;
    }
  };

  useEffect(() => {
    dispatch(getBusInfo(changeEnglish(cityDepart), changeEnglish(cityArrival)));
    console.log(depart+arrival)
    setBusTime(depart+arrival, daesungDepart+daesungArrival ,setFastestShuttleTime, setNextFastestShuttleTime, setFastestDaesungTime, setNextFastestDaesungTime, setShuttleTime, setDaesungTime);
  },[arrival, daesungArrival, cityArrival])

  useEffect(() => {
    dispatch(getBusInfo(changeEnglish(cityDepart), changeEnglish(cityArrival)));
  },[]);

  useInterval(() => {
    dispatch(getBusInfo(changeEnglish(cityDepart), changeEnglish(cityArrival)));
  }, 1000);

  return (
    <IndexBus
      busTypes={busTypes}
      depart={depart}
      arrival={arrival}
      daesungDepart={daesungDepart}
      daesungArrival={daesungArrival}
      cityDepart={cityDepart}
      cityArrival={cityArrival}
      shiftDestination={shiftDestination}
      shuttleTime={shuttleTime}
      daesungTime={daesungTime}
      fastestShuttleTime={fastestShuttleTime}
      fastestDaesungTime={fastestDaesungTime}
      cityBusData={data}
      history={history}/>
  )
}
