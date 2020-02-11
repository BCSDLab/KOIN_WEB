import { combineReducers } from 'redux';
import authReducer from './auth';
import faqReducer from "./faq";
import circleReducer from './circle';
import cafeteriaMenuReducer from "./cafeteriaMenu";
import roomReducer from './room';
import busReducer from "./bus";
import timetableReducer from './timetable';
import lostReducer from "./lost";
import commonReducer from './common';
import boardReducer from './board';

const rootReducer = combineReducers({
  authReducer,
  circleReducer,
  cafeteriaMenuReducer,
  roomReducer,
  faqReducer,
  busReducer,
  timetableReducer,
  lostReducer,
  commonReducer,
  boardReducer
});

export default rootReducer;
