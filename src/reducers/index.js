import {combineReducers} from 'redux';
import authReducer from './authReducer';
import userReducer from './currentUserReducer';
import gymReducer from './gymReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	current_user: userReducer,
	gym: gymReducer
});

export default rootReducer;