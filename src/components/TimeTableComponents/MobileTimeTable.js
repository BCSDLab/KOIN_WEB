import React from 'react'
import styled from 'styled-components';
import MobileMyTimeTable from './MobileMyTimeTable';
import MobileLectureSheet from './MobileLectureSheet';

const Container = styled.div`
  display: none;
  @media (max-width: 576px) {
    display: block;
  }
`;
export default function MobileTimeTable({
  totalSemesters,
  selectedSemester,
  layout,
  selectedLayout,
  initStateBySemester,

  lectures,
  myLectures,
  nowLectureIdx,
  isInfoSheet,
  isOpen,
  selectedMyLecture,
  selectLectureInTotalTable,
  addLectureOnMyTable,
  removeLectureFromMyTable,
  selectLecturesByMajor,
  searchLecturesByName,
  removeSelectionBorder
}) {  
  return (
    <Container>
      <MobileMyTimeTable
        myLectures={myLectures}
        totalSemesters={totalSemesters}
        selectedSemester={selectedSemester}
        selectedLayout={selectedLayout}
        layout={layout}
        isOpen={isOpen}
        isInfoSheet={isInfoSheet}
        initStateBySemester={initStateBySemester}
        removeSelectionBorder={removeSelectionBorder}
      />
      
      <MobileLectureSheet
        isOpen={isOpen}
        lectures={lectures}
        myLectures={myLectures}
        nowLectureIdx={nowLectureIdx}
        isInfoSheet={isInfoSheet}
        selectedMyLecture={selectedMyLecture}
        selectLectureInTotalTable={selectLectureInTotalTable}
        addLectureOnMyTable={addLectureOnMyTable}
        removeLectureFromMyTable={removeLectureFromMyTable}
        selectLecturesByMajor={selectLecturesByMajor}
        searchLecturesByName={searchLecturesByName}
      />   
    </Container>
    
  )
}
