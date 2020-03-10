import React from "react";
import styled from "styled-components";

const Container = styled.section`
  @media(max-width: 576px){
    width: 100%;
  }
`;

const BusTitle = styled.h2`
  width: 100%;
  font-family: NanumSquare;
  font-weight: 800;
  font-size: 17px;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.15;
  letter-spacing: normal;
  text-align: left;
  color: #175c8e;
  cursor: pointer;
  margin: 0;

  @media(max-width: 576px){
    font-size: 18px;
  }
`;

const BusCard = styled.div`
  margin-top: 20px;
  width: 494px;
  height: 157px;
  box-sizing: border-box;
  border: 1px solid ${props => props.busType === "shuttle" ? "#f7941e" : props.busType === "daesung" ? "#7c9fae" : "#4db297"};
  
  @media(max-width: 576px){
    width: 544px;
    max-width: 100%;
    height: 154px;
  }
`;

const DestinationShiftRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  background-color: ${props => props.busType === "shuttle" ? "#fff4e9" : props.busType === "daesung" ? "#f2f5f7" : "#edf7f4"};
  
  @media(max-width: 576px){
    height: 38px;
    padding: 0 30px;
  }
`;

const Badge = styled.div`
  width: 42px;
  height: 15px;
  border-radius: 11px;
  font-family: "NanumBarunGothic", serif;
  font-size: 11px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.09;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  padding-top: 5px;
  background-color: ${props => props.busType === "shuttle" ? "#f7941e" : props.busType === "daesung" ? "#7c9fae" : "#4db297"};;
  
  @media(max-width: 576px){
    width: 32px;
    height: 12px;
    padding-top: 3px;
  }
`;

const Departure = styled.div`
  height: 18px;
  font-family: "NanumBarunGothic", serif;
  font-size: 15px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: left;
  color: #252525;
  padding-left: 8px;
  
  @media(max-width: 576px){
    font-size: 12px;
    height: auto;
  }
`;

const DestinationShiftBtn = styled.img`
  height: 20px;
  width: 19px;
  padding-left: 40px;
  padding-right: 40px;
  cursor: pointer;
  
  @media(max-width: 576px){
    padding: 0 11.5px;
  }
`;

const Info = styled.div`
  width: 100%;
  margin-top: 17px;
  
  @media(max-width: 576px){
    margin-top: 15px;
  }
`;

const BusIcon = styled.img.attrs({
  src : "https://static.koreatech.in/assets/img/bus_icon.png"
})`
  position: relative;
  height: 15px;
  width: auto;
  right: 5px;
  top: 3px;
`;

const Type = styled.div`
  height: 18px;
  
  span {
    width: 70px;
    font-family: "NanumBarunGothic", serif;
    font-size: 13px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.15;
    letter-spacing: normal;
    text-align: center;
    color: #252525;
    margin: 0 auto;
    cursor: pointer;
    
    @media(max-width: 576px){
      font-size: 11px;
    }
  }
`;

const Time = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "NanumBarunGothic", serif;
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: center;
  color: #252525;
  padding: 0 26px;
  
  @media(max-width: 576px){
    font-size: 20px;
    padding: 0 15.5px;
  }
`;

const BusTypeChangeIcon = styled.img`
  padding-top: 15px;
  width: 10px;
  height: 20px;
  cursor: pointer;
`;

const LeftTime = styled.div`
  cursor: pointer;
  padding-top: 15px;
`;

const TimeDetail = styled.div`
  height: 18px;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  color: #252525;
  padding-top: 3px;
  text-align: center;
  
  @media(max-width: 576px){
    font-size: 11px;
    padding-top: 12px;
  }
`;

