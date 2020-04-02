import {infoAPI} from "../api"
import { reducerUtils, handleAsyncActions, createPromiseThunk } from "../lib/asyncUtils";

const GET_FAQ_LIST = "GET_FAQ_LIST";
const GET_FAQ_LIST_SUCCESS = "GET_FAQ_LIST_SUCCESS";
const GET_FAQ_LIST_ERROR = "GET_FAQ_LIST_ERROR";

export const getFaqList = createPromiseThunk(GET_FAQ_LIST, infoAPI.getFaqList);

const initialState = {
  faqs: reducerUtils.initial([])
};

const getFaqListReducer = handleAsyncActions(GET_FAQ_LIST, 'faqs');

export default function faqReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FAQ_LIST:
    case GET_FAQ_LIST_SUCCESS:
    case GET_FAQ_LIST_ERROR:
      return getFaqListReducer(state, action);
    default:
      return state;
  }
}
