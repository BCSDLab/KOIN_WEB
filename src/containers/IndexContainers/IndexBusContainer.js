import React, {useEffect, useRef, useState} from "react";
import IndexBus from "../../components/IndexComponents/IndexBus";
import useInterval from "../../hooks/useInterval";
import setBusTime from "../../modules/setBusTime";
import {getBusInfo, getTerm} from "../../modules/bus";
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
  const {term} = useSelector(state => state.busReducer.term);

  const sliderRef = useRef();
  const [mobileTypes, setMobileTypes] = useState(["cityBus","shuttle","daesung"]);

  useInterval(() => {
    if(term) {
      setBusTime(depart + arrival, daesungDepart + daesungArrival, setFastestShuttleTime, setNextFastestShuttleTime, setFastestDaesungTime, setNextFastestDaesungTime, setShuttleTime, setDaesungTime, term);
    }
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

  const shiftDestination = (type) => {
    console.log(type)
    switch(type){
      case "shuttle":
        setDepart(arrival);
        setArrival(depart);
        break;
      case "daesung":
        setDaesungDepart(daesungArrival);
        setDaesungArrival(daesungDepart);
        break;
      case "cityBus":
        setCityDepart(cityArrival);
        setCityArrival(cityDepart);
        break;
    }
  };

  useEffect(() => {
    dispatch(getBusInfo(changeEnglish(cityDepart), changeEnglish(cityArrival)));
    setBusTime(depart + arrival, daesungDepart + daesungArrival, setFastestShuttleTime, setNextFastestShuttleTime, setFastestDaesungTime, setNextFastestDaesungTime, setShuttleTime, setDaesungTime, term);
  },[arrival, daesungArrival, cityArrival])

  useEffect(() => {
    if(term) {
      setBusTime(depart + arrival, daesungDepart + daesungArrival, setFastestShuttleTime, setNextFastestShuttleTime, setFastestDaesungTime, setNextFastestDaesungTime, setShuttleTime, setDaesungTime, term);
    }
  }, [term])

  useEffect(() => {
    dispatch(getBusInfo(changeEnglish(cityDepart), changeEnglish(cityArrival)));
    dispatch(getTerm())
    sliderRef.current.scrollLeft = (window.innerWidth*0.75 - (window.innerWidth - window.innerWidth*0.75) / 2);

    let walk;
    let startX;
    let scrollValue;

    function slideTouchStart (e){
      startX = e.touches[0].pageX - sliderRef.current.offsetLeft;
      scrollValue = sliderRef.current.scrollLeft;

    }

    function slideTouchEnd (){
      if(walk) {
        sliderRef.current.scrollLeft = (window.innerWidth*0.75 - (window.innerWidth - window.innerWidth*0.75) / 2);
        if (walk < 0) {
          if (walk < -120) {
            setMobileTypes((state) => state.slice(1, 3).concat(state[0]))
          }
        } else if (walk > 0) {
          if (walk > 120) {
            setMobileTypes((state) => [state[2]].concat(state.slice(0, 2)))
          }
        }
      }
      console.log(walk)
      walk = 0;
    }

    function slideTouchCancel (){
      if(walk) {
        sliderRef.current.scrollLeft = (window.innerWidth*0.75 - (window.innerWidth - window.innerWidth*0.75) / 2);
        if (walk < 0) {
          if (walk < -120) {
            setMobileTypes((state) => state.slice(1, 3).concat(state[0]))
          }
        } else if (walk > 0) {
          if (walk > 120) {
            setMobileTypes((state) => [state[2]].concat(state.slice(0, 2)))
          }
        }
      }
      walk = 0;
    }

    function slideTouchMove (e){
      e.preventDefault()
      walk = (e.touches[0].pageX - sliderRef.current.offsetLeft - startX) * 0.9;
      sliderRef.current.scrollLeft = scrollValue - walk;
    }

    sliderRef.current.addEventListener('touchstart', slideTouchStart);
    sliderRef.current.addEventListener('touchend', slideTouchEnd);
    sliderRef.current.addEventListener('touchmove', slideTouchMove);
    sliderRef.current.addEventListener('touchcancel', slideTouchCancel);

    return () => {if(sliderRef.current)sliderRef.current.removeEventListener('touchmove',slideTouchMove);}
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
      sliderRef={sliderRef}
      mobileTypes={mobileTypes}
      history={history}/>
  )
}
