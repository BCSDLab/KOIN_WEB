import { combineReducers } from 'redux';
import authReducer from './auth';
import faqReducer from "./faq";
import circleReducer from './circle';

const rootReducer = combineReducers({
  authReducer,
  circleReducer,
  faqReducer
});

export default rootReducer;
