import { infoAPI } from "../api";

const GET_CIRCLE_LIST = "GET_CIRCLE_LIST";
const GET_CIRCLE_LIST_SUCCESS = "GET_CIRCLE_LIST_SUCCESS";
const GET_CIRCLE_LIST_ERROR = "GET_CIRCLE_ERROR";

const GET_CIRCLE_LIST_BY_CATEGORY = "GET_CIRCLE_LIST_BY_CATEGORY";

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

const initialState = {
  loading: false,
  circleList: [],
  filteredCircleList: [],
  selectedCircleInfo: null,
  error: null
};

export default function circleReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CIRCLE_LIST:
      return {
        ...state,
        loading: true
      };
    case GET_CIRCLE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        circleList: action.res.data.circles,
        filteredCircleList: action.res.data.circles
      };
    case GET_CIRCLE_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case GET_CIRCLE_LIST_BY_CATEGORY:
      return {
        ...state,
        filteredCircleList:
          action.tag === "ALL"
            ? state.circleList
            : state.circleList.filter(circle => circle.category === action.tag)
      };
    default:
      return state;
  }
}
