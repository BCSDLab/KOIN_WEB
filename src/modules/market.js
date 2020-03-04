export const GET_ITEMS = "GET_ITEMS";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_ERROR = "GET_ITEMS_ERROR";

export const GET_ITEM = "GET_ITEM";
export const GET_ITEM_SUCCESS = "GET_ITEM_SUCCESS";
export const GET_ITEM_ERROR = "GET_ITEM_ERROR";

export const GET_MY_ITEMS = "GET_MY_ITEMS";
export const GET_MY_ITEMS_SUCCESS = "GET_MY_ITEMS_SUCCESS";
export const GET_MY_ITEMS_ERROR = "GET_MY_ITEMS_ERROR";

export const REGISTER_ITEM = "REGISTER_ITEM";
export const REGISTER_ITEM_SUCCESS = "REGISTER_ITEM_SUCCESS";
export const REGISTER_ITEM_ERROR = "REGISTER_ITEM_ERROR";

export const EDIT_ITEM = "EDIT_ITEM";
export const EDIT_ITEM_SUCCESS = "EDIT_ITEM_SUCCESS";
export const EDIT_ITEM_ERROR = "EDIT_ITEM_ERROR";

export const DELETE_ITEM = "DELETE_ITEM";
export const DELETE_ITEM_SUCCESS = "DELETE_ITEM_SUCCESS";
export const DELETE_ITEM_ERROR = "DELETE_ITEM_ERROR";

export const CHECK_PERMISSION = "market/CHECK_PERMISSION";
export const CHECK_PERMISSION_SUCCESS = "market/CHECK_PERMISSION_SUCCESS";
export const CHECK_PERMISSION_ERROR = "market/CHECK_PERMISSION_ERROR";

export const REGISTER_COMMENT = "market/REGISTER_COMMENT";
export const REGISTER_COMMENT_SUCCESS = "market/REGISTER_COMMENT_SUCCESS";
export const REGISTER_COMMENT_ERROR = "market/REGISTER_COMMENT_ERROR";

export const EDIT_COMMENT = "market/EDIT_COMMENT";
export const EDIT_COMMENT_SUCCESS = "market/EDIT_COMMENT_SUCCESS";
export const EDIT_COMMENT_ERROR = "market/EDIT_COMMENT_ERROR";

export const DELETE_COMMENT = "market/DELETE_COMMENT";
export const DELETE_COMMENT_SUCCESS = "market/DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_ERROR = "market/DELETE_COMMENT_ERROR";

export const GET_LATEST_ITEMS = "GET_LATEST_ITEMS";
export const GET_LATEST_ITEMS_SUCCESS = "GET_LATEST_ITEMS_SUCCESS";
export const GET_LATEST_ITEMS_ERROR = "GET_LATEST_ITEMS_ERROR";
export const CLEAR_STATE = "market/CLEAR_STATE";

export const getItems = payload => ({ type: GET_ITEMS, payload });
export const getItem = payload => ({ type: GET_ITEM, payload });
export const getMyItems = payload => ({ type: GET_MY_ITEMS, payload });
export const registerItem = payload => ({ type: REGISTER_ITEM, payload });
export const editItem = payload => ({ type: EDIT_ITEM, payload });
export const deleteItem = payload => ({ type: DELETE_ITEM, payload });
export const checkPermission = payload => ({ type: CHECK_PERMISSION, payload });
export const registerComment = payload => ({ type: REGISTER_COMMENT, payload });
export const editComment = payload => ({ type: EDIT_COMMENT, payload });
export const deleteComment = payload => ({ type: DELETE_COMMENT, payload });
export const getLatestItems = payload => ({ type: GET_LATEST_ITEMS, payload });
export const clearState = () => ({ type: CLEAR_STATE });

const initialState = {
  data: null,
  error: null,
  items: {
    data: null,
    loading: false,
    error: null
  },
  item: {
    data: null,
    loading: false,
    error: null
  },
  comment: {
    data: null,
    delete: false,
    error: null
  },
  totalPageNum: 0,
  pageNum: 1,
  PAGE_MAX_SIZE: 5,
  displayPageNum: 5,
  displayMinNum: 1,
  numOfItems: 0
}

