import { infoAPI } from "../api";

const GET_STORE_LIST = "GET_STORE_LIST";
const GET_STORE_LIST_SUCCESS = "GET_STORE_LIST_SUCCESS";
const GET_STORE_LIST_ERROR = "GET_STORE_ERROR";

const UPDATE_STORE_FILTER = "UPDATE_STORE_FILTER";

const SHUFFLE_STORE_LIST = "SHUFFLE_STORE_LIST";

const FILTER_STORE_LIST = "FILTER_STORE_LIST";

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
  dispatch(shuffleStoreList());
  dispatch({
    type: UPDATE_STORE_FILTER,
    tag,
    filter
  });
  dispatch({type: FILTER_STORE_LIST});
};

export const shuffleStoreList = () => (dispatch, getState) => {
  const data = getState().storeReducer.stores.data.concat();

  for(let i = data.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }
  console.log(data)
  dispatch({
    type: SHUFFLE_STORE_LIST,
    data
  })
}

export const updateStoreFilter = (tag, filter) => dispatch => {
  dispatch({
    type: UPDATE_STORE_FILTER,
    tag,
    filter
  });
  dispatch({
    type: FILTER_STORE_LIST
  });
}


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
          filteredData: [],
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
    case SHUFFLE_STORE_LIST:
      return {
        ...state,
        stores: {
          ...state.stores,
          data: action.data,
          filteredData: [],
        }
      };
    case UPDATE_STORE_FILTER:
      return {
        ...state,
        stores: {
          ...state.stores,
          filter: action.filter === undefined ? state.stores.filter : action.filter,
          tag: action.tag === undefined ? state.stores.tag : action.tag
        }
      };
    case FILTER_STORE_LIST:
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
