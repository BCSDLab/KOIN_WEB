import {infoAPI} from "../api"

const GET_FAQ_LIST = "GET_FAQ_LIST";
const GET_FAQ_LIST_SUCCESS = "GET_FAQ_LIST_SUCCESS";
const GET_FAQ_LIST_ERROR = "GET_FAQ_LIST_ERROR";

export const getFaqList = page => async dispatch => {
  dispatch({ type: GET_FAQ_LIST });
  try {
    const res = await infoAPI.getFaqList(page);
    dispatch({
      type: GET_FAQ_LIST_SUCCESS,
      res
    });
  } catch (e) {
    dispatch({
      type: GET_FAQ_LIST_ERROR,
      error: e
    });
  }
};

const initialState = {
  faqs: {
    loading: false,
    data: [],
    filteredData: [],
    error: null
  },
  faq: {
    loading: false,
    data: null,
    error: null
  }
};

export default function faqReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FAQ_LIST:
      return {
        ...state,
        faqs: {
          loading: true,
          data: [],
          filteredData: [],
          error: null
        }
      };
    case GET_FAQ_LIST_SUCCESS:
      return {
        ...state,
        faqs: {
          loading: false,
          data: action.res.data.faqs,
          filteredData: action.res.data.faqs,
          error: null
        }
      };
    case GET_FAQ_LIST_ERROR:
      return {
        ...state,
        faqs: {
          loading: false,
          data: null,
          filteredData: null,
          error: action.error
        }
      };
    default:
      return state;
  }
}
