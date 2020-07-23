import React, { useState, useRef, useCallback } from 'react'
import styled from 'styled-components';
import domtoimage from 'dom-to-image';
import ClipLoader from 'react-spinners/ClipLoader';
import OutsideClickHandler from '../OutsideClickHandler';
import { useToasts } from 'react-toast-notifications';

const Container = styled.div`
  width: 336px;

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  @media (max-width: 576px) {
    width: 320px;
    height: 50px;
    margin: 0 auto;
  }
`;

const IconImage = styled.img`
  width: 24px;
`;

const SaveButton = styled.button`
  width: 166px;
  height: 45px;
  border: solid 1px #175c8e;
  padding: 1px 6px;
  background-color: #175c8e;
  font-size: 15px;
  line-height: 1.6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fdfdfd;
  cursor: pointer;

  @media (max-width: 576px) {
    width: 151px;
    height: 31px;
    font-size: 12px;
  }
`;

const DropdownWrapper = styled.div`
  width: 166px;
  position: relative;

  @media (max-width: 576px) {
    width: 151px;
  }
`;

const DropdownButton = styled.button`
  width: 166px;
  height: 45px;
  border: solid 1px #d2dae2;
  background-color: #ffffff;
  font-size: 15px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  @media (max-width: 576px) {
    width: 151px;
    height: 31px;
    font-size: 14px;
  }
`;

const DropdownContentWrapper = styled.div`
  position: absolute;
  top: 49px;
  width: 100%;
  z-index: 5;

  @media (max-width: 576px) {
    top: 34px;
  }
`;

const DropdownContent = styled.button`
  box-sizing: border-box;
  padding: 10px 20px;
  width: 166px;
  height: 42px;
  text-align: left;
  background: #ffffff;
  border: 1px #d2dae2 solid;
  font-family: NanumBarunGothic;
  font-size: 15px;
  font-weight: ${props => props.selected ? 'bold' : 'normal'};
  color: ${props => props.selected ? '#252525' : '#858585'};
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.11), 0 5px 15px 0 rgba(0, 0, 0, 0.08);
  border-collapse: collapse;
  cursor: pointer;
  
  &:hover {
    font-weight: bold;
    color: #252525;
  }

  @media (max-width: 576px) {
    width: 151px;
    height: 31px;
    font-size: 14px;
    padding: 0 0 0 10px;
  }
`;

const TableWrapper = styled.div`
  position: relative;
  height: 416px;

  @media (max-width: 576px) {
    height: ${props => props.isOpen ? '856px' : '603px'};
    /* 856 = 546 + 310, 603 = 546 + 57 */
    overflow: scroll;
  }
`;

const TableBodyRow = styled.tr`
  border-right: 1px solid #dadada;
  @media (max-width: 576px) {
    display: ${props => props.extra && 'none'};
  }
`;

const Table = styled.table`
  z-index: 2;
  background: white;
  position: absolute;
  font-size: 11px;
  border-spacing: 0px;
  border-collapse: collapse;
  table-layout: fixed;

  & thead {
    width: 100%;
  }

  & tbody ${TableBodyRow}:last-child {
    height: 42px;
    border-bottom: 1px solid #dadada;
  }

  @media (max-width: 576px) {
    width: 100%;

    & thead {
      box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px 0px;
    }

    & tbody ${TableBodyRow}:last-child {
      height: 29px;
      border-bottom: 1px rgba(218, 218, 218, 0.3) solid;
    }
  }
`;

const TableHeadContent = styled.td`
  border-collapse: collapse;
  border: 1px solid #dadada;
  width: ${props => props.index === 0 ? '22px' : (props.index === 1 ? '25px' : '56px')};
  height: 34px;
  text-align: center;
  background-color: #f1f1f1;
  color: #555;

  @media (max-width: 576px) {
    height: 21px;
    font-size: 11px;
    border: none;
  }
`;

const TableBodyContent = styled.td`
  height: 21px;
  text-align: center;
  border-top: ${props => props.index % 2 === 1 ? '1px rgba(218, 218, 218, 0.3) solid' : '1px #dadada solid'};
  border-left: 1px solid #dadada;
  color: #252525;
  box-sizing: border-box;

  @media (max-width: 576px) {
    font-size: 9px;
    height: 29px;
  }
`;

