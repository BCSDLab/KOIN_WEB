import React from "react";
import styled from "styled-components";
import AwesomeSwiper from 'react-awesome-swiper';
import useMobileFlag from "../../hooks/useMobileFlag";

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
  margin: 24px 0 0 0;
  padding-left: 1px;

  @media(max-width: 576px){
    height: 22px;
    font-family: NanumSquare;
    font-size: 15px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #175c8e;
    padding-left: 19px;
    width: 100px;
    margin: 0;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 848px;
`;

const BusCard = styled.div`
  margin-top: 16px;
  width: 272px;
  height: 204px;
  box-sizing: border-box;
  //border: 1px solid ${props => props.busType === "shuttle" ? "#f7941e" : props.busType === "daesung" ? "#7c9fae" : "#4db297"};
  
  @media(max-width: 576px){
    margin-top: 10px;
    display: inline-block;
    width: 75%;
    max-width: 100%;
    height: 140px;
    
    transform: scale(${props => props.index === 1 ? 1.0 : 0.9 });
    transition: transform .3s;
  }
`;

const DestinationShiftRow = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 12px;
  height: 28px;
  background-color: ${props => props.busType === "shuttle" ? "#f7941e" : props.busType === "daesung" ? "#7c9fae" : "#4db297"};
  
  @media(max-width: 576px){
    width: 100%;
    height: 21px;
    padding-top: 9px;
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

const BusType = styled.div`
  font-family: NanumBarunGothic;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
  margin-left: 10px;
  
  @media(max-width: 576px){
    font-size: 12px;
    height: auto;
  }
`;

const DestinationShiftBtn = styled.img`
  height: 16px;
  width: 16px;
  padding-left: 26px;
  padding-right: 25px;
  cursor: pointer;
  
  @media(max-width: 576px){
    padding: 0 11px;
    position: relative;
    top: -1px;
  }
`;

const Info = styled.div`
  width: 270px;
  height: 120px;
  padding-top: 41px;
  border-bottom: 1px #e4e4e4 solid;
  border-left: 1px #e4e4e4 solid;
  border-right: 1px #e4e4e4 solid;
  
  @media(max-width: 576px){
    padding-top: 27px;
    width: calc(100% - 2px);
    height: 78px;
  }
`;

const BusIcon = styled.img.attrs({
  src: "http://static.koreatech.in/assets/img/ic-bus.png"
})`
  position: relative;
  height: 20px;
  width: auto;
  right: -2px;
  top: -2px;
  
  @media(max-width: 576px){
    height: 14px;
    right: -5px;
    top: -1px;
  }
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
  justify-content: center;
  align-items: center;
  font-family: NanumBarunGothic;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #252525;
  
  @media(max-width: 576px){
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.8px;
    color: #252525;
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
`;

const TimeDetail = styled.div`
  height: 14px;
  padding-top: 3px;
  font-family: NanumBarunGothic;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #252525;
`;

const Destination = styled.div`
  margin-top: 24px;
  font-family: NanumBarunGothic;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #252525;
  
  display: flex;
  justify-content: center;
  
  @media(max-width: 576px){
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.6px;
    color: #252525;
    margin-top: 15px;
  }
`

const MobileSwiper = styled.div`
  position: relative;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  
  &::-webkit-scrollbar { 
    display: none !important; // 윈도우 크롬 등
  }
  ${props => props.isDown?
    "cursor: grabbing; transform: scale(1.01)":
    ""
  }
`

// 시간 반환 함수
const hour = (val) => {
  return Math.floor(val / 60 / 60);
};

const minute = (val) => {
  return Math.ceil(val / 60) % 60;
};

const timeToString = (time) => {
  if(!time){
    return "운행정보없음"
  } else if (time === "미운행"){
    return "미운행"
  } else if(hour(time) === 0 && minute(time) === 0){
    return "곧 도착"
  } else if(hour(time) === 0){
    return minute(time) + "분 전"
  } else return hour(time) + "시간 " + minute(time) + "분 전"
};

const getBusDepartTime = (remain_time) => {
  let remain_minute = Math.ceil(remain_time / 60);
  let today = new Date();
  
  let minutes = today.getMinutes() + remain_minute;
  let hours = today.getHours();
  
  hours += Math.floor(minutes / 60);
  minutes %= 60;
  hours %= 24;
  
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return hours + "시 " + minutes + "분";
};

export default React.memo(function IndexBus({
  depart,
  arrival,
  daesungDepart,
  daesungArrival,
  cityDepart,
  cityArrival,
  shiftDestination,
  shuttleBusData,
  expressBusData,
  cityBusData,
  sliderRef,
  mobileTypes,
  history
}) {
  const mobileFlag = useMobileFlag();
  const busTypes = [
    {
      busData: shuttleBusData,
      name: "shuttle",
      depart: depart,
      arrival: arrival,
    },
    {
      busData: expressBusData,
      name: "daesung",
      depart: daesungDepart,
      arrival: daesungArrival,
    },
    {
      busData: cityBusData,
      name: "cityBus",
      depart: cityDepart,
      arrival: cityArrival,
    },
  ]

  function getTypeName(type) {
    if (type === "shuttle") return "셔틀버스";
    else if (type === "daesung") return "대성고속";
    else return "시내버스";
  }

  return (
    <Container>
      {!mobileFlag &&
      <>
        <BusTitle onClick={() => history.push('/bus')}>
          실시간 버스
        </BusTitle>
        <CardContainer>
          {busTypes.map((busType) => {
            return (
              <div key={busType.name}>
                <BusCard busType={busType.name}>
                  <DestinationShiftRow busType={busType.name}>
                    <BusIcon/>
                    <BusType>
                      {getTypeName(busType.name)}
                    </BusType>
                  </DestinationShiftRow>
                  <Info>
                    <Time>
                      <LeftTime onClick={() => history.push('/bus')}>
                        {timeToString(busType.busData?.now_bus?.remain_time)}
                      </LeftTime>
                    </Time>
                    {busType.busData?.now_bus?.remain_time > 0 &&
                      <TimeDetail>
                        {getBusDepartTime(busType.busData?.now_bus?.remain_time) + " 출발"}
                      </TimeDetail>
                    }
                    <Destination>
                    <span>
                      {busType.depart}
                    </span>
                      <DestinationShiftBtn
                        src={"http://static.koreatech.in/assets/img/reverse_destination.png"}
                        onClick={() => shiftDestination(busType.name)}/>
                      <span>
                      {busType.arrival}
                    </span>
                    </Destination>
                  </Info>
                </BusCard>
              </div>
            )
          })}
        </CardContainer>
      </>
      }
      {mobileFlag &&
        <>
          <BusTitle onClick={() => history.push('/bus')}>
            버스/교통
          </BusTitle>
          <MobileSwiper
            ref={sliderRef}
            >
            {mobileTypes.map((type, index) => {
              return (
                <BusCard busType={type} key={type} index={index}>
                  <DestinationShiftRow busType={type}>
                    <BusIcon/>
                    <BusType>
                      {getTypeName(type)}
                    </BusType>
                  </DestinationShiftRow>
                  <Info>
                    <Time>
                      <LeftTime onClick={() => history.push('/bus')}>
                        {type === "shuttle" ? timeToString(shuttleBusData?.now_bus?.remain_time) : type === "daesung" ? timeToString(expressBusData?.now_bus?.remain_time) : timeToString(cityBusData?.now_bus?.remain_time)}
                      </LeftTime>
                    </Time>
                    <Destination>
                      <span>
                        {type === "shuttle" ? depart : type === "daesung" ? daesungDepart : cityDepart}
                      </span>
                      <DestinationShiftBtn
                        src={"http://static.koreatech.in/assets/img/reverse_destination.png"}
                        onClick={() => shiftDestination(type)}/>
                        <span>
                          {type === "shuttle" ? arrival : type === "daesung" ? daesungArrival : cityArrival}
                        </span>
                    </Destination>
                  </Info>
                </BusCard>
              )
            })}
          </MobileSwiper>
        </>
      }
    </Container>
  )
})
