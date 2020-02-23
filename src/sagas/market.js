import { put, call, takeEvery, takeLatest, all, getContext, select } from "redux-saga/effects";
import { marketAPI } from '../api';
import {
  GET_ITEMS,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  GET_ITEM,
  GET_ITEM_SUCCESS,
  GET_ITEM_ERROR,
  GET_MY_ITEMS,
  GET_MY_ITEMS_SUCCESS,
  GET_MY_ITEMS_ERROR,
  REGISTER_ITEM,
  REGISTER_ITEM_SUCCESS,
  REGISTER_ITEM_ERROR,
  EDIT_ITEM,
  EDIT_ITEM_SUCCESS,
  EDIT_ITEM_ERROR,
  DELETE_ITEM,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_ERROR,
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
} from "../modules/market";

function* getItems ({ payload }) {
  const { pageNum, marketId } = payload;
  const state  = (yield select()).marketReducer;
  let displayPageNum, displayMinNum;
  try {
    const res = yield call(marketAPI.getItemList, pageNum, marketId);
    console.log(res);
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
      type: GET_ITEMS_SUCCESS,
      payload: {
        data: res.data,
        items: res.data.items,
        pageNum,
        displayPageNum,
        displayMinNum
      }
    });
  } catch (e) {
    yield put({
      type: GET_ITEMS_ERROR,
      error: e.response
    });
  }
}

function* getItem ({ payload }) {
  const { id, token } = payload;
  try {
    const res = yield call(marketAPI.getItemInfo, id, token);
    yield put({
      type: GET_ITEM_SUCCESS,
      payload: res
    });
  } catch (e) {
    yield put({
      type: GET_ITEM_ERROR,
      error: e.response
    });
  }
}

function* getMyItems ({ payload }) {
  const { pageNum, marketId, token } = payload;
  const state  = (yield select()).marketReducer;
  let displayPageNum, displayMinNum;
  try {
    const res = yield call(marketAPI.getMyItemList, pageNum, marketId, token);

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
      type: GET_MY_ITEMS_SUCCESS,
      payload: {
        data: res.data,
        items: res.data.items,
        pageNum,
        displayPageNum,
        displayMinNum
      }
    })
  } catch (e) {
    yield put({
      type: GET_MY_ITEMS_ERROR,
      error: e.response
    })
  }
}

function* registerItem({ payload }) {
  const { token, body } = payload;
  const history = yield getContext('history');
  try {
    const res = yield call(marketAPI.registerItem, token, body);
    yield put({
      type: REGISTER_ITEM_SUCCESS,
      payload: res
    });
    history.goBack();
  } catch (e) {
    yield put({
      type: REGISTER_ITEM_ERROR,
      error: e.response
    });
  }
}

function* editItem({ payload }) {
  const { id, token, body } = payload;
  const history = yield getContext('history');
  try {
    const res = yield call(marketAPI.reviseItem, id, body, token);
    yield put({
      type: EDIT_ITEM_SUCCESS,
      payload: res
    });
    history.goBack();
  } catch (e) {
    yield put({
      type: EDIT_ITEM_ERROR,
      error: e.response
    });
  }
}

function* deleteItem({ payload }) {
  const { id, token } = payload;
  const history = yield getContext('history');
  try {
    const res = yield call(marketAPI.removeItem, id, token);
    yield put({
      type: DELETE_ITEM_SUCCESS,
      payload: res
    });
    history.goBack();
  } catch (e) {
    yield put({
      type: DELETE_ITEM_ERROR,
      error: e.response
    });
  }
}

function* registerComment({ payload }) {
  const { itemId, token, body } = payload;
  try {
    const res = yield call(marketAPI.registerComment, itemId, token, body);
    yield put({
      type: REGISTER_COMMENT_SUCCESS,
      payload: res
    });
  } catch (e) {
    yield put({
      type: REGISTER_COMMENT_ERROR,
      error: e.response
    });
  }
}

function* editComment({ payload }) {
  const { itemId, id, token, body } = payload;
  try {
    const res = yield call(marketAPI.reviseComment, itemId, id, token, body);
    yield put({
      type: EDIT_COMMENT_SUCCESS,
      payload: res
    });
  } catch (e) {
    yield put({
      type: EDIT_COMMENT_ERROR,
      error: e.response
    });
  }
}

function* deleteComment({ payload }) {
  const { itemId, id, token } = payload;
  try {
    const res = yield call(marketAPI.removeComment, itemId, id, token);
    yield put({
      type: DELETE_COMMENT_SUCCESS,
      payload: res
    });
  } catch (e) {
    yield put({
      type: DELETE_COMMENT_ERROR,
      error: e.response
    });
  }
}

function* checkPermission({ payload }) {
  const { token, body } = payload;
  try {
    const res = yield call(marketAPI.checkItemAuthority, token, body);
    yield put({
      type: CHECK_PERMISSION_SUCCESS,
      payload: res
    })
  } catch (e) {
    yield put({
      type: CHECK_PERMISSION_ERROR,
      error: e.response
    })
  } finally {
    yield put({ type: CLEAR_STATE });
  }
}

function* watchFetchData() {
  yield takeEvery(GET_ITEMS, getItems);
  yield takeLatest(GET_ITEM, getItem);
  yield takeEvery(GET_MY_ITEMS, getMyItems);
  yield takeEvery(REGISTER_ITEM, registerItem);
  yield takeEvery(EDIT_ITEM, editItem);
  yield takeEvery(DELETE_ITEM, deleteItem);
  yield takeEvery(REGISTER_COMMENT, registerComment);
  yield takeEvery(EDIT_COMMENT, editComment);
  yield takeEvery(DELETE_COMMENT, deleteComment);
  yield takeEvery(CHECK_PERMISSION, checkPermission);
}

export default function* marketSaga() {
  yield all([
    watchFetchData()
  ])
}