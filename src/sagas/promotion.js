import { put, call, takeEvery, takeLatest, all, getContext, select } from "redux-saga/effects";
import {
  GET_PROMOTIONS,
  GET_PROMOTIONS_SUCCESS,
  GET_PROMOTIONS_ERROR,

  GET_PROMOTION,
  GET_PROMOTION_SUCCESS,
  GET_PROMOTION_ERROR,
  REGISTER_PROMOTION,
  REGISTER_PROMOTION_SUCCESS,
  REGISTER_PROMOTION_ERROR,
  ADJUST_PROMOTION,
  ADJUST_PROMOTION_SUCCESS,
  ADJUST_PROMOTION_ERROR,
  DELETE_PROMOTION,
  DELETE_PROMOTION_SUCCESS,
  DELETE_PROMOTION_ERROR,

  CHECK_MY_PENDING_PROMOTION,
  CHECK_MY_PENDING_PROMOTION_SUCCESS,
  CHECK_MY_PENDING_PROMOTION_ERROR,
  CHECK_PROMOTION_PERMISSION,
  CHECK_PROMOTION_PERMISSION_SUCCESS,
  CHECK_PROMOTION_PERMISSION_ERROR,

  GET_MY_STORE,
  GET_MY_STORE_SUCCESS,
  GET_MY_STORE_ERROR,

  REGISTER_PROMOTION_COMMENT,
  REGISTER_PROMOTION_COMMENT_SUCCESS,
  REGISTER_PROMOTION_COMMENT_ERROR,
  ADJUST_PROMOTION_COMMENT,
  ADJUST_PROMOTION_COMMENT_SUCCESS,
  ADJUST_PROMOTION_COMMENT_ERROR,
  DELETE_PROMOTION_COMMENT,
  DELETE_PROMOTION_COMMENT_SUCCESS,
  DELETE_PROMOTION_COMMENT_ERROR,
  CLEAR_STATE
} from '../modules/promotion';
import { promotionAPI } from '../api';

function* getPromotions({ payload }) {
  const { pageNum, filter } = payload;
  try {
    // getAllPromotionList, getPendingPromotionList, getClosedPromotionList
    const res = yield call(promotionAPI[`get${filter}PromotionList`], pageNum);

    yield put({
      type: GET_PROMOTIONS_SUCCESS,
      payload: {
        data: res.data,
        posts: res.data.event_articles,
        pageNum
      }
    });
  } catch (e) {
    yield put({
      type: GET_PROMOTIONS_ERROR,
      error: e.response
    });
  }
}

function* getPromotion({ payload }) {
  const { token, id, boardId } = payload;
  try {
    const res = yield call(promotionAPI.getSpecificPromotion, id, token, boardId);
    yield put({
      type: GET_PROMOTION_SUCCESS,
      payload: res
    });
  } catch (e) {
    yield put({
      type: GET_PROMOTION_ERROR,
      error: e.response
    });
  }
}

function* registerPromotion({ payload }) {
  const {token, title, summary, content, shopId, startDate, endDate, thumbnail } = payload;
  const history = yield getContext('history');
  try {
    let body = {
      title,
      'event_title': summary,
      content,
      'shop_id': shopId,
      'start_date': startDate.replace(/\./g, '-'),
      'end_date': endDate.replace(/\./g, '-'),
      thumbnail
    };

    const res = yield call(promotionAPI.registerPromotion, token, body);
    yield put({
      type: REGISTER_PROMOTION_SUCCESS,
      payload: res
    })
    history.goBack();
  } catch (e) {
    yield put({
      type: REGISTER_PROMOTION_ERROR,
      error: e.response
    })
  }
}

function* deletePromotion({ payload }) {
  const { id, token } = payload;
  const history = yield getContext('history');
  try {
    const res = yield call(promotionAPI.removePromotion, id, token);
    yield put({
      type: DELETE_PROMOTION_SUCCESS,
      payload: res
    });
    history.goBack();
  } catch (e) {
    yield put({
      type: DELETE_PROMOTION_ERROR,
      error: e.response
    });
  }
}

