import React from "react";
import styled from "styled-components";
import ClipLoader from 'react-spinners/ClipLoader';

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
    width : auto;
    display: flex;
    gap: 20px;
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
    width: calc(100% - 12px);
  }
`;

const DropDown = styled.div`
  position: relative;
  display: inline-block;
  height: 44px;
  
  ${DropDownButton}{
    background-color: ${props => props.isOpen && "#efefef"};
    box-shadow: ${props => props.isOpen && "0 8px 16px 0 rgba(0,0,0,0.2)"};
  }
  ${DropDownContents}{
    display: ${props => props.isOpen && "block"};
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
const Table = styled.div`
  border-bottom:1px solid #175c8e; 
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 67px;

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
`;

const TableHead = styled.div`
  width: 100%;
  height: 100%;
  font-size: 15px;
  display: flex;
  align-items: center;
  
`;

const TableHeadRow = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #175c8e;
`;

const TableHeadContent=styled.div`
  width: 50%;
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
`;

const TableBodyRow=styled.div`
  display: flex;
`;
const TableBodyContent=styled.div`
  width: 50%;
  font-size: 15px;
  padding-top: 25px;
  padding-bottom: 25px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  -webkit-letter-spacing: -0.8px;
  -moz-letter-spacing: -0.8px;
  -ms-letter-spacing: -0.8px;
  letter-spacing: -0.8px;
  text-align: center;
  color: #252525;
  border-bottom: 1px solid #d2dae2;

  &:hover{
    font-weight: 700;
  }
  
  @media (max-width: 576px) {
    overflow-x: scroll;
    padding-top: 13px;
    padding-bottom: 13px;
    font-size: 12px;
    min-width: ${props => !(props.rowIdx === 1 && props.index === 0) && props.isShuttle ? "" : "80px"}
  }

`;
const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  min-height:621px;
`;
export default function BusTimeTable(
  {
    tabs,
    selectedTab,
    selectTab,
    allcourse,
    allcourseId,
    setAllCourseReset,
    setRouteId,
    routeId,
    course,
    courses,
    isOpenType,
    setIsOpenType,
    isOpenTime,
    setIsOpenTime,
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
        {/* {console.log("course!!", course)} */}
        {/* {!course.loading && course?.data.map((data,index)=>{
          return(<>
            <div>{data.region}</div>
          </>)})
        } */}
        {/* 셔틀버스 */}
        {selectedTab === "학교셔틀" &&
          <div>
            <SubInfo>
              <DropDown isOpen={isOpenType}>
                <DropDownButton onClick={() => setIsOpenType(prev => !prev)}>
                  {allcourse[allcourseId].name}
                  <ArrowImg/>
                </DropDownButton>
                <DropDownContents onClick={() => setIsOpenType(false)}>
                  {/* {console.log('allcourse',allcourse)} */}
                {allcourse.filter((data,index)=> index <= 13).map((data,idx)=>{
                  return(
                    <DropDownContent
                      key={idx}
                      onClick={()=>setAllCourseReset(idx)}>
                      {data.name}
                    </DropDownContent>)
                })}
                </DropDownContents>
              </DropDown>
              {!course.loading && 
                <DropDown isOpen={isOpenTime}>
                  <DropDownButton onClick={() => setIsOpenTime(prev => !prev)}>
                    {course.data?.[routeId]?.route_name}
                    <ArrowImg/>
                  </DropDownButton>
                  <DropDownContents onClick={() => setIsOpenTime(false)}>
                    {course.data.map((data,index)=>{
                      return(
                      <DropDownContent
                        key={index}
                        onClick={()=>setRouteId(index)}>
                        {data.route_name}
                      </DropDownContent>)
                    })}
                  </DropDownContents>
                </DropDown>
              }
            </SubInfo>
            {course.loading &&
              <SpinnerWrapper>
                <ClipLoader
                  size={120}
                  color={"#175c8e"}
                  loading={course.loading}
                />
              </SpinnerWrapper>
            }
            {!course.loading && 
            <>
            
                <Table>
                  <TableHead>
                    <TableHeadRow>
                      <TableHeadContent>승차장소</TableHeadContent>
                      <TableHeadContent>시간</TableHeadContent>
                    </TableHeadRow>
                  </TableHead>
                  <div>
                    {course.data[routeId]?.arrival_info?.map((data,index)=>{
                      return(
                        <TableBodyRow key={index}>
                          <TableBodyContent>{data.node_name}</TableBodyContent>
                          <TableBodyContent>{data.arrival_time}</TableBodyContent>
                        </TableBodyRow>
                      )
                    })}
                  </div>
              </Table>
              {/* <TimeTableSubTitle>• 한기대 {allcourse[allcourseId].name.substr(0,allcourse[allcourseId].name.indexOf(' '))} &gt; </TimeTableSubTitle> */}

                {/* <Table>
                <TableHead>
                  <TableHeadRow>
                    <TableHeadContent>승차장소</TableHeadContent>
                    <TableHeadContent>시간</TableHeadContent>
                  </TableHeadRow>
                </TableHead>
                <div>
                  {course.data[routeId]?.arrival_info?.map((data,index)=>{
                    return(
                      <TableBodyRow key={index}>
                        <TableBodyContent>{data.node_name}</TableBodyContent>
                        <TableBodyContent>{data.arrival_time}</TableBodyContent>
                      </TableBodyRow>
                    )
                  })
                  }
                </div>
              </Table> */}
            </>
            }
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
                  {allcourse.filter((data,index)=> index > 13 && index <= 16).map((data,idx)=>{
                    return(
                      <DropDownContent
                        key={idx}
                        onClick={()=>setAllCourseReset(idx + 14)}>
                        {data.name}
                      </DropDownContent>)
                  })}
                </DropDownContents>
              </DropDown>
            </SubInfo>
            {course.loading &&
              <SpinnerWrapper>
                <ClipLoader
                  size={120}
                  color={"#175c8e"}
                  loading={course.loading}
                />
              </SpinnerWrapper>
            }
            {!course.loading && <>
              <Table>
              <TableHead>
                <TableHeadRow>
                  <TableHeadContent style={{width:'50%'}}>출발시간</TableHeadContent>
                  <TableHeadContent style={{width:'50%'}}>도착시간</TableHeadContent>
                </TableHeadRow>
              </TableHead>
              <div>              
                {allcourse[allcourseId].name==="한기대->야우리" &&
                  course.data.map((data,index)=>{
                    return(
                      <TableBodyRow key={index}>
                        <TableBodyContent style={{width:'50%'}}>{data.departure}</TableBodyContent>
                        <TableBodyContent style={{width:'50%'}}>{data.arrival}</TableBodyContent>
                      </TableBodyRow>)
                })}
                {allcourse[allcourseId].name==="야우리->한기대" &&
                  course.data.map((data,index)=>{
                    return(
                      <TableBodyRow key={index}>
                        <TableBodyContent style={{width:'50%'}}>{data.departure}</TableBodyContent>
                        <TableBodyContent style={{width:'50%'}}>{data.arrival}</TableBodyContent>
                      </TableBodyRow>)
                })}
            </div>
            </Table>
              
            </>}
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
            <TableHead>
                <TableHeadRow>
                  <TableHeadContent style={{width:'50%'}}>기점</TableHeadContent>
                  <TableHeadContent style={{width:'50%'}}>종합터미널 - 병천</TableHeadContent>
                </TableHeadRow>
              </TableHead>
              <div>
                <TableBodyRow>
                  <TableBodyContent style={{width:'50%'}}>시간표(터미널)</TableBodyContent>
                  <TableBodyContent style={{width:'50%'}}>6:00(첫) - 22:30(막) (10분간격)</TableBodyContent>
                </TableBodyRow>
                <TableBodyRow>
                  <TableBodyContent style={{width:'50%'}}>시간표(병천)</TableBodyContent>
                  <TableBodyContent style={{width:'50%'}}>6:10(첫) - 22:45(막) (10분간격)</TableBodyContent>
                </TableBodyRow>
                <TableBodyRow>
                  <TableBodyContent style={{width:'50%'}}>소요시간</TableBodyContent>
                  <TableBodyContent style={{width:'50%'}}>약 40분</TableBodyContent>
                </TableBodyRow>
              </div>
            </Table>
          </div>
        }
      </TimeTable>
    </Container>
  )
}
