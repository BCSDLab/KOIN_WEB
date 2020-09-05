import { infoAPI } from '../api';

export const INIT_STATE = "INIT_STATE";

export const GET_MY_LECTURES = "GET_MY_LECTURES";
export const GET_MY_LECTURES_SUCCESS = "GET_MY_LECTURES_SUCCESS";
export const GET_MY_LECTURES_ERROR = "GET_MY_LECTURES_ERROR";

export const GET_MY_INDEX_LECTURES = "GET_MY_INDEX_LECTURES";
export const GET_MY_INDEX_LECTURES_SUCCESS = "GET_MY_INDEX_LECTURES_SUCCESS";
export const GET_MY_INDEX_LECTURES_ERROR = "GET_MY_INDEX_LECTURES_ERROR";

export const GET_ALL_SEMESTER = "GET_ALL_SEMESTER";
export const GET_ALL_SEMESTER_SUCCESS = "GET_ALL_SEMESTER_SUCCESS";
export const GET_ALL_SEMESTER_ERROR = "GET_ALL_SEMESTER_ERROR";

export const GET_ALL_LECTURE = "GET_ALL_LECTURE";
export const GET_ALL_LECTURE_SUCCESS = "GET_ALL_LECTURE_SUCCESS";
export const GET_ALL_LECTURE_ERROR = "GET_ALL_LECTURE_ERROR";

// 강의 선택 시
export const SELECT_LECTURE_SUCCESS = "SELECT_LECTURE_SUCCESS";
export const SELECT_LECTURE_ERROR = "SELECT_LECTURE_ERROR";

// 강의 추가 시
export const UPDATE_LAYOUT = "UPDATE_LAYOUT";
export const ADD_LECTURE_SUCCESS = "ADD_LECTURE_SUCCESS";
export const ADD_LECTURE_ERROR = "ADD_LECTURE_ERROR"

// 강의 삭제 시
export const REMOVE_LECTURE_SUCCESS = "REMOVE_LECTURE_SUCCESS";
export const REMOVE_LECTURE_ERROR = "REMOVE_LECTURE_ERROR";

export const UPDATE_GRADES = "UPDATE_GRADES";
export const RESET_LAYOUT = "RESET_LAYOUT";
export const RESET_SELECTED_LAYOUT = "RESET_SELECTED_LAYOUT";
export const RESET_COLORS = "RESET_COLORS";
export const SELECT_SEMESTER = "SELECT_SEMESTER";
export const UPDATE_SHEET_TYPE = "UPDATE_SHEET_TYPE";
export const TOGGLE_SHEET_OPEN = "TOGGLE_SHEET_OPEN";

export const initState = () => ({ type: INIT_STATE });
export const setSemester = payload => ({ type: SELECT_SEMESTER, payload });
export const getAllSemester = () => ({ type: GET_ALL_SEMESTER });
export const getAllLecture = semester => ({
  type: GET_ALL_LECTURE,
  payload: {
    semester
  }
});

export const resetLayout = () => ({ type: RESET_LAYOUT });
export const resetSelectedLayout = () => ({ type: RESET_SELECTED_LAYOUT });
export const getMyLectures = payload => async (dispatch, getState) => {
  const { token, semester, mobile } = payload;
  const { removedColors, colors, colorIndex } = getState().timetableReducer;
  let tmpIdx = colorIndex;
  let tmpRemovedIdx = 0;
  dispatch({ type: GET_MY_LECTURES });
  try {
    const res = await infoAPI.getMyTimeTable(token, semester);
    console.log(res);
    if (res.data.timetable.length !== 0) {
      let timetable = res.data.timetable;
      if (mobile) {
        dispatch({ type: RESET_COLORS })
      }
      for (let lecture of timetable) {
        lecture.name = lecture.class_title;
        delete lecture.class_title;

        if (!removedColors.length) {
          dispatch(addLectureOnTable({
            lecture,
            color: colors[tmpIdx],
            mobile,
            flag: true
          }));
          tmpIdx++;
        } else {
          dispatch(addLectureOnTable({
            lecture,
            color: removedColors[tmpRemovedIdx],
            mobile,
            flag: false
          }));
          tmpRemovedIdx++;
        }
      }
      dispatch({ type: GET_MY_LECTURES_SUCCESS, payload: timetable })
      dispatch(updateGrades());
    } else {
      dispatch({ type: GET_MY_LECTURES_SUCCESS, payload: [] })
    }
  } catch (e) {
    dispatch({
      type: GET_MY_LECTURES_ERROR,
      error: e.response
    })
  }
}

