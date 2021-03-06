import { put, call, takeEvery, take, all, fork, getContext } from "redux-saga/effects";
import {
  LOGIN,
  LOGIN_SUCCESS, 
  LOGIN_ERROR,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  WITHDRAW,
  WITHDRAW_SUCCESS,
  WITHDRAW_ERROR,
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  MODIFY_INFO,
  MODIFY_INFO_SUCCESS,
  MODIFY_INFO_ERROR,
  CHECK_NICKNAME,
  CHECK_NICKNAME_SUCCESS,
  CHECK_NICKNAME_ERROR,
  FIND_PASSWORD,
  FIND_PASSWORD_SUCCESS,
  FIND_PASSWORD_ERROR,
  CLEAR_STATE
} from "../modules/auth";
import { authAPI } from "../api";
import sha256 from "sha256";
import Cookies from 'js-cookie';

function* login (payload) {
  console.log(payload);
  const { userId, password, lastLocation, autoLoginFlag } = payload;
  const body = {
    portal_account: userId,
    password: sha256(password)
  }
  const history = yield getContext('history');
  try {
    const res = yield call(authAPI.login, body);
    yield put({
      type: LOGIN_SUCCESS,
      res
    });
    if (autoLoginFlag) {
      Cookies.set("token", res.data.token, { expires: 3 });
      Cookies.set("userInfo", res.data.user, { expires: 3 });
      console.log("자동 로긴 O");
    } else {
      Cookies.remove("token");
      Cookies.remove("userInfo");
      console.log("자동 로긴 X");
    }
    sessionStorage.setItem("userInfo", JSON.stringify(res.data.user));
    sessionStorage.setItem("token", res.data.token);
    if (lastLocation) history.goBack();
    else history.push('/');
  } catch (e) {
    yield put({
      type: LOGIN_ERROR,
      error: e.response
    });
  } finally {
    yield put({ type: CLEAR_STATE });
  }
}

function* logout (payload) {
  const { token } = payload;
  const history = yield getContext('history');
  try {
    const res = yield call(authAPI.logout, token);
    yield put({
      type: LOGOUT_SUCCESS,
      res
    });
    sessionStorage.clear();
    Cookies.remove("token");
    Cookies.remove("userInfo");
    history.push('/');
  } catch (e) {
    yield put({
      type: LOGOUT_ERROR,
      error: e.response
    });
  } finally {
    yield put({ type: CLEAR_STATE });
  }
}

function* signUp ({ payload }) {
  const history = yield getContext('history');
  let body = {};
  for (let prop in payload) {
    if (prop === 'password') body[prop] = sha256(payload[prop])
    else body[prop] = payload[prop]
  }
  try {
    const res = yield call(authAPI.signUp, body);
    yield put({
      type: SIGNUP_SUCCESS,
      res
    })
    history.push('/');
  } catch (e) {
    yield put({
      type: SIGNUP_ERROR,
      error: e.response
    })
  } finally {
    yield put({ type: CLEAR_STATE });
  }
}

function* withdraw ({ payload }) {
  console.log(payload);
  const { token } = payload;
  const history = yield getContext('history');
  try {
    const res = yield call(authAPI.userWithdrawl, token);
    yield put({
      type: WITHDRAW_SUCCESS,
      res
    });
    sessionStorage.clear();
    Cookies.remove("token");
    history.push('/');
  } catch (e) {
    yield put({
      type: WITHDRAW_ERROR,
      error: e.response
    })
  } finally {
    yield put({ type: CLEAR_STATE });
  }
}

function* modifyInfo ({ payload }) {
  const { userInfo, token } = payload;
  const history = yield getContext('history');
  let body = {};
  for (let prop in userInfo) {
    if (prop === 'password' && userInfo[prop]) body[prop] = sha256(userInfo[prop]);
    else if (prop === 'password' && !userInfo[prop]) continue;
    else body[prop] = userInfo[prop];
  }

  try {
    const res = yield call(authAPI[`modify${body.identity !== 5 ? 'User' : 'Owner'}Info`], body, token);
    yield put({
      type: MODIFY_INFO_SUCCESS,
      res
    })
    sessionStorage.setItem("userInfo", JSON.stringify(res.data));
    history.push('/');
  } catch (e) {
    yield put({
      type: MODIFY_INFO_ERROR,
      error: e.response
    })
  } finally {
    yield put({ type: CLEAR_STATE });
  }
}

function* checkDuplication ({ payload }) {
  const { nickname } = payload;
  try {
    const res = yield call(authAPI.checkNickname, nickname);
    yield put({
      type: CHECK_NICKNAME_SUCCESS,
      res
    })
  } catch (e) {
    yield put({
      type: CHECK_NICKNAME_ERROR,
      error: e.response
    })
  } finally {
    yield put({ type: CLEAR_STATE });
  }
}

function* findPassword ({ payload }) {
  try {
    const body = {
      portal_account: payload.userId
    }
    const res = yield call(authAPI.findPassword, body);
    yield put({
      type: FIND_PASSWORD_SUCCESS,
      res
    })
  } catch (e) {
    yield put({
      type: FIND_PASSWORD_ERROR,
      error: e.response
    })
  } finally {
    yield put({ type: CLEAR_STATE });
  }
}

function* watchFetchData() {
  yield takeEvery(WITHDRAW, withdraw);
  yield takeEvery(SIGNUP, signUp);
  yield takeEvery(FIND_PASSWORD, findPassword);
  yield takeEvery(MODIFY_INFO, modifyInfo);
  yield takeEvery(CHECK_NICKNAME, checkDuplication);
}

function* loginFlow() {
  while (true) {
    const action = yield take([LOGIN, LOGOUT]);
    if (action.type === LOGIN) {
      console.log("로그인");
      yield fork(login, action.payload);
    } else if (action.type === LOGOUT) {
      console.log("로그아웃");
      yield fork(logout, action.payload);
    }
  }
}

export default function* authSaga() {
  yield all([
    loginFlow(),
    watchFetchData()
  ])
}
