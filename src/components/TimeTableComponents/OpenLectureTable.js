import React from 'react'
import styled from 'styled-components';
import LectureListTable from './LectureListTable';
import LectureTableHelper from './LectureTableHelper';

const Container = styled.div`
  width: 766px;
`;

export default function OpenLectureTable({
  isLectureLoading,
  lectures,
  nowLectureIdx,
  selectLectureInTotalTable,
  addLectureOnMyTable,
  removeLectureFromMyTable,
  selectLecturesByMajor,
  searchLecturesByName,
  sortLectureByColumn
}) {
  return (
    <Container>
      <LectureTableHelper
        selectLecturesByMajor={selectLecturesByMajor}
        searchLecturesByName={searchLecturesByName}
      />
      <LectureListTable
        isLectureLoading={isLectureLoading}
        isMyLecture={false}
        lectures={lectures}
        nowLectureIdx={nowLectureIdx}
        selectLectureInTotalTable={selectLectureInTotalTable}
        addLectureOnMyTable={addLectureOnMyTable}
        removeLectureFromMyTable={removeLectureFromMyTable}
        sortLectureByColumn={sortLectureByColumn}
      />
    </Container>
    
  )
}
