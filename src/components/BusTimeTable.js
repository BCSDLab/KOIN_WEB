import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width:100%;
`;

const TimeTable = styled.div`
  margin-top: 82px;
  width: 1131px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: -1px;
  text-align: left;
  color: #252525;
  margin-bottom: 22px;
`;

const BusTabs = styled.div`
  width: 100%;
  margin-bottom: 2%;
  display:flex;
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
`;

const SubInfo = styled.div`
  height: 58px;
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
  width: 180px;
  text-align: left;
  background-color: #ffffff;
`;

const DropDownContents = styled.div`
  display: none;
  position: absolute;
  background-color: #ffffff;
  border: 1px #d0d0d0 solid;
  width: 178px;
  z-index: 1;
  margin-top: 41px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.8px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
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
                  {shuttleTimeTable.map((titles, idx)=> {
                    if(idx < (vacationFlag? 9: 6))
                    return (
                      <DropDownContent onClick={setShuttleDropDownTitle(titles.title)}>
                        {titles.title}
                      </DropDownContent>
                    )
                  })}
                </DropDownContents>
              </DropDown>
              <SubDesc>
                천안(터미널/천안역) 등교/하교(18:10)
              </SubDesc>
            </SubInfo>
            {shuttleTimeTable.map((timeTable) => {
              if(timeTable.title === shuttleTimeTableTitle) {
                if(!vacationFlag) {
                  return (
                  //  학기중
                    <Table>
                      {timeTable.timetable.map((times) => {
                        return (
                          <tr>
                            {times.map((time,index)=> {
                              return (
                                <Td>
                                  {time}
                                </Td>
                              )
                            })}
                          </tr>
                        )
                      })}
                    </Table>
                  )
                }

                // 방학중
                if(vacationFlag) {
                  return (
                    <div>
                      <Table>
                        {timeTable.timetable.map((times, rowIdx) => {
                          return (
                            <tr>
                              {times.map((time,index)=> {
                                return (
                                  <Td
                                    rowSpan={rowIdx === 1 && index === 0 ? timeTable.rowspan : 1}
                                    rowIdx={rowIdx}
                                    index={index}
                                    isShuttle={true}>
                                    {time}
                                  </Td>
                                )
                              })}
                            </tr>
                          )
                        })}
                      </Table>
                      {timeTable.timetable2 &&
                        <Table>
                          {timeTable.timetable2.map((times, rowIdx) => {
                            return (
                              <tr>
                                {times.map((time,index)=> {
                                  return (
                                    <Td
                                      rowSpan={rowIdx === 1 && index === 0 ? timeTable.rowspan : 1}
                                      rowIdx={rowIdx}
                                      index={index}
                                      isShuttle={true}>
                                      {time}
                                    </Td>
                                  )
                                })}
                              </tr>
                            )
                          })}
                        </Table>
                      }
                    </div>
                  )
                }
              }
            })}
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
                  {daesungTimeTable.map((titles)=> {
                    return (
                      <DropDownContent onClick={setDaesungDropDownTitle(titles)}>
                        {titles}
                      </DropDownContent>
                    )
                  })}
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
                  <Td>08:00</Td>
                  <Td>08:20</Td>
                </tr>
                <tr>
                  <Td>09:35</Td>
                  <Td>09:55</Td>
                </tr>
                <tr>
                  <Td>10:30</Td>
                  <Td>10:50</Td>
                </tr>
                <tr>
                  <Td>11:45</Td>
                  <Td>12:00</Td>
                </tr>
                <tr>
                  <Td>12:35</Td>
                  <Td>12:55</Td>
                </tr>
                <tr>
                  <Td>14:00</Td>
                  <Td>14:20</Td>
                </tr>
                <tr>
                  <Td>15:05</Td>
                  <Td>15:25</Td>
                </tr>
                <tr>
                  <Td>16:00</Td>
                  <Td>16:20</Td>
                </tr>
                <tr>
                  <Td>16:55</Td>
                  <Td>17:15</Td>
                </tr>
                <tr>
                  <Td>18:05</Td>
                  <Td>18:25</Td>
                </tr>
                <tr>
                  <Td>18:55</Td>
                  <Td>19:15</Td>
                </tr>
                <tr>
                  <Td>20:00</Td>
                  <Td>20:20</Td>
                </tr>
                <tr>
                  <Td>21:25</Td>
                  <Td>21:05</Td>
                </tr>
                <tr>
                  <Td>21:55</Td>
                  <Td>22:15</Td>
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
                <Td>07:30</Td>
                <Td>07:50</Td>
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
                <Td>14:30</Td>
                <Td>14:50</Td>
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
                <Td>17:50</Td>
                <Td>18:10</Td>
              </tr>
              <tr>
                <Td>19:30</Td>
                <Td>19:50</Td>
              </tr>
              <tr>
                <Td>20:30</Td>
                <Td>20:50</Td>
              </tr>
              <tr>
                <Td>21:00</Td>
                <Td>21:20</Td>
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
