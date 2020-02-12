import React from 'react'
import styled, { css } from 'styled-components';

const ContentContainer = styled.div`
  float: left;
`;

const ContentStyle = css`
  ${props => props.index === 0 && {
    paddingLeft: '10px'
  }};

  ${props => props.index === 1 && {
    paddingLeft: '8px'
  }};

  ${props => props.index === 2 && {
    paddingLeft: '0',
    textAlign: 'center'
  }};
`;

const Content = styled.div`
  padding-left: 10px;
  line-height: 34px;
  border-right: #d2dae2 1px solid;
  float: left;
  word-break: break-all;
  overflow-x: scroll;
  white-space: nowrap;
  cursor: pointer;
  ${ContentStyle};
  width: ${props => `${props.width}px`};
  height: 34px;
`;

export default React.memo(function TableBodyContent({
  isMyLecture,
  lecture,
  index,
  colWidth,
  selectLectureInTotalTable
}) {

  const checkValueSpace = str => {
    return str === " " || str.trim() === "" ? "미배정" : str;
  }

  const resultAboutRemark = rawData => {
    let remarks = " - ";
    if (rawData.is_elearning === "Y")
      remarks = "e러닝";
    if (rawData.is_english === 'Y')
      remarks = "영강";
    if (rawData.is_english === 'Y' && rawData.is_elearning === "Y")
      remarks = "e+영";
    return remarks;
  }

  return (
    <ContentContainer
      onClick={() => !isMyLecture && selectLectureInTotalTable(isMyLecture, lecture, index)}>
      {lecture && (
        <>
        <Content
          width={colWidth[0]}
          index={0}>
          {checkValueSpace(lecture.code)}
        </Content>
        <Content
          width={colWidth[1]}>
          {checkValueSpace(lecture.name)}
        </Content>
        <Content
          width={colWidth[2]}
          index={2}>
          {checkValueSpace(lecture.lecture_class)}
        </Content>
        <Content
          width={colWidth[3]}
          index={1}>
          {checkValueSpace(lecture.professor)}
        </Content>
        <Content
          width={colWidth[4]}>
          {checkValueSpace(lecture.target)}
        </Content>
        <Content
          width={colWidth[5]}
          index={2}>
          {checkValueSpace(lecture.grades)}
        </Content>
        <Content
          width={colWidth[6]}
          index={2}>
          {checkValueSpace(resultAboutRemark(lecture))}
        </Content>
        <Content
          width={colWidth[7]}
          index={2}>
          {checkValueSpace(lecture.regular_number)}
        </Content>
        <Content
          width={colWidth[8]}
          index={2}>
          {checkValueSpace(lecture.design_score)}
        </Content>
        <Content
          width={colWidth[9]}>
          {checkValueSpace(lecture.department)}
        </Content>
        <div>
        </div>
        </>
      )}
    </ContentContainer>
  )
})