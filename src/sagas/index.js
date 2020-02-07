import { all } from 'redux-saga/effects';
import authSaga from './auth';
import timetableSaga from './timetable';

export default function* rootSaga() {
  yield all([
    authSaga(),
    timetableSaga()
  ]);
}