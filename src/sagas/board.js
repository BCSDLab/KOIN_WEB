import { put, call, takeEvery, take, all, fork, getContext, select } from "redux-saga/effects";
import {
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  GET_HOT_POSTS,
  GET_HOT_POSTS_SUCCESS,
  GET_HOT_POSTS_ERROR,
} from '../modules/board';
import { boardAPI } from '../api';
import Cookies from 'js-cookie';

function* getPosts({ payload }) {
  const { pageNum, boardId } = payload;
  const state  = (yield select()).boardReducer;
  let displayPageNum, displayMinNum;
  try {
    const res = yield call(boardAPI.getArticleList, pageNum, boardId);  
    
    if (pageNum < (state.PAGE_MAX_SIZE / 2 + 1)) {
      if (res.data.totalPage >= state.PAGE_MAX_SIZE) displayPageNum = state.PAGE_MAX_SIZE;
      displayMinNum = 1;
    } else {
      if (res.data.totalPage - pageNum >= parseInt(state.PAGE_MAX_SIZE / 2)) {
        displayPageNum = pageNum - parseInt(state.PAGE_MAX_SIZE / 2);
        displayMinNum = pageNum + parseInt(state.PAGE_MAX_SIZE / 2);
      } else {
        displayPageNum = res.data.totalPage - state.PAGE_MAX_SIZE + 1;
        displayMinNum = res.data.totalPage;
      }
    }
    yield put({
      type: GET_POSTS_SUCCESS,
      payload: {
        data: res.data,
        posts: res.data.articles,
        pageNum,
        displayPageNum,
        displayMinNum
      }
    });
  } catch (e) {
    yield put({
      type: GET_POSTS_ERROR,
      error: e.response
    });
  }
}

function* getHotPosts() {
  try {
    const res = yield call(boardAPI.getHotArticleList);
    console.log(res);
    yield put({
      type: GET_HOT_POSTS_SUCCESS,
      payload: res
    });
  } catch (e) {
    yield put({
      type: GET_HOT_POSTS_ERROR,
      error: e.response
    })
  }
}
function* watchFetchData() {
  yield takeEvery(GET_POSTS, getPosts);
  yield takeEvery(GET_HOT_POSTS, getHotPosts);
}

export default function* boardSaga() {
  yield all([
    watchFetchData()
  ])
}