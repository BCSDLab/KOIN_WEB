import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllLecture, getAllSemester, updateSheetType } from "../../modules/timetable";
import TimeTable from "../../components/TimeTableComponents/TimeTable";
import MobileTimeTable from '../../components/TimeTableComponents/MobileTimeTable';
import {
  initState,
  setSemester,
  resetLayout,
  getMyLectures,
  searchMyLectures,
  selectLecture,
  addLecture,
  removeLecture,
  resetSelectedLayout
} from "../../modules/timetable";
import Cookies from "js-cookie";
import { useToasts } from 'react-toast-notifications';

export default function TimeTableContainer() {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [nowLectureIdx, setNowLectureIdx] = useState(-1);
  const {
    lectures,
    myLectures,
    layout,
    selectedLayout,
    totalSemesters,
    selectedSemester,
    myTimeTableGrade,
    isLectureLoading,
    isMyLectureLoading,
    isInfoSheet,
    selectedMyLecture,
    isOpen
  } = useSelector(state => state.timetableReducer);
  const [localLectures, setLocalLectures] = useState(lectures);
  const [localMyLectures, setLocalMyLectures ] = useState(myLectures);

  // 강의 선택
  const selectLectureInTotalTable = useCallback((isMyLecture, lecture, index) => {
    if (!isMyLecture) {
      if (index === nowLectureIdx) {
        setNowLectureIdx(-1);
        dispatch(resetSelectedLayout());
        // dispatch(selectLecture({}));
      } else {
        setNowLectureIdx(index);
        dispatch(selectLecture({ lecture }));
      }
    }
  }, [dispatch, nowLectureIdx]);

  // 강의 추가
  const addLectureOnMyTable = useCallback(lecture => {
    setNowLectureIdx(-1);
    dispatch(addLecture({
      lecture,
      token: sessionStorage.getItem("token")
    }));
  }, [dispatch]);

  // 강의 제거
  const removeLectureFromMyTable = useCallback((index, id) => {
    dispatch(removeLecture({
      index,
      token: sessionStorage.getItem("token"),
      id
    }));
  }, [dispatch]);

  // 학기 선택할 때 강의 저장
  const initStateBySemester = useCallback(semester => {
    setNowLectureIdx(-1);
    dispatch(initState());
    dispatch(setSemester(semester));
    dispatch(resetLayout());
    dispatch(resetSelectedLayout());
  }, [dispatch]);

  // 전공 선택
  const selectLecturesByMajor = useCallback(major => {
    setNowLectureIdx(-1);
    if (major === "전체") {
      setLocalLectures(lectures);
    } else {
      setLocalLectures(lectures.filter(lecture => lecture.department.indexOf(major) !== -1))
    }
  }, [lectures]);

  // 강의 검색
  const searchLecturesByName = useCallback(name => {
    setNowLectureIdx(-1);
    let searchedData;
    searchedData = lectures.filter(lecture => 
      lecture.name.toLowerCase().indexOf(name) !== -1 ||
      lecture.name.toUpperCase().indexOf(name) !== -1 ||
      lecture.name.indexOf(name) !== -1);
    
    if (searchedData.length === 0) {
      addToast('검색어에 해당하는 강의가 없습니다.', {
        autoDismiss: true,
        appearance: 'error'
      })
    } else {
      setLocalLectures(searchedData);
    }
  }, [lectures, addToast]);

  // 비로그인 상태에서 과목 추가, 삭제 시 스토리지에 저장
  const saveLecture = useCallback(() => {
    if (!sessionStorage.getItem("token") && selectedSemester) {
      let timetableData = Cookies.get('timetable') ? JSON.parse(Cookies.get('timetable')) : {};
      timetableData[selectedSemester] = myLectures;
      Cookies.set("timetable", timetableData, { expires: 3 });
      console.log(myLectures);
      console.log("저장완료");
      console.log(JSON.parse(Cookies.get('timetable')));
    }
  }, [myLectures, selectedSemester])

  // 강의 정렬
  const sortLectureByColumn = useCallback((idx, isMyLecture, flag) => {
    let reverse = flag ? -1 : 1;
    let selectedColumnKey = "";
    switch (idx) {
      case 0:
        selectedColumnKey = 'code';
        break;
      case 1:
        selectedColumnKey = 'name';
        break;
      case 2:
        selectedColumnKey = 'grades';
        break;
      case 3:
        selectedColumnKey = 'lecture_class';
        break;
      case 4:
        selectedColumnKey = 'regular_number';
        break;
      case 5:
        selectedColumnKey = 'department';
        break;
      case 6:
        selectedColumnKey = 'target';
        break;
      case 7:
        selectedColumnKey = 'professor';
        break;
      case 8:
        selectedColumnKey = '';
        break;
      case 9:
        selectedColumnKey = 'design_score';
        break;
      default:
        selectedColumnKey = '';
    }
    let sortedData = isMyLecture ? localMyLectures : localLectures;
    if (idx === 8) {
      sortedData = sortedData.sort((a, b) => a.is_elearning + a.is_english < b.is_elearning + b.is_english ? reverse * -1 : reverse * 1);
    } else {
      sortedData = sortedData.sort((a, b) => a[selectedColumnKey] < b[selectedColumnKey] ? reverse * -1 : reverse * 1);
    }
    isMyLecture ? setLocalMyLectures(sortedData) : setLocalLectures(sortedData);
  }, [localLectures, localMyLectures]);

  const removeSelectionBorder = useCallback(() => {
    dispatch(resetSelectedLayout());
  }, [dispatch]);

  // 전체 학기 및 상태 초기화
  useEffect(() => {
    dispatch(getAllSemester());
    dispatch(initState());
    dispatch(resetLayout());
  }, [dispatch]);

  // 강의 목록 초기화
  useEffect(() => {
    if (selectedSemester) {
      dispatch(getAllLecture(selectedSemester));
    }
  }, [dispatch, selectedSemester]);

  // 내 시간표 초기화
  useEffect(() => {
    console.log("시간표 초기화");
    if (selectedSemester && !sessionStorage.getItem("token")) {
      let timetableData = Cookies.get('timetable') ? JSON.parse(Cookies.get('timetable')) : {};
      Object.keys(timetableData).length && dispatch(searchMyLectures({
        lectures: timetableData[selectedSemester],
        mobile: false
      }));
    } else if (selectedSemester && sessionStorage.getItem("token")) {
      dispatch(getMyLectures({
        token: sessionStorage.getItem("token"),
        mobile: false,
        semester: selectedSemester
      }))
    }
  }, [dispatch, selectedSemester]);

  useEffect(() => {
    saveLecture();
  }, [saveLecture]);

  useEffect(() => {
    lectures && setLocalLectures(lectures);
  }, [lectures]);

  useEffect(() => {
    myLectures && setLocalMyLectures(myLectures);
  }, [myLectures])

  return (
    <div>
      <TimeTable
        isLectureLoading={isLectureLoading}
        lectures={localLectures}
        nowLectureIdx={nowLectureIdx}
        selectLectureInTotalTable={selectLectureInTotalTable}
        addLectureOnMyTable={addLectureOnMyTable}
        removeLectureFromMyTable={removeLectureFromMyTable}
        selectLecturesByMajor={selectLecturesByMajor}
        searchLecturesByName={searchLecturesByName}
        sortLectureByColumn={sortLectureByColumn}

        isMyLectureLoading={isMyLectureLoading}
        myLectures={localMyLectures}
        selectedLayout={selectedLayout}
        layout={layout}
        totalSemesters={totalSemesters}
        selectedSemester={selectedSemester}
        initStateBySemester={initStateBySemester}

        myTimeTableGrade={myTimeTableGrade}
        removeSelectionBorder={removeSelectionBorder}
      />
      <MobileTimeTable
        totalSemesters={totalSemesters}
        selectedSemester={selectedSemester}
        selectedLayout={selectedLayout}
        layout={layout}
        initStateBySemester={initStateBySemester}

        lectures={localLectures}
        myLectures={localMyLectures}
        nowLectureIdx={nowLectureIdx}
        isInfoSheet={isInfoSheet}
        isOpen={isOpen}
        selectedMyLecture={selectedMyLecture}
        selectLectureInTotalTable={selectLectureInTotalTable}
        addLectureOnMyTable={addLectureOnMyTable}
        removeLectureFromMyTable={removeLectureFromMyTable}
        selectLecturesByMajor={selectLecturesByMajor}
        searchLecturesByName={searchLecturesByName}
        
        removeSelectionBorder={removeSelectionBorder}
      />
    </div>
  );
}