const LectureSection = styled.div`
  position: absolute;
  text-align: left;
  padding: 0 3.5px;
  z-index: 1;
`;

const LectureTitle = styled.div`
  font-family: NanumSquare;
  font-size: 9px;
  font-weight: bold;
  line-height: 1.33;
  letter-spacing: -0.27px;
  text-align: left;
  color: #252525;
  padding-bottom: 8px;
`;

const LectureInfo = styled.div`
  font-family: NanumSquare;
  font-size: 9px;
  font-weight: normal;
  line-height: 1.33;
  letter-spacing: -0.27px;
  text-align: left;
  color: #252525;
`;

export default React.memo(function MyTimeTable({
  selectedLayout,
  layout,
  isOpen,
  totalSemesters,
  selectedSemester,
  initStateBySemester,
  mobile,
  selectLectureFromMyTable,
  removeSelectionBorder
}) {
  const tableRef = useRef();
  const [isSaving, setIsSaving] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const days = ["", "", "월요일", "화요일", "수요일", "목요일", "금요일"];
  let timeAlias = ["01A", "01B", "02A", "02B", "03A", "03B", "04A", "04B", "05A", "05B", "06A", "06B", "07A", "07B", "08A", "08B", "09A", "09B"];
  let times = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];
  const mobileTimeAlias = ["10A", "10B", "11A"];
  const mobileTimes = ["18:00", "18:30", "19:00"];
  const { addToast } = useToasts();

  const saveTimeTable = useCallback(async () => {
    removeSelectionBorder();
    setIsSaving(true);
    const date = new Date();
    console.log(tableRef);
    const result = await domtoimage.toJpeg(tableRef.current, { quality: 0.95, position: 'absolute' });
    const link = document.createElement('a');
    link.download = `${date.getFullYear()}년 ${date.getMonth() + 1 <= 6 ? 1 : 2}학기 시간표.jpg`;
    link.href = result;
    link.click();
    addToast('시간표 이미지를 성공적으로 다운로드했습니다.', {
      appearance: 'success',
      autoDismiss: true
    })
    setIsSaving(false);
  }, [addToast]);

  const selectSemester = semester => {
    setDropdown(false);
    initStateBySemester(semester);
  }

  const fillBackground = useCallback((x, y) => {
    for (let value of layout) {
      if (x === value.start.x && (y >= value.start.y && y <= value.end.y)) {
        return {
          'backgroundColor': value.backgroundColor,
          'borderTopColor': value.borderBottomColor,
          'position': 'relative'
        }
      }
    }
    return ;
  }, [layout]);

  const styleLectureTitle = useCallback((x, y) => {
    for (let value of layout) {
      if (x === value.start.x && y === value.start.y) {
        return value.title;
      }
    }
    return ;
  }, [layout]);

  const styleLectureInfo = useCallback((x, y) => {
    for (let value of layout) {
      if (x === value.start.x && y === value.start.y) {
        return value.info;
      }
    }
    return ;
  }, [layout]);

  const renderSelectBox = useCallback((x, y) => {
    for(let i = 0; i < selectedLayout.length; i++) {
      if (selectedLayout[i].selected) {
        if (x === selectedLayout[i].start.x && y === selectedLayout[i].start.y) {
          return {
            'borderTop': '3px solid #555555',
            'borderRight': '3px solid #555555',
            'borderLeft': '3px solid #555555',
          }
        } else if (x === selectedLayout[i].end.x && y === selectedLayout[i].end.y) {
          return {
            'borderRight': '3px solid #555555',
            'borderLeft': '3px solid #555555',
            'borderBottom': '3px solid #555555',
          }
        } else if (x === selectedLayout[i].start.x && (y > selectedLayout[i].start.y && y < selectedLayout[i].end.y)) {
          return {
            'borderRight': '3px solid #555555',
            'borderLeft': '3px solid #555555',
          }
        }
      } else {
        if (x === selectedLayout[i].start.x && y === selectedLayout[i].start.y) {
          return {
            'borderTop': '1px solid #555555',
            'borderRight': '1px solid #555555',
            'borderLeft': '1px solid #555555',
          }
        } else if (x === selectedLayout[i].end.x && y === selectedLayout[i].end.y) {
          return {
            'borderRight': '1px solid #555555',
            'borderLeft': '1px solid #555555',
            'borderBottom': '1px solid #555555',
          }
        } else if (x === selectedLayout[i].start.x && (y > selectedLayout[i].start.y && y < selectedLayout[i].end.y)) {
          return {
            'borderRight': '1px solid #555555',
            'borderLeft': '1px solid #555555'
          }
        } else if (x === selectedLayout[i].start.x && y === -1 && selectedLayout[i].start.y === 0) {
          return {
            'borderBottom': 'none'
          }
        }
      }
    }
  }, [selectedLayout]);

  return (
    <Container>
      <Header>
        <OutsideClickHandler
          Container={DropdownWrapper}
          dropdown={dropdown}
          onOutsideClick={() => setDropdown(false)}>
          <DropdownButton
            type="button"
            onClick={() => setDropdown(!dropdown)}>
            {selectedSemester && `${selectedSemester.substring(0, 4)}년 ${selectedSemester[4]}학기`}
            <IconImage src={"https://static.koreatech.in/assets/img/ic-arrow-up-down.png"} />
          </DropdownButton>
          {dropdown && <DropdownContentWrapper>
            {totalSemesters.map(semester => 
              <DropdownContent
                type="button"
                selected={selectedSemester === semester.semester}
                key={semester.id}
                onClick={() => selectSemester(semester.semester)}>
                {`${semester.semester.substring(0, 4)}년 ${semester.semester[4]}학기`}
              </DropdownContent>)
            }
          </DropdownContentWrapper>}
        </OutsideClickHandler>
        
        <SaveButton
          type="button"
          onClick={saveTimeTable}>
          {!isSaving && <IconImage src={"https://static.koreatech.in/assets/img/ic-image.png"} />}
          {!isSaving && "이미지로 저장하기"}
          <ClipLoader
            size={25}
            color={"#fff"}
            loading={isSaving}
          />
        </SaveButton>
      </Header>
      <TableWrapper
        isOpen={isOpen}>
        <Table ref={tableRef}>
          <thead>
            <tr>
              {days.map((day, theadIdx) => 
                <TableHeadContent
                  index={theadIdx}
                  key={theadIdx}
                  style={renderSelectBox(theadIdx, -1)}
                >
                  {day}
                </TableHeadContent>  
              )}
            </tr>
          </thead>
          <tbody>
            {times.map((time, index) =>
              <TableBodyRow
                key={index}>
                <TableBodyContent
                  index={index}
                  style={renderSelectBox(0, index)}
                  >
                  {timeAlias[index]}
                </TableBodyContent>
                <TableBodyContent
                  index={index}
                  style={renderSelectBox(1, index)}
                  >
                  {time}
                </TableBodyContent>
                {[...Array(5)].map((item, idx) => 
                  <TableBodyContent
                    index={index}
                    key={idx}
                    style={{
                      ...renderSelectBox(idx + 2, index),
                      ...fillBackground(idx + 2, index)
                    }}
                    onClick={() => window.innerWidth <= 576 ? selectLectureFromMyTable(idx + 2, index) : null}
                    >
                    <LectureSection>
                      <LectureTitle>{styleLectureTitle(idx + 2, index)}</LectureTitle>
                      <LectureInfo>{styleLectureInfo(idx + 2, index)}</LectureInfo>
                    </LectureSection>
                  </TableBodyContent>
                )}
              </TableBodyRow>
            )}
            <TableBodyRow extra>
              <TableBodyContent rowSpan="2" colSpan="2">그 이후</TableBodyContent>
              {[...Array(5)].map((item, index) => 
                <TableBodyContent
                  key={index}
                  style={{...fillBackground(index + 2, 18), ...renderSelectBox(index + 2, 18)}}>
                </TableBodyContent>
              )}
            </TableBodyRow>
          </tbody>
        </Table>
      </TableWrapper>
      
    </Container>
  )
})
