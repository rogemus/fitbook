import {combineReducers} from 'redux';
import authReducer from './authReducer';
import userReducer from './currentUserReducer';
import gymReducer from './gymReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	current_user: userReducer,
	gym: gymReducer,
	processing: loadingReducer
});

export default rootReducer;