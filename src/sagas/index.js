import { all } from 'redux-saga/effects';
import authSaga from './auth';
import timetableSaga from './timetable';
import boardSaga from './board';

export default function* rootSaga() {
  yield all([
    authSaga(),
    timetableSaga(),
    boardSaga(),
  ]);
}
