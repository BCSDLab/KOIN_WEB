import { infoAPI } from '../api';
import { reducerUtils, handleAsyncActions, createPromiseThunk } from '../lib/asyncUtils';

const GET_ROOM_LIST = "GET_ROOM_LIST";
const GET_ROOM_LIST_SUCCESS = "GET_ROOM_LIST_SUCCESS";
const GET_ROOM_LIST_ERROR = "GET_ROOM_LIST_ERROR";

const GET_ROOM_DETAIL_INFO = "GET_ROOM_DETAIL_INFO";
const GET_ROOM_DETAIL_INFO_SUCCESS = "GET_ROOM_DETAIL_INFO_SUCCESS";
const GET_ROOM_DETAIL_INFO_ERROR = "GET_ROOM_DETAIL_INFO_ERROR";

export const getRoomList = createPromiseThunk(GET_ROOM_LIST, infoAPI.getRoomList);
export const getRoomDetailInfo = createPromiseThunk(GET_ROOM_DETAIL_INFO, infoAPI.getRoomInfo);

const initialState = {
  rooms: reducerUtils.initial([]),
  room: reducerUtils.initial()
}

const getRoomListReducer = handleAsyncActions(GET_ROOM_LIST, 'rooms');
const getRoomDetailInfoReducer = handleAsyncActions(GET_ROOM_DETAIL_INFO, 'room');

export default function roomReducer(state = initialState, action) {
  switch(action.type) {
    case GET_ROOM_LIST:
    case GET_ROOM_LIST_SUCCESS:
    case GET_ROOM_LIST_ERROR:
      return getRoomListReducer(state, action);
    case GET_ROOM_DETAIL_INFO:
    case GET_ROOM_DETAIL_INFO_SUCCESS:
    case GET_ROOM_DETAIL_INFO_ERROR:
      return getRoomDetailInfoReducer(state, action);
    default:
      return state;
  }
}