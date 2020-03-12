export const SEARCH_POSTS = 'SEARCH_POSTS';
export const SEARCH_POSTS_SUCCESS = 'SEARCH_POSTS_SUCCESS';
export const SEARCH_POSTS_ERROR = 'SEARCH_POSTS_ERROR';

export const searchPosts = payload => ({ type: SEARCH_POSTS, payload });

const initialState = {
  posts: {
    data: null,
    loading: false,
    error: null,
    totalPageNum: 0
  }
}
export default function searchReducer(state = initialState, action) {
  switch(action.type) {
    case SEARCH_POSTS:
      return {
        ...state,
        posts: {
          ...state.posts,
          loading: true
        }
      }
    case SEARCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: {
          data: action.payload.data.articles,
          loading: false,
          error: null,
          totalPageNum: action.payload.data.totalPage
        }
      }
    case SEARCH_POSTS_ERROR:
      return {
        ...state,
        posts: {
          data: null,
          loading: false,
          error: action.error,
          totalPageNum: 0
        }
      }
    default:
      return state;
  }
}