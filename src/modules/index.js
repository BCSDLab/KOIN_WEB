import { combineReducers } from 'redux';
import authReducer from './auth';
import faqReducer from "./faq";
import circleReducer from './circle';
import roomReducer from './room';

const rootReducer = combineReducers({
  authReducer,
  circleReducer,
  roomReducer,
  faqReducer
});

export default rootReducer;