function* adjustPromotion({ payload }) {
  const { id, token, title, summary, content, shopId, startDate, endDate, thumbnail } = payload;
  const history = yield getContext('history');
  try {
    let body = {
      title,
      'event_title': summary,
      content,
      'shop_id': shopId,
      'start_date': startDate.replace(/\./g, '-'),
      'end_date': endDate.replace(/\./g, '-'),
      thumbnail
    };

    const res = yield call(promotionAPI.reviseArticle, id, token, body);
    yield put({
      type: ADJUST_PROMOTION_SUCCESS,
      payload: res
    });
    history.goBack();
  } catch (e) {
    yield put({
      type: ADJUST_PROMOTION_ERROR,
      error: e.response
    });
  } finally {
    yield put({ type: CLEAR_STATE });
  }
}

function* registerPromotionComment({ payload }) {
  const { postId, token, body } = payload;
  try {
    const res = yield call(promotionAPI.registerPromotionComment, postId, token, body);
    yield put({
      type: REGISTER_PROMOTION_COMMENT_SUCCESS,
      payload: res
    })
  } catch (e) {
    yield put({
      type: REGISTER_PROMOTION_COMMENT_ERROR,
      payload: e.response
    })
  } finally {
    yield put({ type: CLEAR_STATE });
  }
}

function* adjustPromotionComment({ payload }) {
  const { postId, id, token, body } = payload;
  try {
    const res = yield call(promotionAPI.adjustPromotionComment, postId, id, token, body);
    yield put({
      type: ADJUST_PROMOTION_COMMENT_SUCCESS,
      payload: res
    })
  } catch (e) {
    yield put({
      type: ADJUST_PROMOTION_COMMENT_ERROR,
      error: e.response
    })
  } finally {
    yield put({ type: CLEAR_STATE });
  }
}

function* deletePromotionComment({ payload }) {
  const { postId, id, token } = payload;
  try {
    const res = yield call(promotionAPI.removePromotionComment, postId, id, token);
    yield put({
      type: DELETE_PROMOTION_COMMENT_SUCCESS,
      payload: res
    })
  } catch (e) {
    yield put({
      type: DELETE_PROMOTION_COMMENT_ERROR,
      error: e.response
    })
  } finally {
    yield put({ type: CLEAR_STATE });
  }
}

function* checkPromotionPermission({ payload }) {
  const { id, token } = payload;
  try {
    let body = { article_id: id };
    const res = yield call(promotionAPI.grantCheckPromotion, token, body);
    yield put({
      type: CHECK_PROMOTION_PERMISSION_SUCCESS,
      payload: res.data.grantEdit
    });
  } catch (e) {
    yield put({
      type: CHECK_PROMOTION_PERMISSION_ERROR,
      error: e.response
    });
  } finally {
    yield put({ type: CLEAR_STATE });
  }
}

function* checkMyPendingPromotion() {
  try {
    const res = yield call(promotionAPI.checkMyPendingPromotion);
    yield put({
      type: CHECK_MY_PENDING_PROMOTION_SUCCESS,
      payload: res.data.id
    });
  } catch (e) {
    yield put({
      type: CHECK_MY_PENDING_PROMOTION_ERROR,
      error: e.response
    });
  } finally {
    yield put({ type: CLEAR_STATE });
  }
}

function* getMyStore({ payload }) {
  const { token } = payload;
  try {
    const res = yield call(promotionAPI.getMyStore, token);
    yield put({
      type: GET_MY_STORE_SUCCESS,
      payload: res.data.grantEdit
    });
  } catch (e) {
    yield put({
      type: GET_MY_STORE_ERROR,
      error: e.response
    });
  } finally {
    yield put({ type: CLEAR_STATE });
  }
}

function* watchFetchData() {
  yield takeEvery(GET_PROMOTIONS, getPromotions);
  yield takeLatest(GET_PROMOTION, getPromotion);
  yield takeEvery(REGISTER_PROMOTION, registerPromotion);
  yield takeEvery(ADJUST_PROMOTION, adjustPromotion);
  yield takeEvery(DELETE_PROMOTION, deletePromotion);
  yield takeEvery(CHECK_PROMOTION_PERMISSION, checkPromotionPermission);
  yield takeEvery(REGISTER_PROMOTION_COMMENT, registerPromotionComment);
  yield takeEvery(ADJUST_PROMOTION_COMMENT, adjustPromotionComment);
  yield takeEvery(DELETE_PROMOTION_COMMENT, deletePromotionComment);
  yield takeEvery(GET_MY_STORE, getMyStore);
  yield takeEvery(CHECK_MY_PENDING_PROMOTION, checkMyPendingPromotion);
}

export default function* promotionSaga() {
  yield all([
    watchFetchData()
  ])
}