// 첫 페이지의 시간표를 만드는 함수, selectedSemester 필요
export const getMyIndexLectures = (payload) => async (dispatch, getState) => {
  const { token } = payload;
  const { selectedSemester, colors } = getState().timetableReducer;
  dispatch({ type: GET_MY_INDEX_LECTURES });
  try {
    const res = await infoAPI.getMyTimeTable(token, selectedSemester);
    let lectures = Array.apply(null, {length: 5}).map(() => []),
      timetable = res.data.timetable,
      nowDay = -1,
      tempClassStartTime,
      tempClassEndTime
    console.log(timetable)
    timetable.forEach(({class_time, class_title}, index) => {
      nowDay = -1
      class_time.forEach(
        time => {
          if (nowDay === -1) {
            nowDay = Math.floor(time / 100)
            tempClassStartTime = time % 100
          } else if (nowDay !== Math.floor(time / 100)) {
            console.log(tempClassStartTime, tempClassEndTime)
            if (nowDay !== 5 && nowDay !== 6)
              lectures[nowDay].push({
                name: class_title,
                start: (tempClassStartTime >= 18 ? 288 : (tempClassStartTime * 16)) + 1,
                end: tempClassEndTime >= 18 ? 342 : ((tempClassEndTime + 1) * 16),
                backgroundColor: colors[index]
              })
            nowDay = Math.floor(time / 100)
            tempClassStartTime = time % 100
          } else {
            tempClassEndTime = time % 100
          }
        }
      )
      console.log(tempClassStartTime, tempClassEndTime)
      if (nowDay !== 5 && nowDay !== 6)
        lectures[nowDay].push({
          name: class_title,
          start: tempClassStartTime >= 18 ? 289 : ((tempClassStartTime) * 16),
          end: tempClassEndTime >= 18 ? 342 : ((tempClassEndTime + 1) * 16),
          backgroundColor: colors[index]
        })
    })

    dispatch({ type: GET_MY_INDEX_LECTURES_SUCCESS, payload: lectures })
  } catch (e) {
    dispatch({
      type: GET_MY_INDEX_LECTURES_ERROR,
      error: e.response
    })
  }
}

export const searchMyLectures = payload => (dispatch, getState) => {
  console.log(payload);
  const { mobile } = payload;
  const { myLectures, removedColors, colorIndex, colors } = getState().timetableReducer;
  let tmpIdx = colorIndex;
  let tmpRemovedIdx = 0;
  dispatch({ type: GET_MY_LECTURES });
  let lectures = payload.lectures ? payload.lectures : [];
  lectures = lectures.length === 0 ? myLectures : lectures;
  if (mobile) {
    dispatch({ type: RESET_COLORS });
  }
  for (let lecture of lectures) {
    if (!removedColors.length) {
      dispatch(addLectureOnTable({
        lecture,
        color: colors[tmpIdx],
        mobile,
        flag: true
      }));
      tmpIdx++;
    } else {
      dispatch(addLectureOnTable({
        lecture,
        color: removedColors[tmpRemovedIdx],
        mobile,
        flag: false
      }));
      tmpRemovedIdx++;
    }
  }
  dispatch({ type: GET_MY_LECTURES_SUCCESS, payload: lectures })
  dispatch(updateGrades());
}

