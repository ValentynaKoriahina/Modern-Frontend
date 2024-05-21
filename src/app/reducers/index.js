import { combineReducers } from 'redux';

import user from './user';
import exercises from './exercise';


export default combineReducers({
  user,
  exercises,
});
