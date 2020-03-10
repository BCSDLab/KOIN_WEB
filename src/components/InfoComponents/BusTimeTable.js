import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width:100%;
  
  @media (max-width: 576px) {
    float: left;
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
  width: 195px;
  text-align: left;
  background-color: #ffffff;
  
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const DropDownContents = styled.div`
  display: none;
  position: absolute;
  background-color: #ffffff;
  border: 1px #d0d0d0 solid;
  width: 193px;
  z-index: 1;
  margin-top: 41px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.8px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  
  @media (max-width: 576px) {
    width: calc(100% - 34px);
  }
`;

const DropDown = styled.div`
  width: 100%;
  
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
  border-bottom: ${props => props.rowIdx === 1 && props.index === 0 ? '1px solid #175c8e' : '1px solid #d2dae2'};;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 70px;

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
    setDaesungDropDownTitle
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
                  {shuttleTimeTableTitle}
                  <ArrowImg/>
                </DropDownButton>
                <DropDownContents>
                  {shuttleTimeTable.filter((timetable, index) => index < (vacationFlag? 9: 6))
                    .map((timetable, index) =>
                     (
                       <DropDownContent
                         key={index}
                         onClick={setShuttleDropDownTitle(timetable.title)}>
                         {timetable.title}
                       </DropDownContent>
                      )
                  )}
                </DropDownContents>
              </DropDown>
              <SubDesc>
                천안(터미널/천안역) 등교/하교(18:10)
              </SubDesc>
            </SubInfo>
            {shuttleTimeTable.filter(timeTable => timeTable.title === shuttleTimeTableTitle).map((timeTable, index) => (
              vacationFlag ? (
                <div key={index}>
                  {/* 방학중 */}
                  <Table>
                    <tbody>
                    {timeTable.timetable.map((times, rowIdx) => {
                      return (
                        <tr key={times[0] + rowIdx}>
                          {times.map((time,index)=> {
                            return (
                              <Td
                                rowSpan={rowIdx === 1 && index === 0 ? timeTable.rowspan : 1}
                                rowIdx={rowIdx}
                                index={index}
                                key={time + index}
                                isShuttle={true}>
                                {time}
                              </Td>
                            )
                          })}
                        </tr>
                      )
                    })}
                    </tbody>
                  </Table>
                  {timeTable.timetable2 &&
                  <Table>
                    <tbody>
                    {timeTable.timetable2.map((times, rowIdx) => {
                      return (
                        <tr key={times[0] + rowIdx}>
                          {times.map((time,index)=> {
                            return (
                              <Td
                                rowSpan={rowIdx === 1 && index === 0 ? timeTable.rowspan : 1}
                                rowIdx={rowIdx}
                                index={index}
                                key={time + index}
                                isShuttle={true}>
                                {time}
                              </Td>
                            )
                          })}
                        </tr>
                      )
                    })}
                    </tbody>
                  </Table>
                  }
                </div>
              ) : (
                <Table>
                  {/* 학기중 */}
                  <tbody>
                  {timeTable.timetable.map((times, rowIndex) => {
                    return (
                      <tr key={times[0] + rowIndex}>
                        {times.map((time,index)=> {
                          return (
                            <Td key={time + index}>
                              {time}
                            </Td>
                          )
                        })}
                      </tr>
                    )
                  })}
                  </tbody>
                </Table>
              )
            ))}
          </div>
        }

        {/* 대성고속 */}
        {selectedTab === "대성고속" &&
          <div>
            <SubInfo>
              <DropDown>
                <DropDownButton>
                  {daesungTimeTableTitle}
                  <ArrowImg/>
                </DropDownButton>
                <DropDownContents>
                  {daesungTimeTable.map((titles)=> (
                    <DropDownContent
                      key={titles}
                      onClick={setDaesungDropDownTitle(titles)}>
                      {titles}
                    </DropDownContent>
                  ))}
                </DropDownContents>
              </DropDown>
            </SubInfo>
            {daesungTimeTableTitle === "학교 -> 야우리" &&
              <Table>
                <tbody>
                <tr>
                  <Td>출발시간</Td>
                  <Td>도착시간</Td>
                </tr>
                <tr>
                  <Td>08:35</Td>
                  <Td>08:55</Td>
                </tr>
                <tr>
                  <Td>09:35</Td>
                  <Td>09:55</Td>
                </tr>
                <tr>
                  <Td>10:35</Td>
                  <Td>10:55</Td>
                </tr>
                <tr>
                  <Td>11:30</Td>
                  <Td>11:50</Td>
                </tr>
                <tr>
                  <Td>12:35</Td>
                  <Td>12:55</Td>
                </tr>
                <tr>
                  <Td>13:35</Td>
                  <Td>13:55</Td>
                </tr>
                <tr>
                  <Td>14:35</Td>
                  <Td>14:55</Td>
                </tr>
                <tr>
                  <Td>15:30</Td>
                  <Td>15:50</Td>
                </tr>
                <tr>
                  <Td>16:35</Td>
                  <Td>16:55</Td>
                </tr>
                <tr>
                  <Td>17:35</Td>
                  <Td>17:55</Td>
                </tr>
                <tr>
                  <Td>18:35</Td>
                  <Td>18:55</Td>
                </tr>
                <tr>
                  <Td>19:35</Td>
                  <Td>19:55</Td>
                </tr>
                <tr>
                  <Td>20:30</Td>
                  <Td>20:50</Td>
                </tr>
                <tr>
                  <Td>22:05</Td>
                  <Td>22:25</Td>
                </tr>
                </tbody>
              </Table>
            }
            {daesungTimeTableTitle === "야우리 -> 학교" &&
            <Table>
              <tbody>
              <tr>
                <Td>출발시간</Td>
                <Td>도착시간</Td>
              </tr>
              <tr>
                <Td>07:00</Td>
                <Td>07:20</Td>
              </tr>
              <tr>
                <Td>08:00</Td>
                <Td>08:20</Td>
              </tr>
              <tr>
                <Td>09:00</Td>
                <Td>09:20</Td>
              </tr>
              <tr>
                <Td>10:00</Td>
                <Td>10:20</Td>
              </tr>
              <tr>
                <Td>11:00</Td>
                <Td>11:20</Td>
              </tr>
              <tr>
                <Td>12:00</Td>
                <Td>12:20</Td>
              </tr>
              <tr>
                <Td>13:00</Td>
                <Td>13:20</Td>
              </tr>
              <tr>
                <Td>14:00</Td>
                <Td>14:20</Td>
              </tr>
              <tr>
                <Td>15:00</Td>
                <Td>15:20</Td>
              </tr>
              <tr>
                <Td>16:00</Td>
                <Td>16:20</Td>
              </tr>
              <tr>
                <Td>17:00</Td>
                <Td>17:20</Td>
              </tr>
              <tr>
                <Td>18:00</Td>
                <Td>18:20</Td>
              </tr>
              <tr>
                <Td>19:00</Td>
                <Td>19:20</Td>
              </tr>
              <tr>
                <Td>20:30</Td>
                <Td>20:50</Td>
              </tr>
              </tbody>
            </Table>
            }
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