export const selectLecture = payload => (dispatch, getState) => {
  const { lecture, mobile } = payload;
  const { lectures } = getState().timetableReducer;
  let totalLecture = [], times = [], time = [];
  if (!lecture) {
    dispatch({ type: SELECT_LECTURE_ERROR });
  }
  // 선택한 과목
  totalLecture.push({
    lecture,
    firstFlag: true,
    mobile
  });

  // 선택한 과목과 같은 과목
  for (let i = 0; i < lectures.length; i++) {
    if (
      lectures[i].name === lecture.name &&
      lectures[i] !== lecture &&
      lectures[i].department === lecture.department &&
      lectures[i].class_time !== lecture.class_time
    ) {
      totalLecture.push({
        lecture: lectures[i],
        firstFlag: false,
        mobile
      })
    }
  }

  for (let i = 0; i < totalLecture.length; i++) {
    let { lecture, firstFlag } = totalLecture[i];
    for (let j = 0; j < lecture.class_time.length; j++) {
      if (j === lecture.class_time.length - 1) {
        time.push({
          lecture,
          time: lecture.class_time[j],
          firstFlag
        });
        times.push(time);
        time = []
      } else {
        if (lecture.class_time[j + 1] - lecture.class_time[j] === 1) {
          time.push({
            lecture,
            time: lecture.class_time[j],
            firstFlag
          });
        } else {
          time.push({
            lecture,
            time: lecture.class_time[j],
            firstFlag
          });
          times.push(time);
          time = [];
        }
      }
    }
  }
  // 렌더링
  let totalLayout = [];
  for (let i = 0; i < times.length; i++) {
    totalLayout.push({
      'start': { x: parseInt(times[i][0].time / 100) + 2, y: parseInt(times[i][0].time % 100) },
      'end': { x: parseInt(times[i][times[i].length - 1].time / 100) + 2, y: parseInt(times[i][times[i].length - 1].time % 100) },
      'id': times[i][0].lecture.id ? times[i][0].lecture.id : `${times[i][0].lecture.code + times[i][0].lecture.lecture_class}`,
      'selected': times[i][0].firstFlag ? true : false
    })
  }
  // 렌더링
  dispatch({
    type: SELECT_LECTURE_SUCCESS,
    payload: {
      lecture: totalLecture,
      layout: totalLayout
    }
  });
};

export const addLecture = payload => async (dispatch, getState) => {
  const { lecture, mobile, token } = payload;
  const { myLectures, removedColors, colors, colorIndex, selectedSemester } = getState().timetableReducer;
  let body = {
    "timetable": [{
      "class_title": lecture.name,
      "class_time": lecture.class_time,
      "professor": lecture.professor,
      "grades": lecture.grades,
      "department": lecture.department,
      "design_score": lecture.design_score,
      "code": lecture.code,
      "lecture_class": lecture.lecture_class,
      "target": lecture.target,
      "regular_number": lecture.regular_number,
      "isEdited": false
    }],
    "semester": selectedSemester
  }
  console.log(lecture, myLectures);
  let newLecture = lecture;
  for(let i = 0; i < myLectures.length; i++) {
    // 중첩 과목 발생
    if (myLectures[i].name === lecture.name) {
      alert("중첩된 과목입니다.");
      return;
    }
    // 시간 중복 발생
    for(let j = 0; j < myLectures[i].class_time.length; j++) {
      for(let k = 0; k < newLecture.class_time.length; k++) {
        if (newLecture.class_time[k] === myLectures[i].class_time[j]) {
          alert(`${newLecture.name} 과목과 ${myLectures[i].name} 과목의 시간이 중복됩니다.`);
          return;
        }
      }
    }
  }

  if (!removedColors.length) {
    dispatch(addLectureOnTable({
      lecture,
      color: colors[colorIndex],
      mobile,
      flag: true
    }));
  } else {
    dispatch(addLectureOnTable({
      lecture,
      color: removedColors[0],
      mobile,
      flag: false
    }));
  }

  try {
    if (token) {
      const result = await infoAPI.addSubject(token, body);
      if (result.status === 201) {
        let addedLecture = result.data.timetable[result.data.timetable.length - 1];
        addedLecture.name = addedLecture.class_title;
        delete addedLecture.class_title;
        dispatch({
          type: ADD_LECTURE_SUCCESS,
          payload: {
            lecture: addedLecture,
          }
        });
      }
    } else {
      dispatch({
        type: ADD_LECTURE_SUCCESS,
        payload: {
          lecture: newLecture,
        }
      });
    }
    dispatch(updateGrades());
  } catch (e) {
    dispatch({
      type: ADD_LECTURE_ERROR,
      error: e.response
    })
  }
  
}

