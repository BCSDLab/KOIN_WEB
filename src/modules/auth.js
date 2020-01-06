import { authAPI } from '../api';
import sha256 from 'sha256';

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";

const LOGOUT = "LOGOUT";
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
const LOGOUT_ERROR = "LOGOUT_ERROR";

const SIGNUP = "SIGNUP";
const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
const SIGNUP_ERROR = "SIGNUP_ERROR";

const CHECK_NICKNAME = "CHECK_NICKNAME";
const CHECK_NICKNAME_SUCCESS = "CHECK_NICKNAME_SUCCESS";
const CHECK_NICKNAME_ERROR = "CHECK_NICKNAME_ERROR";

const FIND_PASSWORD = "FIND_PASSWORD";
const FIND_PASSWORD_SUCCESS = "FIND_PASSWORD_SUCCESS";
const FIND_PASSWORD_ERROR = "FIND_PASSWORD_ERROR";

const MODIFY_INFO = "MODIFY_INFO";
const MODIFY_INFO_SUCCESS = "MODIFY_INFO_SUCCESS";
const MODIFY_INFO_ERROR = "MODIFY_INFO_ERROR";

export const login = (userId, password) => async dispatch => {
  dispatch({ type: LOGIN });
  try {
    const body = {
      portal_account: userId,
      password: sha256(password)
    }
    const res = await authAPI.login(body);
    dispatch({
      type: LOGIN_SUCCESS,
      res
    });
  } catch (e) {
    dispatch({
      type: LOGIN_ERROR,
      error: e
    });
  }
}

export const logout = token => async dispatch => {
  dispatch({ type: LOGOUT });
  try {
    const res = await authAPI.logout(token);
    dispatch({
      type: LOGOUT_SUCCESS,
      res
    });
  } catch (e) {
    dispatch({
      type: LOGOUT_ERROR,
      error: e
    });
  }
}

export const checkNickname = nickname => async dispatch => {
  dispatch({ type: CHECK_NICKNAME });
  try {
    const res = await authAPI.checkNickname(nickname);
    dispatch({
      type: CHECK_NICKNAME_SUCCESS,
      res
    });
  } catch (e) {
    dispatch({
      type: CHECK_NICKNAME_ERROR,
      error: e
    });
  }
}

export const signUp = userInfo => async dispatch => {
  dispatch({ type: SIGNUP });
  try {
    const body = {

    }
    const res = await authAPI.signUp(body);
    dispatch({
      type: SIGNUP_SUCCESS,
      res
    })
  } catch (e) {
    dispatch({
      type: SIGNUP_ERROR,
      error: e
    })
  }
}

export const findPassword = userId => async dispatch => {
  dispatch({ type: FIND_PASSWORD });
  try {
    const body = {
      portal_account: userId
    }
    const res = await authAPI.findPassword(body);
    console.log(res);
    dispatch({
      type: FIND_PASSWORD_SUCCESS,
      res
    })
  } catch (e) {
    dispatch({
      type: FIND_PASSWORD_ERROR,
      error: e
    })
  }
}

export const modifyInfo = userInfo => async dispatch => {
  dispatch({ type: MODIFY_INFO });
  try {
    const body = {

    }
    const res = await authAPI.modifyUserInfo(body);
    dispatch({
      type: MODIFY_INFO_SUCCESS,
      res
    })
  } catch (e) {
    dispatch({
      type: MODIFY_INFO_ERROR,
      error: e
    })
  }
}

const initialState = {
  token: null,
  userInfo: null,
  loading: false,
  nickname: null,
  nicknameFlag: false,
  error: null,
  result: null
}

export default function authReducer(state = initialState, action) {
  switch(action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.res.data.token,
        userInfo: action.res.data.user
      }
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    
    case FIND_PASSWORD:
      return {
        ...state,
        loading: true
      }
    case FIND_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        result: action.res
      }
    case FIND_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state;
  }
}