import React, {useState, useEffect, useCallback, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import BusLookUp from "../../components/InfoComponents/BusLookUp";
import BusTimeTable from "../../components/InfoComponents/BusTimeTable";
import setBusTime from "../../modules/setBusTime";
import {getBusInfo, getTerm} from "../../modules/bus";
import {getCourses, getTimeTable} from "../../modules/course";
import {semesterTimeTable, vacationTimeTable} from "../../static/shuttleBusTimeTable";
import useInterval from "../../hooks/useInterval";

const allcourse = [
  { name: '천안 등교/하교',
    bus_type:'commuting',
    region: '천안'
  }, 
  { name: '천안 셔틀',
    bus_type:'shuttle',
    region: '천안'
  },
  { name: '청주 등교/하교',
    bus_type:'commuting',
    region: "청주"
  },
  { name: "청주 셔틀",
    bus_type:'shuttle',
    region: "청주"
  },
  { name: '서울 등교/하교',
    bus_type:'commuting',
    region: "서울"
  },
  { name: '대전 등교/하교',
    bus_type:'commuting',
    region: '대전'
  },
  { name: '세종 등교/하교',
    bus_type:'commuting',
    region: '세종'
  },
  {
    name:'한기대->야우리',
    bus_type:'express',
    region:'천안'
  },
  {
    name:'야우리->한기대',
    bus_type:'express',
    region:'천안'
  }
];

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
  const {term} = useSelector(state => state.busReducer.term);
 
  // BusTimeTable.js
  const dispatch = useDispatch();
  const courses = useSelector(state=>state.courseReducer.courses);
  const course = useSelector(state=>state.courseReducer.course);
  const [allcourseId,setAllCourseId] = useState(0);
  const [selectedTab, setSelectedTab] = useState("학교셔틀");
  const [daesungTimeTableTitle, setDaesungTimeTableTitle] = useState("학교 -> 야우리");
  const [routeId,setRouteId] = useState(0);


  useEffect(()=>{
    console.log(allcourseId)
    dispatch(getTimeTable(allcourse[allcourseId].bus_type,allcourse[allcourseId].region))
  },[allcourseId]);

  useEffect(()=>{
    dispatch(getCourses());
  },[courses]);
  // console.log(courses);
  
  // console.log(courses.data);
  const setAllCourseReset = (id)=>{
    setAllCourseId(id);
    setRouteId(0);
  }
 
  const selectTab = (tab) => () =>{
    setSelectedTab(tab);
  };

  useEffect(()=>{
    if(selectedTab === "대성고속"){
      setAllCourseId(7); 
    }else if(selectedTab==="학교셔틀"){
      setAllCourseId(0);
      setRouteId(0);
    }else{
      setAllCourseId(1);
      setRouteId(0);
    }
  },[selectedTab])

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
    setBusTime(departList[0]+arrivalList[0],departList[0]+arrivalList[0], setFastestShuttleTime, setNextFastestShuttleTime, setFastestDaesungTime, setNextFastestDaesungTime, setShuttleTime, setDaesungTime, term);
  },1000);

  useInterval(() => {
    dispatch(getBusInfo(changeEnglish(departList[0]), changeEnglish(arrivalList[0])));
  }, 60000)

  useEffect(() => {
    dispatch(getBusInfo(changeEnglish(departList[0]), changeEnglish(arrivalList[0])));
    setBusTime(departList[0] + arrivalList[0], departList[0] + arrivalList[0], setFastestShuttleTime, setNextFastestShuttleTime, setFastestDaesungTime, setNextFastestDaesungTime, setShuttleTime, setDaesungTime, term);
  }, [departList, arrivalList]);

  useEffect(() => {
    if(term) {
      setBusTime(departList[0] + arrivalList[0], departList[0] + arrivalList[0], setFastestShuttleTime, setNextFastestShuttleTime, setFastestDaesungTime, setNextFastestDaesungTime, setShuttleTime, setDaesungTime, term);
    }
  },[term])

  // useEffect(() => {
  //   dispatch(getTerm())
  // },[])

  const setDaesungDropDownTitle = (title) => () => {
    setDaesungTimeTableTitle(title);
  };
 
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
        cityBusData={data}
      />
      <BusTimeTable
        tabs={["학교셔틀","대성고속","시내버스"]}
        selectedTab={selectedTab}
        selectTab={selectTab}
        daesungTimeTable={["학교 -> 야우리","야우리 -> 학교"]}
        daesungTimeTableTitle={daesungTimeTableTitle}
        setDaesungDropDownTitle={setDaesungDropDownTitle}
        allcourse={allcourse}
        allcourseId={allcourseId}
        setAllCourseReset={setAllCourseReset}
        setRouteId={setRouteId} 
        routeId={routeId}
        course={course}
        courses={courses}
        />
    {/*  TODO : add mobile! */}
    </div>
  )
}
