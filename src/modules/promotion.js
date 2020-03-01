export const GET_PROMOTIONS = "GET_PROMOTIONS";
export const GET_PROMOTIONS_SUCCESS = "GET_PROMOTIONS_SUCCESS";
export const GET_PROMOTIONS_ERROR = "GET_PROMOTIONS_ERROR";

export const REGISTER_PROMOTION = "REGISTER_PROMOTION";
export const REGISTER_PROMOTION_SUCCESS = "REGISTER_PROMOTION_SUCCESS";
export const REGISTER_PROMOTION_ERROR = "REGISTER_PROMOTION_ERROR";

export const ADJUST_PROMOTION = "ADJUST_PROMOTION";
export const ADJUST_PROMOTION_SUCCESS = "ADJUST_PROMOTION_SUCCESS";
export const ADJUST_PROMOTION_ERROR = "ADJUST_PROMOTION_ERROR";

export const DELETE_PROMOTION = "DELETE_PROMOTION";
export const DELETE_PROMOTION_SUCCESS = "DELETE_PROMOTION_SUCCESS";
export const DELETE_PROMOTION_ERROR = "DELETE_PROMOTION_ERROR";

export const GET_PROMOTION = "GET_PROMOTION";
export const GET_PROMOTION_SUCCESS = "GET_PROMOTION_SUCCESS";
export const GET_PROMOTION_ERROR = "GET_PROMOTION_ERROR";

export const REGISTER_PROMOTION_COMMENT = "REGISTER_PROMOTION_COMMENT";
export const REGISTER_PROMOTION_COMMENT_SUCCESS = "REGISTER_PROMOTION_COMMENT_SUCCESS";
export const REGISTER_PROMOTION_COMMENT_ERROR = "REGISTER_PROMOTION_COMMENT_ERROR";

export const ADJUST_PROMOTION_COMMENT = "ADJUST_PROMOTION_COMMENT";
export const ADJUST_PROMOTION_COMMENT_SUCCESS = "ADJUST_PROMOTION_COMMENT_SUCCESS";
export const ADJUST_PROMOTION_COMMENT_ERROR = "ADJUST_PROMOTION_COMMENT_ERROR";

export const DELETE_PROMOTION_COMMENT = "DELETE_PROMOTION_COMMENT";
export const DELETE_PROMOTION_COMMENT_SUCCESS = "DELETE_PROMOTION_COMMENT_SUCCESS";
export const DELETE_PROMOTION_COMMENT_ERROR = "DELETE_PROMOTION_COMMENT_ERROR";

export const CHECK_MY_PENDING_PROMOTION = "CHECK_MY_PENDING_PROMOTION";
export const CHECK_MY_PENDING_PROMOTION_SUCCESS = "CHECK_MY_PENDING_PROMOTION_SUCCESS";
export const CHECK_MY_PENDING_PROMOTION_ERROR = "CHECK_MY_PENDING_PROMOTION_ERROR";

export const GET_MY_STORE = "GET_MY_STORE";
export const GET_MY_STORE_SUCCESS = "GET_MY_STORE_SUCCESS";
export const GET_MY_STORE_ERROR = "GET_MY_STORE_ERROR";

export const CHECK_PROMOTION_PERMISSION = "CHECK_PROMOTION_PERMISSION";
export const CHECK_PROMOTION_PERMISSION_SUCCESS = "CHECK_PROMOTION_PERMISSION_SUCCESS";
export const CHECK_PROMOTION_PERMISSION_ERROR = "CHECK_PROMOTION_PERMISSION_ERROR";

export const CLEAR_STATE = "CLEAR_STATE";

export const getPromotions = payload => ({ type: GET_PROMOTIONS, payload });
export const getPromotion = payload => ({ type: GET_PROMOTION, payload });
export const registerPromotion = payload => ({ type: REGISTER_PROMOTION, payload });
export const adjustPromotion = payload => ({ type: ADJUST_PROMOTION, payload });
export const deletePromotion = payload => ({ type: DELETE_PROMOTION, payload });
export const checkPromotionPermission = payload => ({ type: CHECK_PROMOTION_PERMISSION, payload });
export const checkMyPendingPromotion = payload => ({ type: CHECK_MY_PENDING_PROMOTION, payload})
export const getMyStore = payload => ({type: GET_MY_STORE, payload});
export const registerPromotionComment = payload => ({ type: REGISTER_PROMOTION_COMMENT, payload });
export const adjustPromotionComment = payload => ({ type: ADJUST_PROMOTION_COMMENT, payload });
export const deletePromotionComment = payload => ({ type: DELETE_PROMOTION_COMMENT, payload });
export const clearState = () => ({ type: CLEAR_STATE });

const initialState = {
  data: null,
  error: null,
  posts: {
    data: null,
    loading: false,
    error: null,
    totalPageNum: 0,
    pageNum: 1,
    PAGE_MAX_SIZE: 5
  },
  post: {
    data: null,
    loading: false,
    error: null
  },
  comment: {
    loading: false,
    error: null
  },
  myStore: {
    data: null,
    error: null
  }
};

