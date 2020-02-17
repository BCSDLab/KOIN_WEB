import { put, call, takeEvery, takeLatest, all, getContext, select } from "redux-saga/effects";
import {
  SEARCH_POSTS,
  SEARCH_POSTS_SUCCESS,
  SEARCH_POSTS_ERROR
} from '../modules/search'
import { searchAPI } from '../api';


function* searchPosts({ payload }) {
  const { page, type, searchWord } = payload;
  console.log(payload);
  try {
    const res = yield call(searchAPI.searchArticles, page, type, encodeURIComponent(searchWord));
    yield put({
      type: SEARCH_POSTS_SUCCESS,
      payload: res
    });
  } catch (e) {
    yield put({
      type: SEARCH_POSTS_ERROR,
      error: e.response
    });
  }
}
function* watchFetchData() {
  yield takeEvery(SEARCH_POSTS, searchPosts);
}

export default function* searchSaga() {
  yield all([
    watchFetchData()
  ])
}