import { put, call, takeEvery, takeLatest, all, getContext, select } from "redux-saga/effects";
import {
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  GET_HOT_POSTS,
  GET_HOT_POSTS_SUCCESS,
  GET_HOT_POSTS_ERROR,
  GET_NEW_POSTS,
  GET_NEW_POSTS_SUCCESS,
  GET_NEW_POSTS_ERROR,
  GET_POST,
  GET_POST_SUCCESS,
  GET_POST_ERROR,
  REGISTER_POST,
  REGISTER_POST_SUCCESS,
  REGISTER_POST_ERROR,
  EDIT_POST,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  CHECK_PERMISSION,
  CHECK_PERMISSION_SUCCESS,
  CHECK_PERMISSION_ERROR,

  REGISTER_COMMENT,
  REGISTER_COMMENT_SUCCESS,
  REGISTER_COMMENT_ERROR,
  EDIT_COMMENT,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_ERROR,
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
  CLEAR_STATE
} from '../modules/board';
import { boardAPI } from '../api';
import * as BOARD_INFO from '../static/boardInfo';

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

function* getPost({ payload }) {
  const { token, id, boardId } = payload;
  const history = yield getContext('history');
  try {
    const res = yield call(boardAPI.getArticle, id, token, boardId);
    yield put({
      type: GET_POST_SUCCESS,
      payload: res
    });
    for (let info of BOARD_INFO.default) {
      if (info.id === res.data.board_id && !history.location.pathname.includes(info.path)) {
        alert("해당 게시글이 존재하지 않습니다");
        history.push('/');
      }
    }
  } catch (e) {
    yield put({
      type: GET_POST_ERROR,
      error: e.response
    });
  }
}

function* getHotPosts() {
  try {
    const res = yield call(boardAPI.getHotArticleList);
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

function* getNewPosts() {
  try {
    const notice = yield call(boardAPI.getArticleList, 1, 4);
    // const job = yield call(boardAPI.getIndexPageArticleList, 2);
    // const free = yield call(boardAPI.getIndexPageArticleList, 1);
    // const anonymous = yield call(boardAPI.getIndexPageArticleList, -1);
    // const question = yield call(boardAPI.getIndexPageArticleList, 10);
    console.log(notice, "123123123123")
    const res = {
      "notice": notice.data.articles,
      // "job": job.data,
      // "free": free.data,
      // "anonymous": anonymous.data.articles,
      // "question": question.data
    }
    yield put({
      type: GET_NEW_POSTS_SUCCESS,
      payload: res
    });
  } catch (e) {
    yield put({
      type: GET_NEW_POSTS_ERROR,
      error: e.response
    })
  }
}

function* registerPost({ payload }) {
  const { token, boardId, body } = payload;
  const history = yield getContext('history');
  try {
    const res = yield call(boardAPI.registerArticle, token, body, boardId);
    yield put({
      type: REGISTER_POST_SUCCESS,
      payload: res
    })
    history.goBack();
  } catch (e) {
    yield put({
      type: REGISTER_POST_ERROR,
      error: e.response
    })
  }
}

function* deletePost({ payload }) {
  const { id, token, password, boardId } = payload;
  const history = yield getContext('history');
  try {
    const res = yield call(boardId === '-1' ? boardAPI.removeAnonymousArticle : boardAPI.removeArticle, id, boardId === '-1' ? password : token);
    yield put({
      type: DELETE_POST_SUCCESS,
      payload: res
    });
    history.goBack();
  } catch (e) {
    yield put({
      type: DELETE_POST_ERROR,
      error: e.response
    });
  }
}

function* editPost({ payload }) {
  const { token, id, boardId, body } = payload;
  const history = yield getContext('history');
  try {
    const res = yield call(boardAPI.reviseArticle, id, token, body, boardId);
    yield put({
      type: EDIT_POST_SUCCESS,
      payload: res
    });
    history.goBack();
  } catch (e) {
    yield put({
      type: EDIT_POST_ERROR,
      error: e.response
    });
  } finally {
    yield put({ type: CLEAR_STATE });
  }
}

function* registerComment({ payload }) {
  const { postId, token, boardId, body } = payload;
  try {
    const res = yield call(boardAPI.registerComment, postId, token, body, boardId);
    yield put({
      type: REGISTER_COMMENT_SUCCESS,
      payload: res
    })
  } catch (e) {
    yield put({
      type: REGISTER_COMMENT_ERROR,
      payload: e.response
    })
  } finally {
    yield put({ type: CLEAR_STATE });
  }
}

function* editComment({ payload }) {
  const { postId, id, token, body, boardId } = payload;
  try {
    const res = yield call(boardAPI.reviseComment, postId, id, token, body, boardId);
    yield put({
      type: EDIT_COMMENT_SUCCESS,
      payload: res
    })
  } catch (e) {
    yield put({
      type: EDIT_COMMENT_ERROR,
      error: e.response
    })
  } finally {
    yield put({ type: CLEAR_STATE });
  }
}

function* deleteComment({ payload }) {
  const { postId, id, token, boardId, password } = payload;
  try {
    const res = yield call(boardAPI.removeComment, postId, id, token, boardId, password);
    yield put({
      type: DELETE_COMMENT_SUCCESS,
      payload: res
    })
  } catch (e) {
    yield put({
      type: DELETE_COMMENT_ERROR,
      error: e.response
    })
  } finally {
    yield put({ type: CLEAR_STATE });
  }
}

function* checkPermission({ payload }) {
  const { id, token, password, boardId } = payload;
  try {
    let body = { article_id: id }
    if (boardId === '-1') body['password'] = password;
    const res = yield call(boardAPI.checkArticleAuthority, token, body, boardId);
    yield put({
      type: CHECK_PERMISSION_SUCCESS,
      payload: res
    });
  } catch (e) {
    yield put({
      type: CHECK_PERMISSION_ERROR,
      error: e.response
    });
  } finally {
    yield put({ type: CLEAR_STATE });
  }
}

function* watchFetchData() {
  yield takeEvery(GET_POSTS, getPosts);
  yield takeEvery(GET_HOT_POSTS, getHotPosts);
  yield takeEvery(GET_NEW_POSTS, getNewPosts);
  yield takeLatest(GET_POST, getPost);
  yield takeEvery(REGISTER_POST, registerPost);
  yield takeEvery(EDIT_POST, editPost);
  yield takeEvery(DELETE_POST, deletePost);
  yield takeEvery(CHECK_PERMISSION, checkPermission);
  yield takeEvery(REGISTER_COMMENT, registerComment);
  yield takeEvery(EDIT_COMMENT, editComment);
  yield takeEvery(DELETE_COMMENT, deleteComment);
}

export default function* boardSaga() {
  yield all([
    watchFetchData()
  ])
}
