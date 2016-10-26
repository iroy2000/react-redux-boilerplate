import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import example from './modules/example';

export default combineReducers({
  example,
  routing,
});
