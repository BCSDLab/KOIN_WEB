import { combineReducers } from 'redux';
import authReducer from './auth';
import cafeteriaMenuReducer from "./cafeteriaMenu";
import roomReducer from './room';
import busReducer from "./bus";
import storeReducer from "./store";
import timetableReducer from './timetable';
import commonReducer from './common';
import boardReducer from './board';
import courseReducer from './course';

const rootReducer = combineReducers({
  authReducer,
  cafeteriaMenuReducer,
  roomReducer,
  busReducer,
  courseReducer,
  storeReducer,
  timetableReducer,
  commonReducer,
  boardReducer,
});

export default rootReducer;
