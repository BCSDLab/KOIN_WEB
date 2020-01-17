import { combineReducers } from 'redux';
import authReducer from './auth';
import faqReducer from "./faq";
import circleReducer from './circle';
import roomReducer from './room';
import busReducer from "./bus";

const rootReducer = combineReducers({
  authReducer,
  circleReducer,
  roomReducer,
  faqReducer,
  busReducer
});

export default rootReducer;