export default function promotionReducer(state = initialState, action) {
  switch(action.type) {
    case GET_PROMOTIONS:
      return {
        ...state,
        data: null,
        error: null,
        posts: {
          ...state.posts,
          loading: true
        }
      }
    case GET_PROMOTIONS_SUCCESS:
      return {
        ...state,
        posts: {
          ...state.posts,
          data: action.payload.posts,
          loading: false,
          error: null,
          pageNum: action.payload.pageNum,
          totalPageNum: action.payload.data.totalPage
        }
      }
    case GET_PROMOTIONS_ERROR:
      return {
        ...state,
        posts: {
          ...state.posts,
          data: null,
          loading: false,
          error: action.error
        }
      }
    case GET_PROMOTION:
      return {
        ...state,
        data: null,
        error: null,
        post: {
          ...state.post,
          data: null,
          loading: true,
          error: null
        }
      }
    case GET_PROMOTION_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          data: action.payload.data,
          loading: false,
          error: null
        }
      }
    case GET_PROMOTION_ERROR:
      return {
        ...state,
        post: {
          ...state.post,
          data: null,
          loading: false,
          error: action.error
        }
      }
    case REGISTER_PROMOTION:
      return {
        ...state,
        data: null,
        error: null
      }
    case REGISTER_PROMOTION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null
      }
    case REGISTER_PROMOTION_ERROR:
      return {
        ...state,
        data: null,
        error: action.error
      }
    case ADJUST_PROMOTION:
      return {
        ...state,
        data: null,
        error: null,
        post: {
          ...state.post,
          loading: true
        }
      }
    case ADJUST_PROMOTION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        post: {
          loading: false,
          error: null
        }
      }
    case ADJUST_PROMOTION_ERROR:
      return {
        ...state,
        data: null,
        error: action.error,
        post: {
          loading: false,
          error: null
        }
      }
    case DELETE_PROMOTION:
      return {
        ...state,
        data: null,
        error: null,
      }
    case DELETE_PROMOTION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null
      }
    case DELETE_PROMOTION_ERROR:
      return {
        ...state,
        data: null,
        error: action.error
      }
    case CHECK_MY_PENDING_PROMOTION:
      return {
        ...state,
        post: {
          ...state.post,
          data: null,
          loading: true,
          error: null
        }
      }
    case CHECK_MY_PENDING_PROMOTION_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          data: action.payload,
          loading: false,
          error: null
        }
      }
    case CHECK_MY_PENDING_PROMOTION_ERROR:
      return {
        ...state,
        post: {
          ...state.post,
          data: null,
          loading: false,
          error: action.error
        }
      }
    case CHECK_PROMOTION_PERMISSION:
      return {
        ...state,
        data: null,
        error: null,
      }
    case CHECK_PROMOTION_PERMISSION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      }
    case CHECK_PROMOTION_PERMISSION_ERROR:
      return {
        ...state,
        data: null,
        error: action.error,
      }
    case GET_MY_STORE:
      return {
        ...state,
        myStore: {
          data: null,
          error: null
        }
      }
    case GET_MY_STORE_SUCCESS:
      return {
        ...state,
        myStore: {
          ...state.myStore,
          data: action.payload
        }
      }
    case GET_MY_STORE_ERROR:
      return {
        ...state,
        myStore: {
          data: null,
          error: action.payload
        }
      }
    case DELETE_PROMOTION_COMMENT:
      return {
        ...state,
        comment: {
          delete: null,
          error: null
        },
      }
    case DELETE_PROMOTION_COMMENT_SUCCESS:
      return {
        ...state,
        comment: {
          delete: action.payload,
          error: null
        },
      }
    case DELETE_PROMOTION_COMMENT_ERROR:
      return {
        ...state,
        comment: {
          delete: null,
          error: action.error
        },
      }
    case REGISTER_PROMOTION_COMMENT:
      return {
        ...state,
        comment: {
          data: null,
          error: null
        },
      }
    case REGISTER_PROMOTION_COMMENT_SUCCESS:
      return {
        ...state,
        comment: {
          data: action.payload,
          error: null
        },
      }
    case REGISTER_PROMOTION_COMMENT_ERROR:
      return {
        ...state,
        comment: {
          data: null,
          error: action.error
        },
      }
    case ADJUST_PROMOTION_COMMENT:
      return {
        ...state,
        comment: {
          data: null,
          error: null
        },
      }
    case ADJUST_PROMOTION_COMMENT_SUCCESS:
      return {
        ...state,
        comment: {
          data: action.payload,
          error: null
        },
      }
    case ADJUST_PROMOTION_COMMENT_ERROR:
      return {
        ...state,
        comment: {
          data: null,
          error: action.error
        },
      }
    case CLEAR_STATE:
      return {
        ...state,
        data: null,
        error: null,
        comment: {
          data: null,
          delete: null,
          error: null
        }
      }
    default:
      return state;
  }
}
