export const GET_POSTS = "GET_POSTS";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_ERROR = "GET_POSTS_ERROR";

export const GET_HOT_POSTS = "GET_HOT_POSTS";
export const GET_HOT_POSTS_SUCCESS = "GET_HOT_POSTS_SUCCESS";
export const GET_HOT_POSTS_ERROR = "GET_HOT_POSTS_ERROR";

export const REGISTER_POST = "REGISTER_POST";
export const REGISTER_POST_SUCCESS = "REGISTER_POST_SUCCESS";
export const REGISTER_POST_ERROR = "REGISTER_POST_ERROR";

export const EDIT_POST = "EDIT_POST";
export const EDIT_POST_SUCCESS = "EDIT_POST_SUCCESS";
export const EDIT_POST_ERROR = "EDIT_POST_ERROR";

export const DELETE_POST = "DELETE_POST";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_ERROR = "DELETE_POST_ERROR";

export const GET_POST = "GET_POST";
export const GET_POST_SUCCESS = "GET_POST_SUCCESS";
export const GET_POST_ERROR = "GET_POST_ERROR";

export const REGISTER_COMMENT = "REGISTER_COMMENT";
export const REGISTER_COMMENT_SUCCESS = "REGISTER_COMMENT_SUCCESS";
export const REGISTER_COMMENT_ERROR = "REGISTER_COMMENT_ERROR";

export const EDIT_COMMENT = "EDIT_COMMENT";
export const EDIT_COMMENT_SUCCESS = "EDIT_COMMENT_SUCCESS";
export const EDIT_COMMENT_ERROR = "EDIT_COMMENT_ERROR";

export const DELETE_COMMENT = "DELETE_COMMENT";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_ERROR = "DELETE_COMMENT_ERROR";

export const CHECK_PERMISSION = "CHECK_PERMISSION";
export const CHECK_PERMISSION_SUCCESS = "CHECK_PERMISSION_SUCCESS";
export const CHECK_PERMISSION_ERROR = "CHECK_PERMISSION_ERROR";

export const CLEAR_STATE = "CLEAR_STATE";
export const getPosts = payload => ({ type: GET_POSTS, payload });
export const getHotPosts = () => ({ type: GET_HOT_POSTS });
export const getPost = payload => ({ type: GET_POST, payload });

export const registerPost = payload => ({ type: REGISTER_POST, payload });
export const editPost = payload => ({ type: EDIT_POST, payload });
export const deletePost = payload => ({ type: DELETE_POST, payload });
export const checkPermission = payload => ({ type: CHECK_PERMISSION, payload });
export const clearState = () => ({ type: CLEAR_STATE });
const initialState = {
  data: null,
  error: null,
  posts: {
    data: null,
    loading: false,
    error: null
  },
  hotPosts: {
    data: null,
    loading: false,
    error: null
  },
  post: {
    data: null,
    loading: false,
    error: null,
  },
  totalPageNum: 0,
  boardId: 1,
  postId: 0,

  pageNum: 1,
  PAGE_MAX_SIZE: 5,
  displayPageNum: 5,
  displayMinNum: 1
};

export default function boardReducer(state = initialState, action) {
  switch(action.type) {
    case GET_POSTS:
      return {
        ...state,
        data: null,
        error: null,
        posts: {
          ...state.posts,
          loading: true
        }
      }
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: {
          data: action.payload.posts,
          loading: false,
          error: null
        },
        pageNum: action.payload.pageNum,
        totalPageNum: action.payload.data.totalPage,
        displayPageNum: action.payload.displayPageNum,
        displayMinNum: action.payload.displayMinNum
      }
    case GET_POSTS_ERROR:
      return {
        ...state,
        posts: {
          data: null,
          loading: false,
          error: action.error
        }
      }
    case GET_HOT_POSTS:
      return {
        ...state,
        hotPosts: {
          ...state.hotPosts,
          loading: true
        }
      }
    case GET_HOT_POSTS_SUCCESS:
      return {
        ...state,
        hotPosts: {
          data: action.payload.data,
          loading: false,
          error: null
        }
      }
    case GET_HOT_POSTS_ERROR:
      return {
        ...state,
        hotPosts: {
          data: null,
          loading: false,
          error: action.error
        }
      }
    case GET_POST:
      return {
        ...state,
        data: null,
        error: null,
        post: {
          ...state.post,
          loading: true
        }
      }
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          data: action.payload.data,
          loading: false,
          error: null
        }
      }
    case GET_POST_ERROR:
      return {
        ...state,
        post: {
          ...state.post,
          data: null,
          loading: false,
          error: action.error
        }
      }
    case REGISTER_POST:
      return {
        ...state,
        data: null,
        error: null
      }
    case REGISTER_POST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null
      }
    case REGISTER_POST_ERROR:
      return {
        ...state,
        data: null,
        error: action.error
      }
    case EDIT_POST:
      return {
        ...state,
        data: null,
        error: null,
        post: {
          ...state.post,
          loading: true
        }
      }
    case EDIT_POST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        post: {
          loading: false,
          data: action.payload.data,
          error: null
        }
      }
    case EDIT_POST_ERROR:
      return {
        ...state,
        data: null,
        error: action.error,
        post: {
          loading: false,
          data: null,
          error: null
        }
      }
    case DELETE_POST:
      return {
        ...state,
        data: null,
        error: null,
      }
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null
      }
    case DELETE_POST_ERROR:
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
        post: {
          ...state.post,
        }
      }
    case CHECK_PERMISSION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        post: {
          ...state.post,
        }
      }
    case CHECK_PERMISSION_ERROR:
      return {
        ...state,
        data: null,
        error: action.error,
        post: {
          ...state.post,
        }
      }
    case CLEAR_STATE:
      return {
        ...state,
        data: null,
        error: null,
      }
    default:
      return state;
  }
}