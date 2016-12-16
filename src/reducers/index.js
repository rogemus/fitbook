import {combineReducers} from 'redux';
import authReducer from './authReducer';
import userReducer from './currentUserReducer';
import gymReducer from './gymReducer';
import postReducer from './postReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	current_user: userReducer,
	gym: gymReducer,
	posts: postReducer
});

export default rootReducer;