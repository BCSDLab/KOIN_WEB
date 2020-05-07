import {infoAPI} from "../api"

export const GET_LOST_ITEMS = "GET_LOST_ITEMS";
export const GET_LOST_ITEMS_SUCCESS = "GET_LOST_ITEMS_SUCCESS";
export const GET_LOST_ITEMS_ERROR = "GET_LOST_ITEMS_ERROR";

export const REGISTER_LOST_ITEM = "REGISTER_LOST_ITEM";
export const REGISTER_LOST_ITEM_SUCCESS = "REGISTER_LOST_ITEM_SUCCESS";
export const REGISTER_LOST_ITEM_ERROR = "REGISTER_LOST_ITEM_ERROR";

export const GET_SPECIFIC_LOST_ITEM = "GET_SPECIFIC_LOST_ITEM";
export const GET_SPECIFIC_LOST_ITEM_SUCCESS = "GET_SPECIFIC_LOST_ITEM_SUCCESS";
export const GET_SPECIFIC_LOST_ITEM_ERROR = "GET_SPECIFIC_LOST_ITEM_ERROR";

export const ADJUST_LOST_COMMENT = "ADJUST_LOST_COMMENT";
export const ADJUST_LOST_COMMENT_SUCCESS = "ADJUST_LOST_COMMENT_SUCCESS";
export const ADJUST_LOST_COMMENT_ERROR = "ADJUST_LOST_COMMENT_ERROR";

export const DELETE_LOST_COMMENT = "DELETE_LOST_COMMENT";
export const DELETE_LOST_COMMENT_SUCCESS = "DELETE_LOST_COMMENT_SUCCESS";
export const DELETE_LOST_COMMENT_ERROR = "DELETE_LOST_COMMENT_ERROR";

export const REGISTER_LOST_COMMENT = "REGISTER_LOST_COMMENT";
export const REGISTER_LOST_COMMENT_SUCCESS = "REGISTER_LOST_COMMENT_SUCCESS";
export const REGISTER_LOST_COMMENT_ERROR = "REGISTER_LOST_COMMENT_ERROR";

export const DELETE_LOST_ITEM = "DELETE_LOST_ITEM";
export const DELETE_LOST_ITEM_SUCCESS = "DELETE_LOST_ITEM_SUCCESS";
export const DELETE_LOST_ITEM_ERROR = "DELETE_LOST_ITEM_ERROR";

export const REVISE_LOST_ITEM = "REVISE_LOST_ITEM";
export const REVISE_LOST_ITEM_SUCCESS = "REVISE_LOST_ITEM_SUCCESS";
export const REVISE_LOST_ITEM_ERROR = "REVISE_LOST_ITEM_ERROR";

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
      "title": payload.title,
      "type": payload.type,
      "date": payload.date,
      "location": payload.location,
      "is_phone_open": payload.is_phone_open,
      "phone": payload.phoneNumber,
      "content": payload.content,
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

export const getSpecificLostItem = (payload) => async dispatch => {
  dispatch({type: GET_SPECIFIC_LOST_ITEM});
  try {
    const res = await infoAPI.getSpecificLostItem(payload.token, payload.id);
    dispatch({
      type: GET_SPECIFIC_LOST_ITEM_SUCCESS,
      res
    });
  } catch (e) {
    dispatch({
      type: GET_SPECIFIC_LOST_ITEM_ERROR,
      error: e
    })
  }
};

export const adjustLostComment = (param) => async dispatch => {
  dispatch({ type: ADJUST_LOST_COMMENT });
  try {
    const res = await infoAPI.adjustLostComment(param.token, param.itemId, param.id, {content:param.content});
    dispatch({
      type: ADJUST_LOST_COMMENT_SUCCESS,
      res
    });
  } catch (e) {
    dispatch({
      type: ADJUST_LOST_COMMENT_ERROR,
      error: e
    });
  }
}

export const deleteLostComment = (param) => async dispatch => {
  dispatch({ type: DELETE_LOST_COMMENT });
  try {
    const res = await infoAPI.deleteLostComment(param.token, param.itemId, param.id);
    dispatch({
      type: DELETE_LOST_COMMENT_SUCCESS,
      res
    });
  } catch (e) {
    dispatch({
      type: DELETE_LOST_COMMENT_ERROR,
      error: e
    });
  }
}

