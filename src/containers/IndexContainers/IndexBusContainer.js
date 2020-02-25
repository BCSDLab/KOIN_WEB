import React, {useEffect, useState} from "react";
import IndexBus from "../../components/IndexComponents/IndexBus";
import useInterval from "../../hooks/useInterval";
import setBusTime from "../../modules/setBusTime";
import {getBusInfo} from "../../modules/bus";
import {useDispatch, useSelector} from "react-redux";

export default function IndexBusContainer({history}) {
  const dispatch = useDispatch();
  const busTypes = ["shuttle","daesung","cityBus"];
  const [selectedType, setSelectedType] = useState("shuttle");
  const [depart, setDepart] = useState("한기대");
  const [arrival, setArrival] = useState("야우리");

  const [fastestShuttleTime, setFastestShuttleTime] = useState(0);
  const [fastestDaesungTime, setFastestDaesungTime] = useState(0);
  const [nextFastestShuttleTime, setNextFastestShuttleTime] = useState(0);
  const [nextFastestDaesungTime, setNextFastestDaesungTime] = useState(0);
  const [shuttleTime, setShuttleTime] = useState([{ "hour": 0, "minute": 0}, { "hour": 0, "minute": 0}]);
  const [daesungTime, setDaesungTime] = useState([{ "hour": 0, "minute": 0}, { "hour": 0, "minute": 0}]);
  const {data} = useSelector(state => state.busReducer.cityBusData);
  const [isCityBus, setIsCityBus] = useState(false)

  useInterval(() => {
    setBusTime(depart+arrival, setFastestShuttleTime, setNextFastestShuttleTime, setFastestDaesungTime, setNextFastestDaesungTime, setShuttleTime, setDaesungTime);
  },1000);

  function changeEnglish (place) {
    switch (place) {
      case '한기대':
        return "koreatech";
      case '야우리':
        return "terminal";
    }
  }

  const shiftDestination = () => {
    setDepart(arrival);
    setArrival(depart);
  };

  useEffect(() => {
    dispatch(getBusInfo(changeEnglish(depart), changeEnglish(arrival)));
    setBusTime(depart+arrival, setFastestShuttleTime, setNextFastestShuttleTime, setFastestDaesungTime, setNextFastestDaesungTime, setShuttleTime, setDaesungTime);
  },[arrival])

  useEffect(() => {
    if(selectedType === "cityBus"){
      dispatch(getBusInfo(changeEnglish(depart), changeEnglish(arrival)));
      setIsCityBus(true);
    }
    else setIsCityBus(false);
  },[selectedType]);

  useInterval(() => {
    dispatch(getBusInfo(changeEnglish(depart), changeEnglish(arrival)));
  }, (isCityBus? 1000 : null));

  return (
    <IndexBus
      busTypes={busTypes}
      selectedType={selectedType}
      setSelectedType={setSelectedType}
      depart={depart}
      arrival={arrival}
      shiftDestination={shiftDestination}
      shuttleTime={shuttleTime}
      daesungTime={daesungTime}
      fastestShuttleTime={fastestShuttleTime}
      fastestDaesungTime={fastestDaesungTime}
      cityBusData={data}
      history={history}/>
  )
}
