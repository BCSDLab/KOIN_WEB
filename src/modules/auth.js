import { authAPI } from '../api';
import sha256 from 'sha256';

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";

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
    })
  } catch (e) {
    dispatch({
      type: LOGIN_ERROR,
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
  error: null
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
    default:
      return state;
  }
}