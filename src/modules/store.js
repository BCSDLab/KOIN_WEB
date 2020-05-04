import {infoAPI, promotionAPI} from "../api";
import { reducerUtils, handleAsyncActions, createPromiseThunk } from "../lib/asyncUtils";

const GET_STORE_LIST = "GET_STORE_LIST";
const GET_STORE_LIST_SUCCESS = "GET_STORE_LIST_SUCCESS";
const GET_STORE_LIST_ERROR = "GET_STORE_ERROR";

const SHUFFLE_STORE_LIST = "SHUFFLE_STORE_LIST";

const GET_STORE_DETAIL_INFO = "GET_STORE_DETAIL_INFO";
const GET_STORE_DETAIL_INFO_SUCCESS = "GET_STORE_DETAIL_INFO_SUCCESS";
const GET_STORE_DETAIL_INFO_ERROR = "GET_STORE_DETAIL_INFO_ERROR";

const GET_STORE_PROMOTION = "GET_STORE_PROMOTION";
const GET_STORE_PROMOTION_SUCCESS = "GET_STORE_PROMOTION_SUCCESS";
const GET_STORE_PROMOTION_ERROR = "GET_STORE_PROMOTION_ERROR";

export const getStoreList = createPromiseThunk(GET_STORE_LIST, infoAPI.getStoreList);

export const shuffleStoreList = () => (dispatch, getState) => {
  const data = getState().storeReducer.stores.data.concat();

  for(let i = data.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }
  dispatch({
    type: SHUFFLE_STORE_LIST,
    data
  })
}

export const getStoreDetailInfo = createPromiseThunk(GET_STORE_DETAIL_INFO, infoAPI.getStoreInfo);

export const getRandomPromotion = () => async dispatch => {
  dispatch({ type: GET_STORE_PROMOTION });
  try {
    const res = await promotionAPI.getRandomPendingPromotion();

    dispatch({
      type: GET_STORE_PROMOTION_SUCCESS,
      res
    })
  } catch(e) {
    dispatch({
      type: GET_STORE_PROMOTION_ERROR,
      error: e
    })
  }
};

const initialState = {
  stores: reducerUtils.initial([]),
  store: reducerUtils.initial(null),
  promotion: {
    promotionData: null,
    promotionLoading: false,
    promotionError: null
  }
};

const getStoreListReducer = handleAsyncActions(GET_STORE_LIST, 'stores', 'array', e => e.shops);
const getStoreDetailReducer = handleAsyncActions(GET_STORE_DETAIL_INFO, 'store', 'null');

export default function storeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STORE_LIST:
    case GET_STORE_LIST_SUCCESS:
    case GET_STORE_LIST_ERROR:
      return getStoreListReducer(state, action);
    case SHUFFLE_STORE_LIST:
      return {
        ...state,
        stores: {
          ...state.stores,
          data: action.data,
        }
      };
    case GET_STORE_DETAIL_INFO:
    case GET_STORE_DETAIL_INFO_SUCCESS:
    case GET_STORE_DETAIL_INFO_ERROR:
      return getStoreDetailReducer(state, action);
    case GET_STORE_PROMOTION:
      return {
        ...state,
        stores: {
          ...state.stores,
          promotionData: state.stores.promotionData ? state.stores.promotionData : null,
          promotionLoading: true,
          promotionError: null
        }
      }
    case GET_STORE_PROMOTION_SUCCESS:
      return {
        ...state,
        stores: {
          ...state.stores,
          promotionData: state.stores.promotionData ?
            // !==는 XOR 연산자 대체
            Object.assign(action.res.data, {second: (action.res.data.id !== state.stores.promotionData.id) !== state.stores.promotionData.second}) :
            action.res.data,
          promotionLoading: false,
          promotionError: null
        }
      }
    case GET_STORE_PROMOTION_ERROR:
      return {
        ...state,
        stores: {
          ...state.stores,
          promotionData: null,
          promotionLoading: false,
          promotionError: action.error
        }
      }
    default:
      return state;
  }
}