export const registerLostComment = (param) => async dispatch => {
  dispatch({ type: REGISTER_LOST_COMMENT });
  try {
    const res = await infoAPI.registerLostComment(param.token, param.itemId, {content: param.content});
    dispatch({
      type: REGISTER_LOST_COMMENT_SUCCESS,
      res
    });
  } catch (e) {
    dispatch({
      type: REGISTER_LOST_COMMENT_ERROR,
      error: e
    });
  }
};

export const deleteLostItem = (param) => async dispatch => {
  dispatch({ type: DELETE_LOST_ITEM });
  try {
    const res = await infoAPI.deleteLostItem(param.token, param.id);
    dispatch({
      type: DELETE_LOST_ITEM_SUCCESS,
      res
    });
  } catch (e) {
    dispatch({
      type: DELETE_LOST_ITEM_ERROR,
      error: e
    });
  }
};

export const reviseLostItem = (payload) => async dispatch => {
  dispatch({ type: REVISE_LOST_ITEM});
  try {
    let body = {
      title: payload.title,
      type: payload.type,
      date: payload.date,
      location: payload.location,
      is_phone_open: payload.is_phone_open,
      phone: payload.phoneNumber,
      content: payload.content
    }
    const res = await infoAPI.adjustLostItem(payload.token, payload.id, body)
    dispatch({
      type: REVISE_LOST_ITEM_SUCCESS,
      res
    });
  } catch (e) {
    dispatch({
      type: DELETE_LOST_COMMENT_ERROR,
      error: e
    })
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
  data: null,
  specificData: {
    comment_count: 0,
    date: "",
    is_phone_open: false,
    thumbnail: null,
    comments: [
      {
        id: 0,
        lost_item_id: 0,
        content: "",
        user_id: 0,
        nickname: "",
        is_deleted: false,
        grantEdit: false,
        grantDelete: false,
        created_at: "2020-02-10 13:13:56",
        updated_at: "2020-02-10 13:13:56"
      }
    ],
    ip: "",
    created_at: "2020-02-09 07:35:44",
    image_urls: null,
    title: "",
    type: 0,
    content: "",
    hit: 0,
    is_deleted: false,
    updated_at: "",
    phone: null,
    user_id: 0,
    nickname: "",
    location: "",
    id: 0,
    state: 0,
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
      };
    case GET_SPECIFIC_LOST_ITEM:
      return {
        ...state,
        specificData: state.specificData
      };
    case GET_SPECIFIC_LOST_ITEM_SUCCESS:
      return {
        ...state,
        specificData: action.res.data
      };
    case GET_SPECIFIC_LOST_ITEM_ERROR:
      return {
        ...state,
        specificData: action.error
      };
    case ADJUST_LOST_COMMENT:
      return {
        ...state,
        data: "data"
      };
    case ADJUST_LOST_COMMENT_SUCCESS:
      return {
        ...state,
        data: action.res.data
      };
    case ADJUST_LOST_COMMENT_ERROR:
      return {
        data: null,
        error: action.error
      };
    case DELETE_LOST_COMMENT:
      return {
        ...state,
        data: "check"
      };
    case DELETE_LOST_COMMENT_SUCCESS:
      return {
        ...state,
        data: action.res.data
      };
    case DELETE_LOST_COMMENT_ERROR:
      return {
        data: null,
        error: action.error
      };
    case REGISTER_LOST_COMMENT:
      return {
        ...state,
        data: "check"
      };
    case REGISTER_LOST_COMMENT_SUCCESS:
      return {
        ...state,
        data: action.res.data
      };
    case REGISTER_LOST_COMMENT_ERROR:
      return {
        data: null,
        error: action.error
      };
    case DELETE_LOST_ITEM:
      return {
        ...state,
        data: "check"
      };
    case DELETE_LOST_ITEM_SUCCESS:
      return {
        ...state,
        data: action.res.data
      };
    case DELETE_LOST_ITEM_ERROR:
      return {
        data: null,
        error: action.error
      };
    case REVISE_LOST_ITEM:
      return {
        ...state,
        data: null
      };
    case REVISE_LOST_ITEM_SUCCESS:
      return {
        ...state,
        data: action.res.data
      };
    case REVISE_LOST_ITEM_ERROR:
      return {
        data: null,
        error: action.error
      };
    default:
      return state;
  }
}
