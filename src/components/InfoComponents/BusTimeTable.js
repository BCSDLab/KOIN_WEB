import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width:100%;
  min-height:900px;
  margin-bottom: 60px;

  @media (max-width: 576px) {
    float: left;
    min-height: 700px
  }
`;

const TimeTable = styled.div`
  margin-top: 82px;
  width: 1131px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 576px) {
    margin-top: 0;
    padding-left: 16px;
    padding-right: 16px;
    width: calc(100% - 32px);
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: -1px;
  text-align: left;
  color: #252525;
  margin: 0 0 22px 0;
  
  @media (max-width: 576px) {
    font-size: 18px;
    margin: 0 0 28px 0;
  }
`;

const BusTabs = styled.div`
  width: 100%;
  margin-bottom: 2%;
  display:flex;
  
  @media (max-width: 576px) {
    width: calc(100%);
  }
`;

const Tab = styled.div`
  width: 33%;
  border: ${props => props.tab === props.selectedTab ? '1px solid #175c8e' : "1px solid #858585"};
  border-bottom: ${props => props.tab === props.selectedTab ? 'none' : ''};
  padding: 18px 160px 16px 152px;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: -0.8px;
  text-align: center;
  color: ${props => props.tab === props.selectedTab ? '#175c8e' : '#858585'};
  cursor: pointer;
  
  @media (max-width: 576px) {
    font-size: 13px;
    padding: 6px 0 5px;
  }
`;

const SubInfo = styled.div`
  display: flex;
  justify-content: space-between;
  height: 58px;
  
  @media (max-width: 576px) {
    margin-top: 27px;
  }
`;

const DropDownButton = styled.button`
  margin-top: -1px;
  border: 1px solid #d2dae2;
  font-size: 15px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.8px;
  color: #252525;
  padding: 11px 19px;
  float: left;
  cursor: pointer;
  width: 225px;
  text-align: left;
  background-color: #ffffff;
  margin-right: 10px;
  
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const DropDownContents = styled.div`
  left: 0;
  display: none;
  position: absolute;
  background-color: #ffffff;
  border: 1px #d0d0d0 solid;
  width: 223px;
  z-index: 1;
  margin-top: 41px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.8px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  
  @media (max-width: 576px) {
    width: calc(100% - 3px);
  }
`;

const DropDown = styled.div`
  position: relative;
  display: inline-block;
  height: 44px;
  
  &:hover ${DropDownButton}{
    background-color: #efefef;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
  &:hover ${DropDownContents}{
    display: block;
  } 
`;

const ArrowImg = styled.img.attrs({
  src: "https://static.koreatech.in/assets/img/bus_dropdown.png"
})`
  float: right;
  position: relative;
  top: 4px;
  width: 17px;
`;

const DropDownContent = styled.a`
  border-bottom: 1px #d0d0d0 solid;
  font-size: 15px;
  color: black;
  padding: 3% 4%;
  text-decoration: none;
  display: block;
  cursor: pointer;
  
  &:hover {
    margin-top:-1px;
    background-color: #f1f1f1;
    border-top: 1px #d0d0d0 solid;
  }
`;

const SubDesc = styled.div`
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: -0.6px;
  text-align: right;
  color: #858585;
  float: right;
  padding-top: 2.5%;
  
  @media (max-width: 576px) {
    margin-top: 6px;
    margin-bottom: 8px;
  }
`;

const TimeTableSubTitle = styled.div`
  float: left;
  padding-left: 5px;
  font-size: 15px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  margin-bottom: 5px;
`

const Td = styled.td`
  font-size: ${props => !(props.rowIdx === 1 && props.index === 0) && props.isShuttle ? '13px' : '15px'};
  padding-top: 25px;
  padding-bottom: 25px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.8px;
  text-align: center;
  color: #252525;
  border-bottom: ${props => props.rowIdx === 1 && props.index === 0 ? '1px solid #175c8e' : '1px solid #d2dae2'};

`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom:67px;

  -moz-animation: fadein 1s; /* Firefox */
  -webkit-animation: fadein 1s; /* Safari and Chrome */
  -o-animation: fadein 1s; /* Opera */

 @keyframes fadein {
  from {
      opacity: 0;
  }
  to {
      opacity: 1;
  }
}
@-moz-keyframes fadein { /* Firefox */
  from {
      opacity: 0;
  }
  to {
      opacity: 1;
  }
}
@-webkit-keyframes fadein { /* Safari and Chrome */
  from {
      opacity: 0;
  }
  to {
      opacity: 1;
  }
}
@-o-keyframes fadein { /* Opera */
  from {
      opacity: 0;
  }
  to {
      opacity: 1;
  }
}


  thead {
    margin-bottom: 2%;
  }
  
  th {
    height: 50px;
  }

  tr:first-child ${Td} {
    padding-top: 13px;
    padding-bottom: 13px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: -0.8px;
    text-align: center;
    color: #175c8e;
    border-bottom: 1px solid #175c8e;
    border-top: 2px solid #175c8e;
  }

  tr:last-child ${Td} {
    border-bottom: 1px solid #175c8e;
  }
  
  tr:hover ${Td} {
    font-weight: 700;
  }
  
  @media (max-width: 576px) {
    overflow-x: scroll;
    
    ${Td} {
      padding-top: 13px;
      padding-bottom: 13px;
      font-size: 12px;
      min-width: ${props => !(props.rowIdx === 1 && props.index === 0) && props.isShuttle ? "" : "80px"}
    }
  }
`;

export default function BusTimeTable(
  {
    tabs,
    vacationFlag,
    selectedTab,
    selectTab,
    shuttleTimeTable,
    shuttleTimeTableTitle,
    setShuttleDropDownTitle,
    daesungTimeTable,
    daesungTimeTableTitle,
    setDaesungDropDownTitle,
    allcourse,
    allcourseId,
    setAllCourseReset,
    expressId,
    setExpressId,
    setRouteId,
    routeId,
    course
  }) {
  return(
    <Container>
      <TimeTable>
        <Title>
          전체 시간표 조회
        </Title>
        <BusTabs>
          {tabs.map((tab)=> {
            return (
              <Tab
                tab={tab}
                key={tab}
                selectedTab={selectedTab}
                onClick={selectTab(tab)}>
                {tab}
              </Tab>
            )
          })}
        </BusTabs>

        {/* 셔틀버스 */}
        {selectedTab === "학교셔틀" &&
          <div>
            <SubInfo>
              <DropDown>
                <DropDownButton>
                  {allcourse[allcourseId].name}
                  <ArrowImg/>
                </DropDownButton>
                <DropDownContents>
                {allcourse.filter((data,index)=> index <= 6).map((data,idx)=>{
                  return(
                  <DropDownContent
                    key={idx}
                    onClick={()=>setAllCourseReset(idx)}>
                    {data.name}
                  </DropDownContent>)
                })}
                </DropDownContents>
              </DropDown>
              <DropDown>
                <DropDownButton>
                  {course.data.to_school?.[routeId]?.route_name}
                  <ArrowImg/>
                </DropDownButton>
                <DropDownContents>
                  {course.data.to_school?.map((data,index)=>{
                    return(
                    <DropDownContent
                      key={index}
                      onClick={()=>setRouteId(index)}>
                      {data.route_name}
                    </DropDownContent>)
                  })}
                </DropDownContents>
              </DropDown>
            </SubInfo>
            <Table>
            <TimeTableSubTitle>• 등교</TimeTableSubTitle>
              <tbody>
                <tr>
                  <Td>승차장소</Td>
                  <Td>시간</Td>
                </tr>
                {course.data.to_school?.[routeId]?.arrival_info.map((data,index)=>{
                  return(
                    <tr key={index}>
                      <Td>{data.node_name}</Td>
                      <Td>{data.arrival_time}</Td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
            <Table>
            <TimeTableSubTitle>• 하교</TimeTableSubTitle>
              <tbody>
                <tr>
                  <Td>승차장소</Td>
                  <Td>시간</Td>
                </tr>
                {course.data.from_school?.[routeId]?.arrival_info.map((data,index)=>{
                  return(
                    <tr key={index}>
                      <Td>{data.node_name}</Td>
                      <Td>{data.arrival_time}</Td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
        }
        {/* 대성고속 */}
        {selectedTab === "대성고속" &&
          <div>
            <SubInfo>
              <DropDown>
                <DropDownButton>
                  {allcourse[allcourseId].name}
                  <ArrowImg/>
                </DropDownButton>
                <DropDownContents>
                  {allcourse.filter((data,index)=> index > 6).map((data,idx)=>{
                    return(
                      <DropDownContent
                        key={idx}
                        onClick={()=>setAllCourseReset(idx+7)}>
                        {data.name}
                      </DropDownContent>)
                  })}
                </DropDownContents>
              </DropDown>
            </SubInfo>
            <Table>
                <tbody>
                <tr>
                  <Td>출발시간</Td>
                  <Td>도착시간</Td>
                </tr>
                {allcourse[allcourseId].name==="한기대->야우리" &&
                  course.data.koreatech_to_terminal?.map((data,index)=>{
                    return(<tr key={index}>
                      <Td>{data.departure}</Td>
                      <Td>{data.arrival}</Td>
                    </tr>)
                  })}
                {allcourse[allcourseId].name==="야우리->한기대" &&
                  course.data.terminal_to_koreatech?.map((data,index)=>{
                    return(<tr key={index}>
                      <Td>{data.departure}</Td>
                      <Td>{data.arrival}</Td>
                    </tr>)
                  })
                }
              </tbody>
            </Table>
          </div>
        }

        {/* 시내버스 */}
        {selectedTab === "시내버스" &&
          <div>
            <SubInfo>
              <SubDesc>
                버스번호 400, 401
              </SubDesc>
            </SubInfo>
            <Table>
              <tbody>
              <tr>
                <Td>기점</Td>
                <Td >종합터미널 - 병천</Td>
              </tr>
              <tr>
                <Td>시간표(터미널)</Td>
                <Td >6:00(첫) - 22:30(막) (10분간격)</Td>
              </tr>
              <tr>
                <Td>시간표(병천)</Td>
                <Td >6:10(첫) - 22:45(막) (10분간격)</Td>
              </tr>
              <tr>
                <Td>소요시간</Td>
                <Td >약 40분</Td>
              </tr>
              </tbody>
            </Table>
          </div>
        }
      </TimeTable>
    </Container>
  )
}
