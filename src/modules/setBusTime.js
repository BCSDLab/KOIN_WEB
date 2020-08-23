import React, {useState, useEffect, useCallback, useRef} from 'react'
import * as TIMETABLE from "../static/busTimeTable"

export default function setBusTime(
  route,
  daesungRoute,
  setFastestShuttleTime,
  setNextFastestShuttleTime,
  setFastestDaesungTime,
  setNextFastestDaesungTime,
  setShuttleTime,
  setDaesungTime
  ) {
  const timetable = TIMETABLE.default;
  const routeTime = new Date();
  const today = new Date();
  let shuttleTime = [{ "hour": 0, "minute": 0}, { "hour": 0, "minute": 0}];
  let daesungTime = [{ "hour": 0, "minute": 0}, { "hour": 0, "minute": 0}];

  //console.log("호출!")

  if(timetable[route].shuttle === "none"){
    setFastestShuttleTime("미운행");
    setNextFastestShuttleTime("미운행");
    setShuttleTime(shuttleTime)
  }
  else {
    const shuttleTimeTable = timetable[route].shuttle;

    for(let i = 0; i< shuttleTimeTable.length; i++){
      if (shuttleTimeTable[i].day.indexOf(routeTime.getDay()) !== -1) {
        routeTime.setHours(shuttleTimeTable[i].hour);
        routeTime.setMinutes(shuttleTimeTable[i].minute);
        routeTime.setSeconds(0)
      } else {
        continue;
      }
      if(routeTime.getTime() - today.getTime() > 0){
        setFastestShuttleTime(routeTime.getTime() - today.getTime());
        shuttleTime[0].hour = shuttleTimeTable[i].hour;
        shuttleTime[0].minute = shuttleTimeTable[i].minute;
        shuttleTime[0].day = shuttleTimeTable[i].day;
        if(i < shuttleTimeTable.length-1){
          routeTime.setHours(shuttleTimeTable[i+1].hour);
          routeTime.setMinutes(shuttleTimeTable[i+1].minute);
          shuttleTime[1].hour = shuttleTimeTable[i+1].hour;
          shuttleTime[1].minute = shuttleTimeTable[i+1].minute;
          shuttleTime[1].day = shuttleTimeTable[i+1].day;
          setNextFastestShuttleTime(routeTime.getTime() - today.getTime());
        }
        break;
      }
    }
    setShuttleTime(shuttleTime);
  }

  if(timetable[daesungRoute].daesung === "none"){
    setFastestDaesungTime("미운행");
    setNextFastestDaesungTime("미운행");
    setDaesungTime(daesungTime);
  }
  else{
    const daesungTimeTable = timetable[daesungRoute].daesung;
    //대성
    for(let i=0; i<daesungTimeTable.length; i++){

      let routeTime = new Date();
      routeTime.setHours(daesungTimeTable[i].hour);
      routeTime.setMinutes(daesungTimeTable[i].minute);
      routeTime.setSeconds(0);

      if(routeTime.getTime() - today.getTime() > 0){
        setFastestDaesungTime(routeTime.getTime() - today.getTime());
        daesungTime[0].hour = daesungTimeTable[i].hour;
        daesungTime[0].minute = daesungTimeTable[i].minute;
        if(i < daesungTimeTable.length-1){
          routeTime.setHours(daesungTimeTable[i+1].hour);
          routeTime.setMinutes(daesungTimeTable[i+1].minute);
          daesungTime[1].hour = daesungTimeTable[i+1].hour;
          daesungTime[1].minute = daesungTimeTable[i+1].minute;
          setNextFastestDaesungTime(routeTime.getTime() - today.getTime())
        }
        break;
      }
    }
    setDaesungTime(daesungTime)
  }
}
