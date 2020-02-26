import { all } from 'redux-saga/effects';
import authSaga from './auth';
import timetableSaga from './timetable';
import boardSaga from './board';
import searchSaga from './search';
import promotionSaga from './promotion';

export default function* rootSaga() {
  yield all([
    authSaga(),
    timetableSaga(),
    boardSaga(),
    searchSaga(),
    promotionSaga()
  ]);
}