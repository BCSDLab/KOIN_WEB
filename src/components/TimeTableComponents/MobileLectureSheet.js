import React, { useState } from 'react'
import styled, { css } from 'styled-components';
import { FixedSizeList as List } from 'react-window';
import { useDispatch } from 'react-redux';
import { updateSheetType, toggleSheetOpen } from '../../modules/timetable';

const Container = styled.div`
  width: 100%;
  height: ${props => props.isOpen ? '310px' : '0'};
  position: fixed;
  bottom: 0;
  left: 0;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
  transition: all .3s;
  z-index: 30;
  background: #ffffff;
`;

const Header = styled.div`
  height: 48px;
  background: #fff;
  border-bottom: 1px solid #d2dae2;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: bold;
  line-height: 1.13;
  color: #175c8e;
`;

const ButtonStyle = css`
  background-color: #ffffff;
  border: none;
  font-size: 15px;
  line-height: 1.13;
  text-align: center;
  color: #252525;
  padding: 0;
  cursor: pointer;
  position: absolute;
`;

const RemoveButton = styled.button`
  ${ButtonStyle}
  left: 16px;
  color: #f7941e;
`;

const CloseButton = styled.button`
  ${ButtonStyle}
  right: 16px;
  color: #252525;
`;

const HelperSection = styled.div`
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  padding: 0 16px;
  border-bottom: 1px solid #d2dae2;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalOpenButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const SearchFieldWrapper = styled.div`
  background: #fff;
  border: solid 1px #d2dae2;
  width: calc(100% - 70px);
  height: 36px;
  display: flex;
  align-items: center;
  padding-right: 8px;
`;

const SearchField = styled.input`
  border: none;
  background-color: #ffffff;
  padding-left: 10px;
  font-family: NanumBarunGothic;
  font-size: 13px;
  line-height: 1.85;
  text-align: left;
  color: #252525;
  width: 100%;

  &::placeholder {
    color: #bec9d5;
  }
`;

const IconImage = styled.img`
  width: 24px;
  cursor: pointer;
`;

const InfoCard = styled.div`
  padding: 14px 16px;
`;

const ListCard = styled.div`

`;

const LectureWrapper = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #d2dae2;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  box-sizing: border-box;
  background: ${props => props.selected ? 'rgb(246, 246, 246)' : '#ffffff'};
`;

const LectureName = styled.div`
  font-size: 15px;
  font-weight: bold;
  line-height: 1.6;
  text-align: left;
  color: #252525;
  margin-bottom: 8px;
`;

const LectureInfo = styled.div`
  font-size: 13px;
  line-height: 1.46;
  text-align: left;
  color: #252525;
`;

const Button = styled.button`
  background-color: transparent;
  width: 22px;
  height: 22px;
  padding: 0;
  border: none;
  cursor: pointer;
`;

const ButtonImage = styled.img`
  width: 22px;
  height: 22px;
  z-index: 2;
`;

const DarkBackground = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 15;
  background-color: rgba(0, 0, 0, 0.2);
`;

const MajorListModal = styled.div`
  width: 300px;
  height: 303px;
  background-color: #ffffff;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  position: fixed;
  top: calc((100% - 300px) / 2);
  left: calc((100% - 300px) / 2);
  z-index: 30;
  padding: unset;
  transition: width 1s, height 1s;
`;

const ModalTitle = styled.div`
  font-size: 15px;
  line-height: 1.13;
  letter-spacing: -0.6px;
  text-align: left;
  color: #252525;
  padding-left: 14px;
  padding-top: 16px;
`;

const ModalBody = styled.div`
  padding: 16px 14px 0px 14px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const CompleteButton = styled.button`
  background-color: transparent;
  border: none;
  width: 58px;
  height: 36px;
  padding: 8px 16px;
  margin: 3px 14px 9px 0;
  float: right;
  font-size: 15px;
  line-height: 1.13;
  letter-spacing: -0.6px;
  text-align: center;
  color: #175c8e;
  cursor: pointer;
`;

const MajorButton = styled.button`
  background-color: ${props => props.selected ? '#f7941e' : '#ffffff'};
  width: 132px;
  height: 30px;
  border-radius: 20px;
  border: ${props => props.selected ? '1px solid #f7941e' : '1px solid #d2dae2'};
  font-size: 12px;
  font-weight: ${props => props.selected ? 'bold' : 'normal'};
  line-height: 2;
  text-align: center;
  color: ${props => props.selected ? '#ffffff' : '#858585'};
  margin-bottom: 11px;
  padding: 0;
  cursor: pointer;
`;

