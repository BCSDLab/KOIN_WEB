import React, { useState } from 'react'
import styled, { css } from 'styled-components';
import TableBodyContent from './TableBodyContent';
import { FixedSizeList as List } from 'react-window';
import ClipLoader from 'react-spinners/ClipLoader';

const StyledTable = styled.div`
  width: 766px;
  height: ${props => props.isMyLecture ? '176px' : '457px'};
  font-size: 13px;
  text-align: left;
  word-break: break-all;
  border-bottom: #858585 1px solid;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  margin-top: 14px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  ::-webkit-scrollbar {
    width: 0;
  }
`;

const TableHeaderRow = styled.div`
  width: 766px;
  height: 37px;
  line-height: 37px;
  border-bottom: #858585 1px solid;
  background: #f6f6f6;
`;

const THeadCommonStyle = css`
  ${props => props.index !== 10 && {
    paddingLeft: '10px',
    borderCollapse: 'collapse',
    borderRight: '#d2dae2 1px solid',
    float: 'left',
    wordBreak: 'break-all',
    whiteSpace: 'nowrap',
    height: '37px',
    color: '#555555'
  }};

  ${props => props.index === 10 && {
    borderRight: 'none',
    userSelect: 'none'
  }}

  ${props => (props.index === 2 || (props.index >= 5 && props.index <= 8)) && {
    textAlign: 'center',
    paddingLeft: '0'
  }}

  ${props => props.index === 3 && {
    paddingLeft: '8px'
  }}
`;

const SortWrapper = styled.div`
  display: inline-block;
  zoom: 1;
  cursor: pointer;
`;

const StyledList = styled(List)`
  -ms-overflow-style: none;
  // Firefox 대응
  scrollbar-width: none;
  ::-webkit-scrollbar { 
    display: none !important;
  }
`;

const SortArrowImage = styled.img`
  display: none;
  float: right;
  width: 24px;
  border: none;
  position: relative;
  top: 5px;
  cursor: pointer;
  margin-left: -6px;
`;

const TableHeader = styled.div`
  ${THeadCommonStyle};
  overflow-y: hidden;
  width: ${props => `${props.width}px`};

  &:hover {
    background: #e9e9e9;
  }

  &:hover ${SortArrowImage} {
    display: inline;
  }
`;

const ResizeCol = styled.div`
  top: 0;
  right: 0;
  width: 2px;
  height: 38px;
  position: relative;
  cursor: col-resize;
  background: transparent;
  user-select: none;
  float: right;
  z-index: 2;
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  height: calc(100% - 37px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TableBodyRow = styled.div`
  height: 34px;
  line-height: 34px;
  background: ${props => {
    if (props.selected) {
      return '#dbf3ff';
    }    
    if (props.index % 2 === 1) {
      return '#f7f7f7';
    } else {
      return '#ffffff';
    }
  }};
  color: #858585;

  &:hover {
    background: #dbf3ff61;
  }

  &:focus {
    background: #dbf3ff61;
  }
`;

const TableBodyLastBox = styled.div`
  padding-left: 10px;
  line-height: 34px;
  float: left;
  word-break: break-all;
  white-space: nowrap;
  cursor: pointer;
  width: 22px;
  height: 34px;
  text-align: center;
  border-right: none;
`;

const ButtonImage = styled.img`
  cursor: pointer;
  position: relative;
  top: 6px;
  right: 1px;
  width: 22px;
`;
export default React.memo(function LectureListTable({
  isLectureLoading,
  isMyLectureLoading,
  isMyLecture,
  lectures,
  nowLectureIdx,
  selectLectureInTotalTable,
  addLectureOnMyTable,
  removeLectureFromMyTable,
  sortLectureByColumn
}) {
  const headerTitle = [
    "코드", "과목명", "분반", "담당교수", "대상", "학점", "비고", "정원", "설계", "개설학부", ""
  ];
  // let colWidth = [63, 141, 54, 67, 53, 53, 53, 53, 53, 79, 6];
  const [colWidth, setColWidth] = useState([63, 141, 54, 67, 53, 53, 53, 53, 53, 79, 6]);
  const [sortFlag, setSortFlag] = useState([true, true, true, true, true, true, true, true, true, true]);
  const [dragInfo, setDragInfo] = useState({
    startX: 0,
    endX: 0
  })
  
  const sort = (idx) => {
    setSortFlag(sortFlag.map((flag, index) => index === idx ? !flag : flag));
    sortLectureByColumn(idx, isMyLecture, !sortFlag[idx]);
  }

  return (
    <StyledTable isMyLecture={isMyLecture}>
      <TableHeaderRow>
        {headerTitle.map((title, index) => 
          <TableHeader
            key={index}
            isMyLecture={isMyLecture}
            index={index}
            width={colWidth[index]}
          >
            {title}
            {(index !== headerTitle.length - 1) && 
              <SortWrapper
                onClick={() => sort(index)}>
                {sortFlag[index] && <SortArrowImage src={"https://static.koreatech.in/assets/img/ic-arrow-down.png"} />}
                {!sortFlag[index] && <SortArrowImage src={"https://static.koreatech.in/assets/img/ic-arrow-up.png"} />}
              </SortWrapper>}
            {index !== 10 &&
              <ResizeCol
                draggable={true}
              />
            }
          </TableHeader>
        )}
      </TableHeaderRow>
      {(isMyLectureLoading || isLectureLoading) &&
        <SpinnerWrapper>
          <ClipLoader
            size={isMyLecture ? 80 : 200}
            color={"#175c8e"}
            loading={isMyLecture ? isMyLectureLoading : isLectureLoading}
          />
        </SpinnerWrapper>
      }
      {lectures &&
        <StyledList
          width={766}
          height={isMyLecture ? 139 : 420}
          itemData={lectures}
          itemCount={lectures.length}
          itemSize={34}>
          {({ index, style }) => (
            <TableBodyRow
              style={style}
              key={index}
              index={index}
              selected={!isMyLecture && nowLectureIdx === index}>
              <TableBodyContent
                isMyLecture={isMyLecture}
                lecture={lectures[index]}
                index={index}
                colWidth={colWidth}
                selectLectureInTotalTable={selectLectureInTotalTable}
              />
              
              <TableBodyLastBox
                onClick={isMyLecture 
                  ? () => removeLectureFromMyTable(index, lectures[index].id) 
                  : () => addLectureOnMyTable(lectures[index])}>
                {isMyLecture
                  ? <ButtonImage src={"https://static.koreatech.in/assets/img/ic-delete.png"}/>
                  : <ButtonImage src={"https://static.koreatech.in/assets/img/ic-add.png"} />
                }
              </TableBodyLastBox>
            </TableBodyRow> 
          )}
        </StyledList>
      }
    </StyledTable>
  )
})