export default function IndexBus(
  {
    busTypes,
    selectedType,
    setSelectedType,
    depart,
    arrival,
    shiftDestination,
    shuttleTime,
    daesungTime,
    fastestShuttleTime,
    fastestDaesungTime,
    cityBusData,
    history
  }) {
  function getShiftBtn(type) {
    if(type === "shuttle") return 'https://static.koreatech.in/assets/img/shuttle_reverse.png';
    else if(type === "daesung") return 'https://static.koreatech.in/assets/img/daesung_reverse.png';
    else return 'https://static.koreatech.in/assets/img/city_reverse.png';
  }
  function getTypeName(type) {
    if(type === "shuttle") return "셔틀버스";
    else if(type === "daesung") return "대성고속";
    else return "시내버스";
  }
  function getLeftIcon(type) {
    if(type === "shuttle") return 'https://static.koreatech.in/assets/img/shuttle_left.png';
    else if(type === "daesung") return 'https://static.koreatech.in/assets/img/daesung_left.png';
    else return 'https://static.koreatech.in/assets/img/city_left.png';
  }
  function getRightIcon(type) {
    if(type === "shuttle") return 'https://static.koreatech.in/assets/img/shuttle_right.png';
    else if(type === "daesung") return 'https://static.koreatech.in/assets/img/daesung_right.png';
    else return 'https://static.koreatech.in/assets/img/city_right.png';
  }
  // 시간 반환 함수
  const hour = (val) => {
    return Math.floor(val / 1000 / 60 / 60) % 24;
  };

  const minute = (val) => {
    return Math.floor(val / 1000 / 60) % 60;
  };

  const second = (val) => {
    return Math.floor(val / 1000) % 60;
  };
  const timeToString = (time) => {
    if(time === 0){
      return "운행정보없음"
    } else if (time === "미운행"){
      return "미운행"
    } else if(hour(time) === 0){
      return minute(time) + "분 " + second(time) + "초 남음"
    } else if(hour(time) === 0 && minute(time) === 0){
      return second(time) + "초 남음"
    } else return hour(time) + "시간 " + minute(time) + "분 " + second(time) + "초 남음"
  };
  function changeType(type, direction) {
    switch (type) {
      case "shuttle":
        if(direction === "prev"){
          setSelectedType("cityBus")
        } else setSelectedType("daesung");
        break;
      case "daesung":
        if(direction === "prev"){
          setSelectedType("shuttle")
        } else setSelectedType("cityBus");
        break;
      case "cityBus":
        if(direction === "prev"){
          setSelectedType("daesung")
        } else setSelectedType("shuttle");
        break;
    }
  }
  function cityBusString (remain_time) {
    if(remain_time !== null && remain_time !== undefined) {
      return "약 "+ Math.ceil(remain_time/60)%60 +"분 남음"
    }
    else if(remain_time === undefined || remain_time === null) {
      return "운행정보없음"
    }
  }
  const timeLength = (val) => {
    return val < 10 ? '0' + val : val;
  };
  function detailString (shuttleTime, daesungTime, cityBusTime, type) {
    switch (type) {
      case "shuttle":
        return (shuttleTime[0].hour !== 0 ? "(" + timeLength(shuttleTime[0].hour) + ":"+timeLength(shuttleTime[0].minute) + " 출발)" : "");
      case "daesung":
        return (daesungTime[0].hour !== 0 ? "(" + timeLength(daesungTime[0].hour) + ":" + timeLength(daesungTime[0].minute) + " 출발)" : "");
      case "cityBus":
        if(cityBusTime === null || cityBusTime === undefined ){
          return ""
        }
        let today = new Date();
        let minutes = today.getMinutes() + (Math.ceil(cityBusTime/60)%60);
        let hours = today.getHours();
        if (minutes >= 60) {
          hours = hours + 1;
          minutes = minutes - 60;
        }
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return "(" + hours + ":" + minutes + " 출발)";
    }
  }
  return (
    <Container>
      <BusTitle onClick={() => history.push('/bus')}>
        실시간 버스
      </BusTitle>
      {busTypes.map((type, index) => {
        return (
          <div key={index}>
            {selectedType === type &&
              <BusCard busType={type}>
                <DestinationShiftRow busType={type}>
                  <Badge
                    busType={type}
                    depart>
                    출발
                  </Badge>
                  <Departure>
                    {depart}
                  </Departure>
                  <DestinationShiftBtn
                    src={getShiftBtn(type)}
                    onClick={() => shiftDestination()}/>
                  <Badge
                    busType={type}
                    arrive>
                    도착
                  </Badge>
                  <Departure>
                    {arrival}
                  </Departure>
                </DestinationShiftRow>
                <Info>
                  <Type>
                    <BusIcon onClick={() => history.push('/bus')}/>
                    <span onClick={() => history.push('/bus')}>{getTypeName(type)}</span>
                  </Type>
                  <Time>
                    <BusTypeChangeIcon
                      src={getLeftIcon(type)}
                      onClick={() => changeType(type,"prev")}/>
                    <LeftTime onClick={() => history.push('/bus')}>
                      {type === "shuttle" ? timeToString(fastestShuttleTime) : type === "daesung" ? timeToString(fastestDaesungTime) : cityBusString(cityBusData.remain_time) }
                    </LeftTime>
                    <BusTypeChangeIcon
                      src={getRightIcon(type)}
                      onClick={() => changeType(type, "next")}/>
                  </Time>
                  {cityBusData &&
                  <TimeDetail>
                    {detailString(shuttleTime, daesungTime, cityBusData.remain_time, type)}
                  </TimeDetail>
                  }
                </Info>
              </BusCard>
            }
          </div>
        )
      })}
    </Container>
  )
}
