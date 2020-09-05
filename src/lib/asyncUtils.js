export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return param => async dispatch => {
    console.log(param);
    dispatch({ type });
    try {
      const res = await promiseCreator(param);
      console.log(res);
      dispatch({
        type: SUCCESS,
        payload: res.data
      })
    } catch (e) {
      dispatch({
        type: ERROR,
        payload: e,
        error: true
      })
    }
  }
}

export const handleAsyncActions = (type, key, stateType = 'array', successCallback = e => e) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  let loadingData;
  // loadingData is string only if stateType is before
  switch (stateType) {
    case "object":
      loadingData = {};
      break;
    case "null":
      loadingData = null;
      break;
    case "before":
      loadingData = key
      break;
    case "array":
    default:
      loadingData = [];
      break;
  }
  return (state, action) => {
    switch(action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(typeof loadingData === 'string' ? state[key].data : loadingData)
        }
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(successCallback(action.payload))
        }
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload)
        }
      default:
        return state
    }
  }
}

export const reducerUtils = {
  initial: (data = null) => ({
    data,
    loading: false,
    error: null
  }),
  loading: (prevState = null) => ({
    data: prevState,
    loading: true,
    error: null
  }),
  success: data => ({
    data,
    loading: false,
    error: null
  }),
  error: error => ({
    data: null,
    loading: false,
    error
  })
}
