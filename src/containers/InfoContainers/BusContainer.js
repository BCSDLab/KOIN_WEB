import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import BusLookUp from "../../components/InfoComponents/BusLookUp";
import BusTimeTable from "../../components/InfoComponents/BusTimeTable";
import {getCityBusInfo, getShuttleBusInfo, getExpressBusInfo} from "../../modules/bus";
import {getShuttleBusVersionInfo, getExpressBusVersionInfo, getCityBusVersionInfo} from "../../modules/version";
import {getCourses, getTimeTable} from "../../modules/course";
import useInterval from "../../hooks/useInterval";

const allcourse = [
  
  { name: '천안 하교',
    bus_type:'commuting',
    direction:'from',
    region: '천안'
  }, 
  { name: '천안 등교',
    bus_type:'commuting',
    direction:'to',
    region: '천안'
  }, 
  { name: '천안 셔틀 등교',
    bus_type:'shuttle',
    direction:'to',
    region: '천안'
  },
  { name: '천안 셔틀 하교',
    bus_type:'shuttle',
    direction:'from',
    region: '천안'
  },
  { name: '청주 등교',
    bus_type:'commuting',
    direction:'to',
    region: "청주"
  },
  { name: '청주 하교',
    bus_type:'commuting',
    direction:'from',
    region: "청주"
  },
  { name: "청주 셔틀 등교",
    bus_type:'shuttle',
    direction:'to',
    region: "청주"
  },
  { name: "청주 셔틀 하교",
    bus_type:'shuttle',
    direction:'from',
    region: "청주"
  },
  { name: '서울 등교',
    bus_type:'commuting',
    direction:'to',
    region: "서울"
  },
  { name: '서울 하교',
    bus_type:'commuting',
    direction:'from',
    region: "서울"
  },
  { name: '대전 등교',
    bus_type:'commuting',
    direction:'to',
    region: '대전'
  },
  { name: '대전 하교',
    bus_type:'commuting',
    direction:'from',
    region: '대전'
  },
  { name: '세종 등교',
    bus_type:'commuting',
    direction:'to',
    region: '세종'
  },
  { name: '세종 하교',
    bus_type:'commuting',
    direction:'from',
    region: '세종'
  },
  {
    name:'한기대->야우리',
    bus_type:'express',
    direction:'from',
    region:'천안'
  },
  {
    name:'야우리->한기대',
    bus_type:'express',
    direction:'to',
    region:'천안'
  }
];

const BUS_TYPE_LIST = ["city", "shuttle", "express"];

export default function BusContainer() {

  // BusLookUp.js
  const [departList, setDepartList] = useState(["한기대","야우리","천안역"]);
  const [arrivalList, setArrivalList] = useState(["야우리","한기대","천안역"]);
  const {data: cityBusData} = useSelector(state => state.busReducer.cityBusData);
  const {data: shuttleBusData} = useSelector(state => state.busReducer.shuttleBusData);
  const {data: expressBusData} = useSelector(state => state.busReducer.expressBusData);
  const {data: shuttleBusVersionData} = useSelector(state => state.versionReducer.shuttleBusVersionData);
  const {data: expressBusVersionData} = useSelector(state => state.versionReducer.expressBusVersionData);
  const {data: cityBusVersionData} = useSelector(state => state.versionReducer.cityBusVersionData);

  // BusTimeTable.js
  const dispatch = useDispatch();
  const courses = useSelector(state=>state.courseReducer.courses);
  const course = useSelector(state=>state.courseReducer.course);
  const [allcourseId,setAllCourseId] = useState(0);
  const [selectedTab, setSelectedTab] = useState("학교셔틀");
  const [daesungTimeTableTitle, setDaesungTimeTableTitle] = useState("학교 -> 야우리");
  const [routeId,setRouteId] = useState(0);
  
  useEffect(() => {
    dispatch(getShuttleBusVersionInfo())
    dispatch(getExpressBusVersionInfo())
    dispatch(getCityBusVersionInfo())
    console.log("data" , cityBusVersionData);
  },[])

  useEffect(()=>{
    dispatch(getTimeTable(allcourse[allcourseId].bus_type, allcourse[allcourseId].direction, allcourse[allcourseId].region))
  },[allcourseId, dispatch]);

  useEffect(()=>{
    dispatch(getCourses());
  },[dispatch]);

  const setAllCourseReset = (id)=>{
    setAllCourseId(id);
    setRouteId(0);
  }

  const selectTab = (tab) => () =>{
    setSelectedTab(tab);
  };

  useEffect(()=>{
    if(selectedTab === "대성고속"){
      setAllCourseId(14); 
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
      default:
        break;
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
      default:
        break;
    }
  }

  useInterval(() => {
    dispatch(getCityBusInfo(changeEnglish(departList[0]), changeEnglish(arrivalList[0])));
    dispatch(getShuttleBusInfo(changeEnglish(departList[0]), changeEnglish(arrivalList[0])));
    dispatch(getExpressBusInfo(changeEnglish(departList[0]), changeEnglish(arrivalList[0])));
  }, 60000)

  useEffect(() => {
    dispatch(getCityBusInfo(changeEnglish(departList[0]), changeEnglish(arrivalList[0])));
    dispatch(getShuttleBusInfo(changeEnglish(departList[0]), changeEnglish(arrivalList[0])));
    dispatch(getExpressBusInfo(changeEnglish(departList[0]), changeEnglish(arrivalList[0])));
  }, [departList, arrivalList, dispatch]);

  const setDaesungDropDownTitle = (title) => () => {
    setDaesungTimeTableTitle(title);
  };

  const [isOpenType, setIsOpenType] = useState(false);
  const [isOpenTime, setIsOpenTime] = useState(false);
  const [isOpenExpress, setIsOpenExpress] = useState(false);

  return (
    <div>
      <BusLookUp
        departList={departList}
        arrivalList={arrivalList}
        selectDepart={selectDepart}
        selectArrival={selectArrival}
        cityBusData={cityBusData}
        shuttleBusData={shuttleBusData}
        expressBusData={expressBusData}
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
        isOpenType={isOpenType}
        setIsOpenType={setIsOpenType}
        isOpenTime={isOpenTime}
        setIsOpenTime={setIsOpenTime}
        isOpenExpress={isOpenExpress}
        setIsOpenExpress={setIsOpenExpress}
        shuttleBusVersionData={shuttleBusVersionData}
        expressBusVersionData={expressBusVersionData}
        cityBusVersionData={cityBusVersionData}
        />
    </div>
  )
}
