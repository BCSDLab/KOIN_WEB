import { combineReducers } from 'redux';
import authReducer from './auth';
import faqReducer from "./faq";
import circleReducer from './circle';
import cafeteriaMenuReducer from "./cafeteriaMenu";
import roomReducer from './room';
import busReducer from "./bus";
import storeReducer from "./store";
import timetableReducer from './timetable';
import lostReducer from "./lost";

const rootReducer = combineReducers({
  authReducer,
  circleReducer,
  cafeteriaMenuReducer,
  roomReducer,
  faqReducer,
  busReducer,
  storeReducer,
  timetableReducer,
  lostReducer
});

export default rootReducer;
