import { reducerUtils,createPromiseThunk, handleAsyncActions } from "../lib/asyncUtils";
import { infoAPI } from "../api";

const GET_MAJOR_LIST="GET_MAJOR_LIST";
const GET_MAJOR_LIST_SUCCESS="GET_MAJOR_LIST_SUCCESS";
const GET_MAJOR_LIST_ERROR="GET_MAJOR_LIST_ERROR";

export const getMajorList = createPromiseThunk(GET_MAJOR_LIST, infoAPI.getStudentNumberList);

const initialState = {
  studentNumberList:reducerUtils.initial([]),
}
const getMajorListReducer=handleAsyncActions(GET_MAJOR_LIST,'studentNumberList')

export default function majorReducer(state = initialState, action) {
  switch(action.type) {
    case GET_MAJOR_LIST:      
    case GET_MAJOR_LIST_SUCCESS:      
    case GET_MAJOR_LIST_ERROR:      
      return getMajorListReducer(state,action);
    default:
      return state;
  }
}