export default function MobileLectureSheet({
  isOpen,
  lectures,
  myLectures,
  nowLectureIdx,
  isInfoSheet,
  selectedMyLecture,
  selectLectureInTotalTable,
  addLectureOnMyTable,
  removeLectureFromMyTable,
  selectLecturesByMajor,
  searchLecturesByName
}) {
  const dispatch = useDispatch();
  const [searchWord, setSearchWord] = useState('');
  const [modal, setModal] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState('전체');
  const days = ["월", "화", "수", "목", "금"];
  const timeAlias = ["01A", "01B", "02A", "02B", "03A", "03B", "04A", "04B", "05A", "05B", "06A", "06B", "07A", "07B", "08A", "08B", "09A", "09B", "10A", "10B", "11A", "11B"];
  const majors = ["컴퓨터공학부", "메카트로닉스공학부", "전기ㆍ전자ㆍ통신공학부", "에너지신소재화학공학부", "기계공학부", "디자인ㆍ건축공학부", "산업경영학부", "교양학부", "HRD학과", "융합학과"];

  const onSearchWordChange = e => {
    setSearchWord(e.target.value);
  }

  const convertClassTime = times => {
    if (!times.length) return '미정';
    for (let i = 0; i < times.length - 1; i++) {
      if (days[parseInt(times[i] / 100)] !== days[parseInt(times[i + 1] / 100)]) {
        return `
          ${days[parseInt(times[0] / 100)]} ${timeAlias[parseInt(times[0] % 100)]}~${timeAlias[parseInt(times[i] % 100)]}, 
          ${days[parseInt(times[i + 1] / 100)]} ${timeAlias[parseInt(times[i + 1] % 100)]}~${timeAlias[parseInt(times[times.length - 1] % 100)]}
        `;
      }
    }
    return `${days[parseInt(times[0] / 100)]} ${timeAlias[parseInt(times[0] % 100)]}~${timeAlias[parseInt(times[times.length - 1] % 100)]}`;
  }

  const isMyLecture = lecture => {
    for (let lec of myLectures) {
      if (lecture.lecture_class === lec.lecture_class && lecture.name === lec.name) return true;
    }
    return false;
  }

  const selectMajor = major => {
    if (selectedMajor === "전체" || selectedMajor !== major) {
      setSelectedMajor(major)
      selectLecturesByMajor(major)
    } else if (selectedMajor === major) {
      setSelectedMajor("전체");
      selectLecturesByMajor("전체");
    }
  }

  const removeLecture = () => {
    let index, id;
    for (let i = 0; i < myLectures.length; i++) {
      if (myLectures[i].name === selectedMyLecture.name &&
          JSON.stringify(myLectures[i].class_time) === JSON.stringify(selectedMyLecture.class_time) &&
          myLectures[i].lecture_class === selectedMyLecture.lecture_class) 
        {
          index = i;
          id = myLectures[i].id
          break;
        }
    }
    removeLectureFromMyTable(index, id);
    dispatch(updateSheetType({
      flag: false,
      lecture: {}
    }));
  }

  return (
    <Container isOpen={isOpen}>
      <Header>
        {isInfoSheet && <RemoveButton onClick={removeLecture}>삭제</RemoveButton>}
        <Title>{isInfoSheet ? '수업 상세' : '수업 추가'}</Title>
        {!isInfoSheet && <CloseButton onClick={() => dispatch(toggleSheetOpen())}>완료</CloseButton>}
      </Header>
      {!isInfoSheet
        ?
        <ListCard>
          <HelperSection>
            <ModalOpenButton
              src={"https://static.koreatech.in/assets/img/ic-select.png"}
              onClick={() => setModal(true)} />
            <SearchFieldWrapper>
              <SearchField
                value={searchWord}
                placeholder="수업명을 입력해주세요"
                onChange={onSearchWordChange}
                onKeyPress={e => e.key === 'Enter' ? searchLecturesByName(searchWord) : null}
              />
              <IconImage
                onClick={() => searchLecturesByName(searchWord)}
                src={"http://static.koreatech.in/assets/img/ic-search-gray.png"} />
            </SearchFieldWrapper>
          </HelperSection>
          {lectures &&
            <List
              width={'100%'}
              height={214}
              itemData={lectures}
              itemCount={lectures.length}
              itemSize={80}>
              {({ index, style }) => (
                <LectureWrapper
                  style={style}
                  key={index}
                  selected={nowLectureIdx === index}
                  onClick={() => selectLectureInTotalTable(false, lectures[index], index)}>
                  <div>
                    <LectureName>{lectures[index].name}</LectureName>
                    <LectureInfo>
                      {`${lectures[index].lecture_class}분반 / ${lectures[index].department} / ${lectures[index].target}`}
                    </LectureInfo>
                    <LectureInfo>
                      { `${convertClassTime(lectures[index].class_time)} / ${lectures[index].professor === " " ? "미배정" : `${lectures[index].professor}`} / ${lectures[index].code}`}
                    </LectureInfo>
                  </div>
                  <Button>
                    <ButtonImage
                      src={
                        isMyLecture(lectures[index])
                          ? "http://static.koreatech.in/assets/img/ic-delete.png"
                          : "http://static.koreatech.in/assets/img/ic-add.png"}
                      onClick={
                        isMyLecture(lectures[index])
                          ? () => removeLectureFromMyTable(index, lectures[index].id)
                          : () => addLectureOnMyTable(lectures[index])
                      }      
                    />
                  </Button>
                </LectureWrapper>
              )}
            </List>
          }
        </ListCard>
        :
        <InfoCard>
          {selectedMyLecture &&
            <>
              <LectureName>{selectedMyLecture.name}</LectureName>
              <LectureInfo>
                {`${selectedMyLecture.lecture_class}분반 / ${selectedMyLecture.department} / ${selectedMyLecture.target}`}
              </LectureInfo>
              <LectureInfo>
                { `${convertClassTime(selectedMyLecture.class_time)} / ${selectedMyLecture.professor === " " ? "미배정" : `${selectedMyLecture.professor}`} / ${selectedMyLecture.code}`}
              </LectureInfo>
            </>
          }
        </InfoCard>
      }
      {modal && <DarkBackground>
        <MajorListModal>
          <ModalTitle>전공 선택</ModalTitle>
          <ModalBody>
            {majors.map((major, index) =>
              <MajorButton
                selected={selectedMajor === major}
                onClick={() => selectMajor(major)}
                key={index}>
                {major}
              </MajorButton>  
            )}
          </ModalBody>
          <CompleteButton onClick={() => setModal(false)}>완료</CompleteButton>
        </MajorListModal>
      </DarkBackground>}
    </Container>
  )
}
