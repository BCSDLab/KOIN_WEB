import React from 'react'
import LectureListTable from './LectureListTable';
import styled, { css } from 'styled-components';

const Container = styled.div`

`;

const Title = styled.div`
  font-family: NanumSquare,serif;
  font-weight: 800;
  font-size: 20px;
  line-height: 1.2;
  text-align: left;
  color: #175c8e;
  margin-bottom: 27px;
`;

const GradeTable = styled.div`
  margin-top: 20px;
  width: 772px;
  table-layout: fixed;
`;

const GradeTableRow = styled.div`
  display: flex;
  width: 100%;
`;

const GradeTableStyle = css`
  width: 152px;
  border-collapse: collapse;
  border-left: none;
  height: 37px;
  line-height: 37px;
  font-size: 13px;
  padding: 0px;
  text-align: center;
  border-bottom: 1px #858585 solid;
  border-right: 1px #d2dae2 solid;
  color: #555555;
`;

const GradeTableTitle = styled.div`
  ${GradeTableStyle}
  background-color: #eaf3fc;

`;

const GradeTableData = styled.div`
  ${GradeTableStyle}
  background: #ffffff;
`;

export default React.memo(function MyLectures({
  isMyLectureLoading,
  myLectures,
  myTimeTableGrade,
  nowLectureIdx,
  selectLectureInTotalTable,
  addLectureOnMyTable,
  removeLectureFromMyTable
}) {
  const gradeTitle = ['총 학점', '전공학점', '교양학점', 'HRD학점', '융합학점'];
  return (
    <Container>
      <Title>나의 시간표</Title>
      <LectureListTable
        isMyLectureLoading={isMyLectureLoading}
        lectures={myLectures}
        isMyLecture={true}
        nowLectureIdx={nowLectureIdx}
        selectLectureInTotalTable={selectLectureInTotalTable}
        addLectureOnMyTable={addLectureOnMyTable}
        removeLectureFromMyTable={removeLectureFromMyTable}
      />
      <GradeTable>
        <GradeTableRow>
          {gradeTitle.map((title, index) => <GradeTableTitle key={index}>{title}</GradeTableTitle>)}
        </GradeTableRow>
        <GradeTableRow>
          {myTimeTableGrade.map((grade, index) => <GradeTableData key={index}>{grade}</GradeTableData>)}
        </GradeTableRow>
      </GradeTable>
    </Container>
  )
})
