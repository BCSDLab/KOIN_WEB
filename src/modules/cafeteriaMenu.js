import { infoAPI } from "../api";
import { reducerUtils, handleAsyncActions, createPromiseThunk } from '../lib/asyncUtils';

const GET_CAFETERIA_MENU = "GET_CAFETERIA_MENU";
const GET_CAFETERIA_MENU_SUCCESS = "GET_CAFETERIA_MENU_SUCCESS";
const GET_CAFETERIA_MENU_ERROR = "GET_CAFETERIA_MENU_ERROR";

export const getCafeteriaMenu = createPromiseThunk(GET_CAFETERIA_MENU, infoAPI.getCafeteriaMenu)

const initialState = {
  cafeteriaMenus: reducerUtils.initial([])
};

const getCafeteriaMenuReducer = handleAsyncActions(GET_CAFETERIA_MENU, 'cafeteriaMenus');

export default function cafeteriaMenuReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CAFETERIA_MENU:
    case GET_CAFETERIA_MENU_SUCCESS:
    case GET_CAFETERIA_MENU_ERROR:
      return getCafeteriaMenuReducer(state, action);
    default:
      return state;
  }
}
