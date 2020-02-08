import {infoAPI} from "../api"

const GET_LOST_ITEMS = "GET_LOST_ITEMS";
const GET_LOST_ITEMS_SUCCESS = "GET_LOST_ITEMS_SUCCESS";
const GET_LOST_ITEMS_ERROR = "GET_LOST_ITEMS_ERROR";

const REGISTER_LOST_ITEM = "REGISTER_LOST_ITEM";
const REGISTER_LOST_ITEM_SUCCESS = "REGISTER_LOST_ITEM_SUCCESS";
const REGISTER_LOST_ITEM_ERROR = "REGISTER_LOST_ITEM_ERROR";

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

export const registerLostItem = payload => async dispatch => {
  dispatch({ type: REGISTER_LOST_ITEM });
  try {
    const body = {
      title : payload.title,
      type: payload.type,
      date: payload.date,
      location: payload.location,
      is_phone_open: payload.is_phone_open,
      phone: payload.phoneNumber,
      content: payload.content
    };
    const res = await infoAPI.registerLostItem(payload.token, body);
    dispatch({
      type: REGISTER_LOST_ITEM_SUCCESS,
      res
    });
  }
  catch (e) {
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
  },
  data: null
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
    case REGISTER_LOST_ITEM:
      return {
        ...state,
        data: null
      };
    case REGISTER_LOST_ITEM_SUCCESS:
      return {
        ...state,
        data: action.res.data
      };
    case REGISTER_LOST_ITEM_ERROR:
      return {
        data: null,
        error: action.error
      }
    default:
      return state;
  }
}
