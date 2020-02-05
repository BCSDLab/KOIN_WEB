import { infoAPI } from "../api";

const GET_STORE_LIST = "GET_STORE_LIST";
const GET_STORE_LIST_SUCCESS = "GET_STORE_LIST_SUCCESS";
const GET_STORE_LIST_ERROR = "GET_STORE_ERROR";

const GET_STORE_LIST_BY_TAG = "GET_STORE_LIST_BY_TAG";
const GET_STORE_LIST_BY_FILTER = "GET_STORE_LIST_BY_FILTER";

const GET_STORE_DETAIL_INFO = "GET_STORE_DETAIL_INFO";
const GET_STORE_DETAIL_INFO_SUCCESS = "GET_STORE_DETAIL_INFO_SUCCESS";
const GET_STORE_DETAIL_INFO_ERROR = "GET_STORE_DETAIL_INFO_ERROR";

export const getStoreList = (tag, filter) => async dispatch => {
  dispatch({ type: GET_STORE_LIST });
  try {
    const res = await infoAPI.getStoreList();
    dispatch({
      type: GET_STORE_LIST_SUCCESS,
      res
    });
  } catch (e) {
    dispatch({
      type: GET_STORE_LIST_ERROR,
      error: e
    });
  }
  dispatch({
    type: GET_STORE_LIST_BY_TAG,
    tag
  });
  dispatch({
    type: GET_STORE_LIST_BY_FILTER,
    filter
  });
};

export const getStoreListByFilter = filter => ({
  type: GET_STORE_LIST_BY_FILTER,
  filter
});

export const getStoreListByTag = tag => ({
  type: GET_STORE_LIST_BY_TAG,
  tag
});

export const getStoreDetailInfo = id => async dispatch => {
  dispatch({ type: GET_STORE_DETAIL_INFO });
  try {
    const res = await infoAPI.getStoreInfo(id);
    dispatch({
      type: GET_STORE_DETAIL_INFO_SUCCESS,
      res
    })
  } catch(e) {
    dispatch({
      type: GET_STORE_DETAIL_INFO_ERROR,
      error: e
    })
  }
};

const initialState = {
  stores: {
    loading: false,
    data: [],
    tag: "ALL",
    filter: 0,
    filteredData: [],
    error: null
  },
  store: {
    loading: false,
    data: null,
    error: null
  }
};

export default function storeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STORE_LIST:
      return {
        ...state,
        stores: {
          ...state.stores,
          loading: true,
          data: [],
          filteredData: [],
          error: null
        }
      };
    case GET_STORE_LIST_SUCCESS:
      return {
        ...state,
        stores: {
          loading: false,
          data: action.res.data.shops,
          filteredData: action.res.data.shops,
          error: null
        }
      };
    case GET_STORE_LIST_ERROR:
      return {
        ...state,
        stores: {
          ...state.stores,
          loading: false,
          data: null,
          filteredData: null,
          error: action.error
        }
      };
    case GET_STORE_LIST_BY_FILTER:
      return {
        ...state,
        stores: {
          ...state.stores,
          loading: false,
          data: state.stores.data,
          filter: action.filter,
          filteredData:
            state.stores.data.filter(store =>
                (state.stores.tag === "ALL" || store.category === state.stores.tag) &&
              ((store.pay_bank * 4 + store.pay_card * 2 + store.delivery) & action.filter) === action.filter
            ),
          error: null
        }
      };
    case GET_STORE_LIST_BY_TAG:
      return {
        ...state,
        stores: {
          ...state.stores,
          loading: false,
          data: state.stores.data,
          tag: action.tag,
          filteredData:
            state.stores.data.filter(store =>
              (action.tag === "ALL" || store.category === action.tag) &&
              ((store.pay_bank * 4 + store.pay_card * 2 + store.delivery) & state.stores.filter) === state.stores.filter
            ),
          error: null
        }
      };
    case GET_STORE_DETAIL_INFO:
      return {
        ...state,
        store: {
          loading: true,
          data: null,
          error: null,
        }
      }
    case GET_STORE_DETAIL_INFO_SUCCESS:
      return {
        ...state,
        store: {
          loading: false,
          data: action.res.data,
          error: null
        }
      }
    case GET_STORE_DETAIL_INFO_ERROR:
      return {
        ...state,
        store: {
          loading: false,
          data: null,
          error: action.error
        }
      }
    default:
      return state;
  }
}