export const addLectureOnTable = payload => dispatch => {
  const { lecture, color, mobile, flag } = payload;
  let times = [], titleArr = [], classArr = [], profArr = [], time = [];
  for (let i = 0; i < lecture.class_time.length; i++) {
    if (i === lecture.class_time.length - 1) {
      time.push(lecture.class_time[i]);
      times.push(time);
      titleArr.push(lecture.name);
      classArr.push(lecture.lecture_class);
      profArr.push(lecture.professor);
    } else {
      if (lecture.class_time[i + 1] - lecture.class_time[i] === 1) {
        time.push(lecture.class_time[i]);
      } else {
        time.push(lecture.class_time[i]);
        times.push(time);
        titleArr.push(lecture.name);
        classArr.push(lecture.lecture_class);
        profArr.push(lecture.professor);
        time = [];
      }
    }
  }
  let layoutStyle = times.map((value, j) => ({
    'start': { x: parseInt(times[j][0] / 100) + 2, y: parseInt(times[j][0] % 100) },
    'end': { x: parseInt(times[j][times[j].length - 1] / 100) + 2, y: parseInt(times[j][times[j].length - 1] % 100) },
    'backgroundColor': color,
    'borderBottomColor': color,
    'id': lecture.id ? lecture.id : `${lecture.code + lecture.lecture_class}`,
    'title': titleArr[j],
    'info': `${classArr[j] || ""} ${profArr[j] || ""}`,
    'code': lecture.code + lecture.lecture_class
  }))

  dispatch({
    type: UPDATE_LAYOUT,
    payload: {
      layout: layoutStyle,
      flag
    }
  })
}

export const removeLecture = payload => async (dispatch, getState) => {
  const { myLectures, layout, removedColors } = getState().timetableReducer;
  const { index, id, token } = payload;
  let removeCode = myLectures[index].code + myLectures[index].lecture_class;
  try {
    if (token) {
      console.log(token, id);
      const res = await infoAPI.removeSubject(token, id);
      console.log(res);
    }
    let tmpLayout = [];
    let bgColor;
    
    for (let lecture of layout) {
      if (lecture.code !== removeCode) {
        tmpLayout.push(lecture);
      } else {
        if (removedColors.length !== 0) {
          if (removedColors[removedColors.length - 1] !== lecture.backgroundColor) {
            bgColor = lecture.backgroundColor
          }
        } else {
          bgColor = lecture.backgroundColor
        }
      }
    }
    dispatch({
      type: REMOVE_LECTURE_SUCCESS,
      payload: {
        id: index,
        layout: tmpLayout,
        bgColor
      }
    });
    dispatch(updateGrades());
  } catch (e) {
    console.log(e);
    dispatch({
      type: REMOVE_LECTURE_ERROR,
      error: e.response
    })
  }
  
}

export const updateGrades = () => (dispatch, getState) => {
  const { myLectures } = getState().timetableReducer;
  let grades = [0, 0, 0, 0, 0];
  for (let lecture of myLectures) {
    grades[0] += parseInt(lecture.grades);
    if (lecture.department === "융합학과") grades[4] += parseInt(lecture.grades);
    else if (lecture.department === "교양학부") grades[2] += parseInt(lecture.grades);
    else if (lecture.department === "HRD학과") grades[3] += parseInt(lecture.grades);
    else grades[1] += parseInt(lecture.grades);
  }
  dispatch({
    type: UPDATE_GRADES,
    payload: grades
  })
}

export const updateSheetType = payload => ({ type: UPDATE_SHEET_TYPE, payload });
export const toggleSheetOpen = () => ({ type: TOGGLE_SHEET_OPEN });
const initialState = {
  data: null, // 전체 데이터
  isLectureLoading: false,
  isMyLectureLoading: false,
  error: null,

  myTimeTableGrade: [0, 0, 0, 0, 0], // 학점
  lectures: null, // 전체 강의
  sortedLectures: [], // 정렬된 전체 강의
  selectedLectures: [],
  myLectures: [], // 나의 강의
  selectedSemester: '',
  totalSemesters: [],
  
  layout: [], // 나의 강의 렌더링 정보
  selectedLayout: [], // 선택된 강의 렌더링 정보
  clickedLayout: [],

  colors: ["#ffa9b7", "#fdbcf5", "#fedb8f", "#c2eead", "#60e4c1", "#8ae9ff", "#72b0ff", "#b4bfff", "#e0e5eb", "#175c8e", "#f7941e", "#ffffff"],
  colorIndex: 0,
  removedColors: [],

  isOpen: false,
  isInfoSheet: false,
  selectedMyLecture: null,
  indexLecture: {
    loading: false,
    error: false,
    lectures: Array.apply(null, {length: 5}).map(() => [])
  }
}

