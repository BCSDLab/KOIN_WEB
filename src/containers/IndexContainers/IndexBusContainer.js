import React, {useEffect, useRef, useState} from "react";
import IndexBus from "../../components/IndexComponents/IndexBus";
import useInterval from "../../hooks/useInterval";
import {getCityBusInfo, getShuttleBusInfo, getExpressBusInfo} from "../../modules/bus";
import {useDispatch, useSelector} from "react-redux";

export default function IndexBusContainer({history}) {
  const dispatch = useDispatch();
  const [depart, setDepart] = useState("한기대");
  const [arrival, setArrival] = useState("야우리");
  const [daesungDepart, setDaesungDepart] = useState("한기대");
  const [daesungArrival, setDaesungArrival] = useState("야우리");
  const [cityDepart, setCityDepart] = useState("한기대");
  const [cityArrival, setCityArrival] = useState("야우리");
  const {data: cityBusData} = useSelector(state => state.busReducer.cityBusData);
  const {data: shuttleBusData} = useSelector(state => state.busReducer.shuttleBusData);
  const {data: expressBusData} = useSelector(state => state.busReducer.expressBusData);

  const sliderRef = useRef();
  const [mobileTypes, setMobileTypes] = useState(["cityBus","shuttle","daesung"]);

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
      default:
        break;
    }
  };

  useEffect(() => {    
    dispatch(getShuttleBusInfo(changeEnglish(depart), changeEnglish(arrival)));
  },[dispatch, arrival, depart])

  useEffect(() => {
    dispatch(getExpressBusInfo(changeEnglish(daesungDepart), changeEnglish(daesungArrival)));
  },[dispatch, daesungArrival, daesungDepart])

  useEffect(() => {
    dispatch(getCityBusInfo(changeEnglish(cityDepart), changeEnglish(cityArrival)));
  },[dispatch, cityArrival, cityDepart])
  


  useEffect(() => {
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
  },[dispatch]);

  useInterval(() => {
    dispatch(getCityBusInfo(changeEnglish(cityDepart), changeEnglish(cityArrival)));
    dispatch(getShuttleBusInfo(changeEnglish(depart), changeEnglish(arrival)));
    dispatch(getExpressBusInfo(changeEnglish(daesungDepart), changeEnglish(daesungArrival)));
  }, 60000);

  return (
    <IndexBus
      depart={depart}
      arrival={arrival}
      daesungDepart={daesungDepart}
      daesungArrival={daesungArrival}
      cityDepart={cityDepart}
      cityArrival={cityArrival}
      shiftDestination={shiftDestination}
      shuttleBusData={shuttleBusData}
      expressBusData={expressBusData}
      cityBusData={cityBusData}
      sliderRef={sliderRef}
      mobileTypes={mobileTypes}
      history={history}/>
  )
}
