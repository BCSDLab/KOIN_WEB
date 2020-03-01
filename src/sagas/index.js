import { all } from 'redux-saga/effects';
import authSaga from './auth';
import timetableSaga from './timetable';
import boardSaga from './board';
import searchSaga from './search';
import promotionSaga from './promotion';
import marketSaga from './market';

export default function* rootSaga() {
  yield all([
    authSaga(),
    timetableSaga(),
    boardSaga(),
    searchSaga(),
    promotionSaga(),
    marketSaga()
  ]);
}