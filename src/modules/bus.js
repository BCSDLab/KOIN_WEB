import {infoAPI} from "../api"

const GET_BUS_INFO = "GET_BUS_INFO";
const GET_BUS_INFO_SUCCESS = "GET_BUS_INFO_SUCCESS";
const GET_BUS_INFO_ERROR = "GET_BUS_INFO_ERROR";
const GET_TERM = "GET_TERM";
const GET_TERM_SUCCESS = "GET_TERM_SUCCESS";
const GET_TERM_ERROR = "GET_TERM_ERROR";

export const getBusInfo = (bus_type, depart, arrival) => async dispatch => {
  dispatch({ type: GET_BUS_INFO });
  try {
    console.log('Get bus Info');
    const res = await infoAPI.getBusInfo(bus_type, depart, arrival);
    console.log('Get bus Info', res);
    dispatch({
      type: GET_BUS_INFO_SUCCESS,
      res
    });
  } catch (e) {
    dispatch({
      type: GET_BUS_INFO_ERROR,
      error: e
    })
  }
};

export const getTerm = () => async dispatch => {
  dispatch({type: GET_TERM});
  try {
    const res = await infoAPI.getTerm();
    dispatch({
      type: GET_TERM_SUCCESS,
      res
    });
  } catch (e) {
    dispatch({
      type: GET_BUS_INFO_ERROR,
      e
    })
  }
}

const initialState = {
  cityBusData: {
    loading: false,
    data: {
      "next_bus_number": null,
      "remain_time": null,
      "bus_number": null,
      "next_remain_time": null
    },
    error: null
  },
  term: {
    term: null
  }
};

export default function busReducer(state = initialState, action) {
  switch(action.type){
    case GET_BUS_INFO:
      return {
        ...state,
        cityBusData: {
          loading: true,
          data: state.cityBusData.data,
          error: null
        }
      }
    case GET_BUS_INFO_SUCCESS:
      return {
        ...state,
        cityBusData: {
          loading: false,
          data: action.res.data,
          error: null
        }
      }
    case GET_BUS_INFO_ERROR:
      return {
        ...state,
        cityBusData: {
          loading: false,
          data: null,
          error: action.error
        }
      };
    case GET_TERM:
      return{
        ...state,
        term: state.term
      }
    case GET_TERM_SUCCESS:
      return {
        ...state,
        term: action.res.data,
      }
    case GET_TERM_ERROR:
      return {
        ...state,
        term: action.error,
      }
    default:
      return state;
  }
}
