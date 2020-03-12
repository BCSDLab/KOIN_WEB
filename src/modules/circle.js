import { infoAPI } from "../api";

const GET_CIRCLE_LIST = "GET_CIRCLE_LIST";
const GET_CIRCLE_LIST_SUCCESS = "GET_CIRCLE_LIST_SUCCESS";
const GET_CIRCLE_LIST_ERROR = "GET_CIRCLE_ERROR";

const GET_CIRCLE_LIST_BY_CATEGORY = "GET_CIRCLE_LIST_BY_CATEGORY";

const GET_CIRCLE_DETAIL_INFO = "GET_CIRCLE_DETAIL_INFO";
const GET_CIRCLE_DETAIL_INFO_SUCCESS = "GET_CIRCLE_DETAIL_INFO_SUCCESS";
const GET_CIRCLE_DETAIL_INFO_ERROR = "GET_CIRCLE_DETAIL_INFO_ERROR";

export const getCircleList = tag => async dispatch => {
  dispatch({ type: GET_CIRCLE_LIST });
  try {
    const res = await infoAPI.getCircleList();
    dispatch({
      type: GET_CIRCLE_LIST_SUCCESS,
      res
    });
    dispatch({
      type: GET_CIRCLE_LIST_BY_CATEGORY,
      tag
    })
  } catch (e) {
    dispatch({
      type: GET_CIRCLE_LIST_ERROR,
      error: e
    });
  }
};

export const getCircleListByCategory = tag => ({
  type: GET_CIRCLE_LIST_BY_CATEGORY,
  tag
});

export const getCircleDetailInfo = id => async dispatch => {
  dispatch({ type: GET_CIRCLE_DETAIL_INFO });
  try {
    const res = await infoAPI.getCircleInfo(id);
    dispatch({
      type: GET_CIRCLE_DETAIL_INFO_SUCCESS,
      res
    })
  } catch(e) {
    dispatch({
      type: GET_CIRCLE_DETAIL_INFO_ERROR,
      error: e
    })
  }
};

const initialState = {
  circles: {
    loading: false,
    data: [],
    filteredData: [],
    error: null
  },
  circle: {
    loading: false,
    data: null,
    error: null
  }
};

export default function circleReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CIRCLE_LIST:
      return {
        ...state,
        circles: {
          loading: true,
          data: [],
          filteredData: [],
          error: null
        }
      };
    case GET_CIRCLE_LIST_SUCCESS:
      return {
        ...state,
        circles: {
          loading: false,
          data: action.res.data.circles,
          filteredData: action.res.data.circles,
          error: null
        }
      };
    case GET_CIRCLE_LIST_ERROR:
      return {
        ...state,
        circles: {
          loading: false,
          data: null,
          filteredData: null,
          error: action.error
        }
      };
    case GET_CIRCLE_LIST_BY_CATEGORY:
      return {
        ...state,
        circles: {
          loading: false,
          data: state.circles.data,
          filteredData:
            action.tag === "ALL"
              ? state.circles.data
              : state.circles.data.filter(circle => circle.category === action.tag),
          error: null
        }
      };
    case GET_CIRCLE_DETAIL_INFO:
      return {
        ...state,
        circle: {
          loading: true,
          data: null,
          error: null,
        }
      }
    case GET_CIRCLE_DETAIL_INFO_SUCCESS:
      return {
        ...state,
        circle: {
          loading: false,
          data: action.res.data,
          error: null
        }
      }
    case GET_CIRCLE_DETAIL_INFO_ERROR:
      return {
        ...state,
        circle: {
          loading: false,
          data: null,
          error: action.error
        }
      }
    default:
      return state;
  }
}
