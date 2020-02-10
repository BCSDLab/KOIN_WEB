import React from 'react'
import MobileMyTimeTable from './MobileMyTimeTable';
import MobileLectureSheet from './MobileLectureSheet';

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
  searchLecturesByName
}) {  
  return (
    <div>
      <MobileMyTimeTable
        myLectures={myLectures}
        totalSemesters={totalSemesters}
        selectedSemester={selectedSemester}
        selectedLayout={selectedLayout}
        layout={layout}
        isOpen={isOpen}
        initStateBySemester={initStateBySemester}
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
    </div>
    
  )
}
