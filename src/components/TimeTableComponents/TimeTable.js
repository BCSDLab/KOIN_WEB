import React from 'react'
import styled from 'styled-components';
import OpenLectureTable from './OpenLectureTable';
import MyTimeTable from './MyTimeTable';
import MyLectures from './MyLectures';
import Curriculum from './Curriculum';

const Container = styled.div`
  width: 1132px;
  margin-top: 68px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 80px;
  min-height: 800px;
  @media (max-width: 576px) {
    display: none;
  }
`;

const Title = styled.div`
  text-align: left;
  float: left;
  font-family: NanumSquare,serif;
  font-size: 30px;
  font-weight: 800;
  color: #175c8e;
  width: 100%;
  height: 32px;
  margin-bottom: 21px;
  padding-bottom: 26px;
  border-bottom: 2px solid #175c8e;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export default function TimeTable({
  isLectureLoading,
  lectures,
  nowLectureIdx,
  selectLectureInTotalTable,
  addLectureOnMyTable,
  removeLectureFromMyTable,
  selectLecturesByMajor,
  searchLecturesByName,
  sortLectureByColumn,

  isMyLectureLoading,
  myLectures,
  selectedLayout,
  layout,
  totalSemesters,
  selectedSemester,
  initStateBySemester,

  myTimeTableGrade,
  removeSelectionBorder
}) {
  return (
    <Container>
      <Title>
        시간표
      </Title>
      <Row>
        <OpenLectureTable
          isLectureLoading={isLectureLoading}
          lectures={lectures}
          nowLectureIdx={nowLectureIdx}
          selectLectureInTotalTable={selectLectureInTotalTable}
          addLectureOnMyTable={addLectureOnMyTable}
          selectLecturesByMajor={selectLecturesByMajor}
          searchLecturesByName={searchLecturesByName}
          sortLectureByColumn={sortLectureByColumn}
        />
        <MyTimeTable
          myLectures={myLectures}
          selectedLayout={selectedLayout}
          layout={layout}
          totalSemesters={totalSemesters}
          selectedSemester={selectedSemester}
          initStateBySemester={initStateBySemester}
          removeSelectionBorder={removeSelectionBorder}
        />
      </Row>
      <Row style={{ marginTop: '66px' }}>
        <MyLectures
          isMyLectureLoading={isMyLectureLoading}
          myLectures={myLectures}
          myTimeTableGrade={myTimeTableGrade}
          nowLectureIdx={nowLectureIdx}
          selectLectureInTotalTable={selectLectureInTotalTable}
          removeLectureFromMyTable={removeLectureFromMyTable}
        />
        <Curriculum />
      </Row>
    </Container>
  )
}
