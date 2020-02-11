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

export const getPosts = payload => ({ type: GET_POSTS, payload });
export const getHotPosts = () => ({ type: GET_HOT_POSTS });
export const registerPost = () => {

}

export const editPost = () => {

}

export const deletePost = () => {

}

const initialState = {
  data: null,
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
        posts: {
          ...state.posts,
          loading: true
        }
      }
    case GET_POSTS_SUCCESS:
      console.log(action.payload);
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
    default:
      return state;
  }
}