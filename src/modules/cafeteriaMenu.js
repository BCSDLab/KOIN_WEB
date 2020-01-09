import { infoAPI } from "../api";

const GET_CAFETERIA_MENU = "GET_CAFETERIA_MENU";
const GET_CAFETERIA_MENU_SUCCESS = "GET_CAFETERIA_MENU_SUCCESS";
const GET_CAFETERIA_MENU_ERROR = "GET_CAFETERIA_MENU_ERROR";

export const getCafeteriaMenu = date => async dispatch => {
  dispatch({ type: GET_CAFETERIA_MENU });
  try {
    const res = await infoAPI.getCafeteriaMenu(date);
    dispatch({
      type: GET_CAFETERIA_MENU_SUCCESS,
      res
    });
  } catch (e) {
    dispatch({
      type: GET_CAFETERIA_MENU_ERROR,
      error: e
    });
  }
};

const initialState = {
  cafeteriaMenus: {
    loading: false,
    data: [],
    error: null
  }
};

export default function cafeteriaMenuReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CAFETERIA_MENU:
      return {
        ...state,
        cafeteriaMenus: {
          loading: true,
          data: state.data,
          error: null
        }
      };
    case GET_CAFETERIA_MENU_SUCCESS:
      return {
        ...state,
        cafeteriaMenus: {
          loading: false,
          data: action.res.data,
          error: null
        }
      };
    case GET_CAFETERIA_MENU_ERROR:
      return {
        ...state,
        cafeteriaMenus: {
          loading: false,
          data: null,
          error: action.error
        }
      };

    default:
      return state;
  }
}
