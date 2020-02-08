import {infoAPI} from "../api"

const GET_LOST_ITEMS = "GET_LOST_ITEMS";
const GET_LOST_ITEMS_SUCCESS = "GET_LOST_ITEMS_SUCCESS";
const GET_LOST_ITEMS_ERROR = "GET_LOST_ITEMS_ERROR";

export const getLostItems = nowPageNum => async dispatch => {
  dispatch({ type: GET_LOST_ITEMS });
  try {
    const res = await infoAPI.getLostItems(nowPageNum);
    dispatch({
      type: GET_LOST_ITEMS_SUCCESS,
      res
    });
  } catch (e) {
    dispatch({
      type: GET_LOST_ITEMS_ERROR,
      error: e
    });
  }
};

const initialState = {
  lostItems: {
    loading: false,
    data: {
      totalPage:0,
      lostItems:[]
    },
    error: null
  }
};

export default function lostReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOST_ITEMS:
      return {
        ...state,
        lostItems: {
          loading: true,
          data: state.lostItems.data,
          error: null
        }
      }
    case GET_LOST_ITEMS_SUCCESS:
      return {
        ...state,
        lostItems: {
          loading: false,
          data: action.res.data,
          error: null
        }
      };
    case GET_LOST_ITEMS_ERROR:
      return {
        lostItems: {
          loading: false,
          data: null,
          error: action.error
        }
      };
    default:
      return state;
  }
}