export default function marketReducer(state= initialState, action) {
  switch(action.type) {
    case GET_ITEMS:
      return {
        ...state,
        data: null,
        error: null,
        items: {
          data: null,
          loading: true,
          error: null
        }
      }
    case GET_ITEMS_SUCCESS:
      return {
        ...state,
        items: {
          data: action.payload.items,
          loading: false,
          error: null
        },
        page: action.payload.pageNum,
        totalPageNum: action.payload.data.totalPage,
        displayPageNum: action.payload.displayPageNum,
        displayMinNum: action.payload.displayMinNum,
        numOfItems: action.payload.data.totalItemCount
      }
    case GET_ITEMS_ERROR:
      return {
        ...state,
        items: {
          data: null,
          loading: false,
          error: action.error
        }
      }
    case GET_ITEM:
      return {
        ...state,
        item: {
          ...state.item,
          data: null,
          loading: true
        }
      }
    case GET_ITEM_SUCCESS:
      return {
        ...state,
        item: {
          data: action.payload.data,
          loading: false,
          error: null
        }
      }
    case GET_ITEM_ERROR:
      return {
        ...state,
        item: {
          data: null,
          loading: false,
          error: action.error
        }
      }
    case GET_MY_ITEMS:
      return {
        ...state,
        data: null,
        error: null,
        items: {
          ...state.items,
          loading: true
        }
      }
    case GET_MY_ITEMS_SUCCESS:
      return {
        ...state,
        items: {
          data: action.payload.items,
          loading: false,
          error: null
        },
        page: action.payload.pageNum,
        totalPageNum: action.payload.data.totalPage,
        displayPageNum: action.payload.displayPageNum,
        displayMinNum: action.payload.displayMinNum,
        numOfItems: action.payload.data.totalItemCount
      }
    case GET_MY_ITEMS_ERROR:
      return {
        ...state,
        items: {
          data: null,
          loading: false,
          error: action.error
        }
      }
    case REGISTER_ITEM:
      return {
        ...state,
        data: null,
        error: null
      }
    case REGISTER_ITEM_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null
      }
    case REGISTER_ITEM_ERROR:
      return {
        ...state,
        data: null,
        error: action.error
      }
    case EDIT_ITEM:
      return {
        ...state,
        data: null,
        error: null
      }
    case EDIT_ITEM_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null
      }
    case EDIT_ITEM_ERROR:
      return {
        ...state,
        data: null,
        error: action.error
      }
    case DELETE_ITEM:
      return {
        ...state,
        data: null,
        error: null
      }
    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null
      }
    case DELETE_ITEM_ERROR:
      return {
        ...state,
        data: null,
        error: action.error
      }
    case CHECK_PERMISSION:
      return {
        ...state,
        data: null,
        error: null,
      }
    case CHECK_PERMISSION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null
      }
    case CHECK_PERMISSION_ERROR:
      return {
        ...state,
        data: null,
        error: action.error
      }
    case REGISTER_COMMENT:
      return {
        ...state,
        comment: {
          data: null,
          delete: null,
          error: null
        }
      }
    case REGISTER_COMMENT_SUCCESS:
      return {
        ...state,
        comment: {
          ...state.comment,
          data: action.payload,
        }
      }
    case REGISTER_COMMENT_ERROR:
      return {
        ...state,
        comment: {
          data: null,
          delete: null,
          error: action.error
        }
      }
    case EDIT_COMMENT:
      return {
        ...state,
        comment: {
          data: null,
          delete: null,
          error: null
        }        
      }
    case EDIT_COMMENT_SUCCESS:
      return {
        ...state,
        comment: {
          ...state.comment,
          data: action.payload
        }
      }
    case EDIT_COMMENT_ERROR:
      return {
        ...state,
        comment: {
          data: null,
          delete: null,
          error: action.error
        }
      }
    case DELETE_COMMENT:
      return {
        ...state,
        comment: {
          data: null,
          delete: null,
          error: null
        }
      }
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comment: {
          data: null,
          delete: action.payload,
          error: null
        }
      }
    case DELETE_COMMENT_ERROR:
      return {
        ...state,
        comment: {
          data: null,
          delete: null,
          error: action.error
        }
      }
    case GET_LATEST_ITEMS:
      return {
        ...state,
        items: {
          data: null,
          loading: true,
          error: null
        }
      }
    case GET_LATEST_ITEMS_SUCCESS:
      return {
        ...state,
        items: {
          data: action.payload.data.items,
          loading: false,
          error: null
        }
      }
    case GET_LATEST_ITEMS_ERROR:
      return {
        ...state,
        items: {
          data: null,
          loading: false,
          error: action.error
        }
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