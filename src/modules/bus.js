import {infoAPI} from "../api"

const GET_BUS_INFO = "GET_BUS_INFO";
const GET_BUS_INFO_SUCCESS = "GET_BUS_INFO_SUCCESS";
const GET_BUS_INFO_ERROR = "GET_FAQ_ERROR";

export const getBusInfo = (depart, arrival) => async dispatch => {
  dispatch({ type: GET_BUS_INFO });
  try {
    const res = await infoAPI.getBusInfo(depart, arrival);
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
    default:
      return state;
  }
}
