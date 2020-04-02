import { infoAPI } from "../api";
import { reducerUtils, handleAsyncActions, createPromiseThunk } from "../lib/asyncUtils";

const GET_CIRCLE_LIST = "GET_CIRCLE_LIST";
const GET_CIRCLE_LIST_SUCCESS = "GET_CIRCLE_LIST_SUCCESS";
const GET_CIRCLE_LIST_ERROR = "GET_CIRCLE_ERROR";

const GET_CIRCLE_DETAIL_INFO = "GET_CIRCLE_DETAIL_INFO";
const GET_CIRCLE_DETAIL_INFO_SUCCESS = "GET_CIRCLE_DETAIL_INFO_SUCCESS";
const GET_CIRCLE_DETAIL_INFO_ERROR = "GET_CIRCLE_DETAIL_INFO_ERROR";

export const getCircleList = createPromiseThunk(GET_CIRCLE_LIST, infoAPI.getCircleList);
export const getCircleDetailInfo = createPromiseThunk(GET_CIRCLE_DETAIL_INFO, infoAPI.getCircleInfo);

const initialState = {
  circles: reducerUtils.initial([]),
  circle: reducerUtils.initial()
};

const getCircleListReducer = handleAsyncActions(GET_CIRCLE_LIST, 'circles');
const getCircleDetailInfoReducer = handleAsyncActions(GET_CIRCLE_DETAIL_INFO, 'circle');

export default function circleReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CIRCLE_LIST:
    case GET_CIRCLE_LIST_SUCCESS:
    case GET_CIRCLE_LIST_ERROR:
      return getCircleListReducer(state, action);
    case GET_CIRCLE_DETAIL_INFO:
    case GET_CIRCLE_DETAIL_INFO_SUCCESS:
    case GET_CIRCLE_DETAIL_INFO_ERROR:
      return getCircleDetailInfoReducer(state, action);
    default:
      return state;
  }
}
