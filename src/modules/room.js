import { infoAPI } from '../api';

const GET_ROOM_LIST = "GET_ROOM_LIST";
const GET_ROOM_LIST_SUCCESS = "GET_ROOM_LIST_SUCCESS";
const GET_ROOM_LIST_ERROR = "GET_ROOM_LIST_ERROR";

const GET_ROOM_DETAIL_INFO = "GET_ROOM_DETAIL_INFO";
const GET_ROOM_DETAIL_INFO_SUCCESS = "GET_ROOM_DETAIL_INFO_SUCCESS";
const GET_ROOM_DETAIL_INFO_ERROR = "GET_ROOM_DETAIL_INFO_ERROR";

export const getRoomList = () => async dispatch => {
  dispatch({ type: GET_ROOM_LIST });
  try {
    const res = await infoAPI.getRoomList();
    dispatch({
      type: GET_ROOM_LIST_SUCCESS,
      res
    })
  } catch(e) {
    dispatch({
      type: GET_ROOM_LIST_ERROR,
      error: e
    })
  }
}

export const getRoomDetailInfo = id => async dispatch => {
  dispatch({ type: GET_ROOM_DETAIL_INFO });
  try {
    const res = await infoAPI.getRoomInfo(id);
    dispatch({
      type: GET_ROOM_DETAIL_INFO_SUCCESS,
      res
    })
  } catch(e) {
    dispatch({
      type: GET_ROOM_DETAIL_INFO_ERROR,
      error: e
    })
  }
}

const initialState = {
  rooms: {
    data: [],
    loading: false,
    error: null
  },
  room: {
    data: null,
    loading: false,
    error: null
  }
}

export default function roomReducer(state = initialState, action) {
  switch(action.type) {
    case GET_ROOM_LIST:
      return {
        ...state,
        rooms: {
          loading: true,
          data: [],
          error: null
        }
      }
    case GET_ROOM_LIST_SUCCESS:
      return {
        ...state,
        rooms: {
          loading: false,
          data: action.res.data.lands,
          error: null
        }
      }
    case GET_ROOM_LIST_ERROR:
      return {
        ...state,
        rooms: {
          loading: false,
          data: [],
          error: action.error
        }
      }
    case GET_ROOM_DETAIL_INFO:
      return {
        ...state,
        room: {
          loading: true,
          data: null,
          error: null
        }
      }
    case GET_ROOM_DETAIL_INFO_SUCCESS:
      return {
        ...state,
        room: {
          loading: false,
          data: action.res.data,
          error: null
        }
      }
    case GET_ROOM_DETAIL_INFO_ERROR:
      return {
        ...state,
        room: {
          loading: false,
          data: null,
          error: action.error
        }
      }
    default:
      return state;
  }
}