import { combineReducers } from 'redux';
import authReducer from './auth';
import cafeteriaMenuReducer from "./cafeteriaMenu";
import roomReducer from './room';
import busReducer from "./bus";
import storeReducer from "./store";
import timetableReducer from './timetable';
import boardReducer from './board';

const rootReducer = combineReducers({
  authReducer,
  cafeteriaMenuReducer,
  roomReducer,
  busReducer,
  storeReducer,
  timetableReducer,
  boardReducer,
});

export default rootReducer;
