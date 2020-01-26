// Actions
export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export const SIGNUP = "SIGNUP";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";

export const CHECK_NICKNAME = "CHECK_NICKNAME";
export const CHECK_NICKNAME_SUCCESS = "CHECK_NICKNAME_SUCCESS";
export const CHECK_NICKNAME_ERROR = "CHECK_NICKNAME_ERROR";

export const FIND_PASSWORD = "FIND_PASSWORD";
export const FIND_PASSWORD_SUCCESS = "FIND_PASSWORD_SUCCESS";
export const FIND_PASSWORD_ERROR = "FIND_PASSWORD_ERROR";

export const MODIFY_INFO = "MODIFY_INFO";
export const MODIFY_INFO_SUCCESS = "MODIFY_INFO_SUCCESS";
export const MODIFY_INFO_ERROR = "MODIFY_INFO_ERROR";

export const WITHDRAW = "WITHDRAW";
export const WITHDRAW_SUCCESS = "WITHDRAW_SUCCESS";
export const WITHDRAW_ERROR = "WITHDRAW_ERROR";

export const CLEAR_STATE = "CLEAR_STATE";
const UPDATE_AUTHINFO = "UPDATE_AUTHINFO";
 
// Action Creators
export const login = (userId, password, lastLocation, autoLoginFlag) => ({
  type: LOGIN,
  payload: {
    userId,
    password,
    lastLocation,
    autoLoginFlag
  }
});

export const logout = token => ({
  type: LOGOUT,
  payload: {
    token
  }
});

export const checkNickname = nickname => ({
  type: CHECK_NICKNAME,
  payload: {
    nickname
  }
});

export const signUp = userInfo => ({
  type: SIGNUP,
  payload: userInfo
});

export const findPassword = userId => ({
  type: FIND_PASSWORD,
  payload: {
    userId
  }
});

export const modifyInfo = (userInfo, token) => ({
  type: MODIFY_INFO,
  payload: {
    userInfo,
    token
  }
});

export const withdraw = token => ({
  type: WITHDRAW,
  payload: {
    token
  }
});

export const updateAuthInfo = (token, userInfo) => ({
  type: UPDATE_AUTHINFO,
  token,
  userInfo
});

export const clearState = () => ({
  type: CLEAR_STATE
});

const initialState = {
  token: null,
  userInfo: null,
  data: null,
  authInProgress: false,
  checkInProgress: false,
  isLoggedIn: false,
  isAvailable: false,
  error: null,
}

export default function authReducer(state = initialState, action) {
  switch(action.type) {
    case LOGIN:
      return {
        ...state,
        data: null,
        authInProgress: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.res.data.token,
        userInfo: action.res.data.user,
        authInProgress: false,
        isLoggedIn: true,
        data: action.res
      }
    case LOGIN_ERROR:
      return {
        ...state,
        authInProgress: false,
        error: action.error
      }
    case LOGOUT:
      return {
        ...state,
        data: null,
        authInProgress: true
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        userInfo: null,
        authInProgress: false,
        data: action.res,
        isLoggedIn: false,
      }
    case LOGOUT_ERROR:
      return {
        ...state,
        authInProgress: false,
        error: action.error,
      }
    case SIGNUP:
      return {
        ...state,
        data: null,
        authInProgress: true
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        authInProgress: false,
        data: action.res
      }
    case SIGNUP_ERROR:
      return {
        ...state,
        authInProgress: false,
        error: action.error
      }
    case CHECK_NICKNAME:
      return {
        ...state,
        data: null,
        checkInProgress: true
      }
    case CHECK_NICKNAME_SUCCESS:
      return {
        ...state,
        checkInProgress: false,
        isAvailable: true,
        data: action.res
      }
    case CHECK_NICKNAME_ERROR:
      return {
        ...state,
        checkInProgress: false,
        error: action.error
      }
    case MODIFY_INFO:
      return {
        ...state,
        data: null,
        authInProgress: true
      }
    case MODIFY_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.res.data,
        data: action.res,
        authInProgress: false,
      }
    case MODIFY_INFO_ERROR: {
      return {
        ...state,
        authInProgress: false,
        error: action.error
      }
    }
    case FIND_PASSWORD:
      return {
        ...state,
        data: null,
        authInProgress: true
      }
    case FIND_PASSWORD_SUCCESS:
      return {
        ...state,
        authInProgress: false,
        data: action.res
      }
    case FIND_PASSWORD_ERROR:
      return {
        ...state,
        authInProgress: false,
        error: action.error
      }
    case WITHDRAW:
      return {
        ...state,
        data: null,
        authInProgress: true
      }
    case WITHDRAW_SUCCESS:
      return {
        ...state,
        token: null,
        userInfo: null,
        isLoggedIn: false,
        authInProgress: false,
        data: action.res
      }
    case WITHDRAW_ERROR:
      return {
        ...state,
        authInProgress: false,
        error: action.error
      }
    case UPDATE_AUTHINFO:
      return {
        ...state,
        token: action.token,
        userInfo: action.userInfo,
        isLoggedIn: action.token ? true : false
      }
    case CLEAR_STATE:
      return {
        ...state,
        data: null,
        error: null
      }
    default:
      return state;
  }
}