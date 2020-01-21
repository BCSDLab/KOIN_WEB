import { combineReducers } from 'redux';
import authReducer from './auth';
import faqReducer from "./faq";
import circleReducer from './circle';
import cafeteriaMenuReducer from "./cafeteriaMenu";
import roomReducer from './room';
import busReducer from "./bus";

const rootReducer = combineReducers({
  authReducer,
  circleReducer,
  cafeteriaMenuReducer,
  roomReducer,
  faqReducer,
  busReducer
});

export default rootReducer;
