import {infoAPI} from "../api"

const GET_CITY_BUS_INFO = "GET_BUS_INFO";
const GET_CITY_BUS_INFO_SUCCESS = "GET_BUS_INFO_SUCCESS";
const GET_CITY_BUS_INFO_ERROR = "GET_BUS_INFO_ERROR";
const GET_SHUTTLE_BUS_INFO = "GET_SHUTTLE_BUS_INFO";
const GET_SHUTTLE_BUS_INFO_SUCCESS = "GET_SHUTTLE_BUS_INFO_SUCCESS";
const GET_SHUTTLE_BUS_INFO_ERROR = "GET_SHUTTLE_BUS_INFO_ERROR";
const GET_EXPRESS_BUS_INFO = "GET_EXPRESS_BUS_INFO";
const GET_EXPRESS_BUS_INFO_SUCCESS = "GET_EXPRESS_BUS_INFO_SUCCESS";
const GET_EXPRESS_BUS_INFO_ERROR = "GET_EXPRESS_BUS_INFO_ERROR";


export const getCityBusInfo = (depart, arrival) => async dispatch => {
  dispatch({ type: GET_CITY_BUS_INFO });
  try {
    const res = await infoAPI.getBusInfo("city", depart, arrival);
    dispatch({
      type: GET_CITY_BUS_INFO_SUCCESS,
      res
    });
  } catch (e) {
    dispatch({
      type: GET_CITY_BUS_INFO_ERROR,
      error: e
    })
  }
};

export const getShuttleBusInfo = (depart, arrival) => async dispatch => {
  dispatch({ type: GET_SHUTTLE_BUS_INFO });
  try {
    const res = await infoAPI.getBusInfo("shuttle", depart, arrival);
    dispatch({
      type: GET_SHUTTLE_BUS_INFO_SUCCESS,
      res
    });
  } catch (e) {
    dispatch({
      type: GET_SHUTTLE_BUS_INFO_ERROR,
      error: e
    })
  }
};

export const getExpressBusInfo = (depart, arrival) => async dispatch => {
  dispatch({ type: GET_EXPRESS_BUS_INFO });
  try {
    const res = await infoAPI.getBusInfo("express", depart, arrival);
    dispatch({
      type: GET_EXPRESS_BUS_INFO_SUCCESS,
      res
    });
  } catch (e) {
    dispatch({
      type: GET_EXPRESS_BUS_INFO_ERROR,
      error: e
    })
  }
};

const initBusData = {
  loading: false,
  data: {
    now_bus: null,
    next_bus: null,
  },
  error: null
}

const initialState = {
  cityBusData: initBusData,
  shuttleBusData: initBusData,
  expressBusData: initBusData,
};

export default function busReducer(state = initialState, action) {
  switch(action.type){
    case GET_CITY_BUS_INFO:
      return {
        ...state,
        cityBusData: {
          loading: true,
          data: state.cityBusData.data,
          error: null
        }
      }
    case GET_CITY_BUS_INFO_SUCCESS:
      return {
        ...state,
        cityBusData: {
          loading: false,
          data: action.res.data,
          error: null
        }
      }
    case GET_CITY_BUS_INFO_ERROR:
      return {
        ...state,
        cityBusData: {
          loading: false,
          data: null,
          error: action.error
        }
      };
    case GET_SHUTTLE_BUS_INFO:
      return {
        ...state,
        shuttleBusData: {
          loading: true,
          data: state.shuttleBusData.data,
          error: null
        }
      }
    case GET_SHUTTLE_BUS_INFO_SUCCESS:
      return {
        ...state,
        shuttleBusData: {
          loading: false,
          data: action.res.data,
          error: null
        }
      }
    case GET_SHUTTLE_BUS_INFO_ERROR:
      return {
        ...state,
        shuttleBusData: {
          loading: false,
          data: "미운행",
          error: action.error
        }
      };
      case GET_EXPRESS_BUS_INFO:
      return {
        ...state,
        expressBusData: {
          loading: true,
          data: state.expressBusData.data,
          error: null
        }
      }
    case GET_EXPRESS_BUS_INFO_SUCCESS:
      return {
        ...state,
        expressBusData: {
          loading: false,
          data: action.res.data,
          error: null
        }
      }
    case GET_EXPRESS_BUS_INFO_ERROR:
      return {
        ...state,
        expressBusData: {
          loading: false,
          data: "미운행",
          error: action.error
        }
      };
    default:
      return state;
  }
}
