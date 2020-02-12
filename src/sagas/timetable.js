import { infoAPI } from '../api';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { GET_ALL_LECTURE_ERROR,
  GET_ALL_LECTURE_SUCCESS,
  GET_ALL_LECTURE,
  GET_ALL_SEMESTER,
  GET_ALL_SEMESTER_SUCCESS,
  GET_ALL_SEMESTER_ERROR,
} from '../modules/timetable';

function* getLectureData ({ payload }) {
  try {
    const res = yield call(infoAPI.getAllLecture, payload.semester);
    yield put({
      type: GET_ALL_LECTURE_SUCCESS,
      res
    })
  } catch (e) {
    yield put({
      type: GET_ALL_LECTURE_ERROR,
      error: e.response
    })
  }
}

function* getSemesterData () {
  try {
    const res = yield call(infoAPI.getAllSemester);
    yield put({
      type: GET_ALL_SEMESTER_SUCCESS,
      res
    })
  } catch (e) {
    yield put({
      type: GET_ALL_SEMESTER_ERROR,
      error: e.response
    })
  }
}

function* watchFetchData() {
  yield takeEvery(GET_ALL_LECTURE, getLectureData);
  yield takeEvery(GET_ALL_SEMESTER, getSemesterData);
}

export default function* timetableSaga() {
  yield all([
    watchFetchData()
  ])
}