export default function timetableReducer(state = initialState, action) {
  switch(action.type) {
    case INIT_STATE:
      return {
        ...state,
        myLectures: [],
        myTimeTableGrade: [0, 0, 0, 0, 0],
        removedColors: [],
        colorIndex: 0
      }
    case GET_MY_LECTURES:
      return {
        ...state,
        isMyLectureLoading: true,
      }
    case GET_MY_LECTURES_SUCCESS:
      return {
        ...state,
        isMyLectureLoading: false,
        myLectures: action.payload
      }
    case GET_MY_LECTURES_ERROR:
      return {
        ...state,
        isMyLectureLoading: false,
        error: action.error
      }
    case GET_MY_INDEX_LECTURES:
      return {
        ...state,
        indexLecture: {
          loading: true,
          error: false,
          lectures: Array.apply(null, {length: 5}).map(() => [])
        }
      }
    case GET_MY_INDEX_LECTURES_SUCCESS:
      return {
        ...state,
        indexLecture: {
          loading: false,
          error: false,
          lectures: action.payload
        }
      }
    case GET_MY_INDEX_LECTURES_ERROR:
      return {
        ...state,
        indexLecture: {
          ...state.indexLecture,
          loading: false,
          error: true
        }
      }
    case GET_ALL_LECTURE:
      return {
        ...state,
        isLectureLoading: true
      }
    case GET_ALL_LECTURE_SUCCESS:
      return {
        ...state,
        isLectureLoading: false,
        data: action.res,
        lectures: action.res.data
      }
    case GET_ALL_LECTURE_ERROR:
      return {
        ...state,
        isLectureLoading: false,
        error: action.error
      }
    case GET_ALL_SEMESTER:
      return {
        ...state,
      }
    case GET_ALL_SEMESTER_SUCCESS:
      return {
        ...state,
        totalSemesters: action.res.data,
        selectedSemester: action.res.data[0].semester
      }
    case GET_ALL_SEMESTER_ERROR:
      return {
        ...state,
        error: action.error
      }
    case SELECT_LECTURE_SUCCESS:
      return {
        ...state,
        selectedLectures: action.payload.lecture.map(data => data.lecture),
        selectedLayout: action.payload.layout
      }
    case SELECT_LECTURE_ERROR:
        return {
          ...state
        }
    case RESET_SELECTED_LAYOUT:
      return {
        ...state,
        selectedLayout: []
      }
    case ADD_LECTURE_SUCCESS:
      return {
        ...state,
        selectedLectures: [],
        selectedLayout: [],
        myLectures: state.myLectures.concat(action.payload.lecture),
        // colorIndex: state.colorIndex + 1,
        // removedColors: state.removedColors.filter((color, index) => index !== 0)
      }
    case ADD_LECTURE_ERROR:
      return {
        ...state,
        error: action.error
      }
    case UPDATE_LAYOUT:
      return {
        ...state,
        layout: state.layout.concat(action.payload.layout),
        colorIndex: action.payload.flag ? state.colorIndex + 1 : state.colorIndex,
        removedColors: action.payload.flag ? state.removedColors : state.removedColors.filter((color, index) => index !== 0)
      }
    case REMOVE_LECTURE_SUCCESS:
      return {
        ...state,
        myLectures: state.myLectures.filter((lecture, index) => index !== action.payload.id),
        layout: action.payload.layout,
        removedColors: action.payload.bgColor
          ? state.removedColors.concat(action.payload.bgColor)
          : state.removedColors
      }
    case REMOVE_LECTURE_ERROR:
      return {
        ...state,
        error: action.error
      }
    case UPDATE_GRADES: 
      return {
        ...state,
        myTimeTableGrade: action.payload
      }
    case RESET_COLORS:
      return {
        ...state,
        colorIndex: 0,
        removedColors: []
      }
    case SELECT_SEMESTER:
      return {
        ...state,
        selectedSemester: action.payload
      }
    case RESET_LAYOUT:
      return {
        ...state,
        layout: []
      }
    case UPDATE_SHEET_TYPE:
      return {
        ...state,
        isInfoSheet: action.payload.flag,
        selectedMyLecture: action.payload.lecture
      }
    case TOGGLE_SHEET_OPEN:
      return {
        ...state,
        isOpen: !state.isOpen
      }
    default:
      return state;
  }
}