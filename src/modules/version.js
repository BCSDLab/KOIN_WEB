import {versionAPI} from "../api";
/*
const GET_VERSION_TIMETABLE = "GET_VERSION_TIMETABLE"
const GET_VERSION_TIMETABLE_SUCCESS = "GET_VERSION_TIMETABLE_SUCCESS"
const GET_VERSION_TIMETABLE_ERROR = "GET_VERSION_TIMETABLE_ERROR"
*/
const GET_VERSION_SHUTTLE_BUS = "GET_VERSION_SHUTTLE_BUS"
const GET_VERSION_SHUTTLE_BUS_SUCCESS = "GET_VERSION_SHUTTLE_BUS_SUCCESS"
const GET_VERSION_SHUTTLE_BUS_ERROR = "GET_VERSION_SHUTTLE_BUS_ERROR"
const GET_VERSION_EXPRESS_BUS = "GET_VERSION_EXPRESS_BUS"
const GET_VERSION_EXPRESS_BUS_SUCCESS = "GET_VERSION_EXPRESS_BUS_SUCCESS"
const GET_VERSION_EXPRESS_BUS_ERROR = "GET_VERSION_EXPRESS_BUS_ERROR"
const GET_VERSION_CITY_BUS = "GET_VERSION_CITY_BUS"
const GET_VERSION_CITY_BUS_SUCCESS = "GET_VERSION_CITY_BUS_SUCCESS"
const GET_VERSION_CITY_BUS_ERROR = "GET_VERSION_CITY_BUS_ERROR"
/*
export const getTimetableVersionInfo = () => async dispatch => {
  dispatch({ type: GET_VERSION_TIMETABLE });
    try {
      const res = await versionAPI.getBusVersion("version");
      dispatch({
        type: GET_VERSION_TIMETABLE_SUCCESS,
        res
      });
    } catch (e) {
      dispatch({
        type: GET_VERSION_TIMETABLE_ERROR,
        error: e
      })
    }
  };
*/
export const getShuttleBusVersionInfo = () => async dispatch => {
  dispatch({ type: GET_VERSION_SHUTTLE_BUS });
    try {
      const res = await versionAPI.getBusVersion("shuttle_bus_timetable");
      dispatch({
        type: GET_VERSION_SHUTTLE_BUS_SUCCESS,
        res
      });
    } catch (e) {
      dispatch({
        type: GET_VERSION_SHUTTLE_BUS_ERROR,
        error: e
      })
    }
  };

export const getExpressBusVersionInfo = () => async dispatch => {
  dispatch({ type: GET_VERSION_EXPRESS_BUS });
    try {
      const res = await versionAPI.getBusVersion("express_bus_timetable");
      dispatch({
        type: GET_VERSION_EXPRESS_BUS_SUCCESS,
        res
      });
    } catch (e) {
      dispatch({
        type: GET_VERSION_EXPRESS_BUS_ERROR,
        error: e
      })
    }
  };

export const getCityBusVersionInfo = () => async dispatch => {
  dispatch({ type: GET_VERSION_CITY_BUS });
    try {
      const res = await versionAPI.getBusVersion("city_bus_timetable");
      dispatch({
        type: GET_VERSION_CITY_BUS_SUCCESS,
        res
      });
    } catch (e) {
      dispatch({
        type: GET_VERSION_CITY_BUS_ERROR,
        error: e
      })
    }
  };

const initVersionData = {
  loading: false,
  date: {
    updated_at: null
  },
  error: null
}

const initialVersionState = {
  cityBusVersionData: initVersionData,
  shuttleBusVersionData: initVersionData,
  expressBusVersionData: initVersionData,
};

export default function busVersionReducer(state = initialVersionState, action) {
  switch(action.type){
    case GET_VERSION_SHUTTLE_BUS:
      return {
        ...state,
        shuttleBusVersionData: {
          loading: true,
          data: state.shuttleBusVersionData.data,
          error: null
        }
      }
    case GET_VERSION_SHUTTLE_BUS_SUCCESS:
      return {
        ...state,
        shuttleBusVersionData: {
          loading: false,
          data: action.res.data,
          error: null
        }
      }
    case GET_VERSION_SHUTTLE_BUS_ERROR:
      return {
        ...state,
        shuttleBusVersionData: {
          loading: false,
          data: null,
          error: action.error
        }
      };
    case GET_VERSION_EXPRESS_BUS:
      return {
        ...state,
        expressBusVersionData: {
          loading: true,
          data: state.expressBusVersionData.data,
          error: null
        }
      }
    case GET_VERSION_EXPRESS_BUS_SUCCESS:
      return {
        ...state,
        expressBusVersionData: {
          loading: false,
          data: action.res.data,
          error: null
        }
      }
    case GET_VERSION_EXPRESS_BUS_ERROR:
      return {
        ...state,
        expressBusVersionData: {
          loading: false,
          data: null,
          error: action.error
        }
      };
    case GET_VERSION_CITY_BUS:
      return {
        ...state,
        cityBusVersionData: {
          loading: true,
          data: state.cityBusVersionData.data,
          error: null
        }
      }
    case GET_VERSION_CITY_BUS_SUCCESS:
      return {
        ...state,
        cityBusVersionData: {
          loading: false,
          data: action.res.data,
          error: null
        }
      }
    case GET_VERSION_CITY_BUS_ERROR:
      return {
        ...state,
        cityBusVersionData: {
          loading: false,
          data: null,
          error: action.error
        }
      };
      default:
      return state;
    }
  }
