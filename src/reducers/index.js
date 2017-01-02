import {combineReducers} from 'redux';
import authReducer from './authReducer';
import currentUserReducer from './currentUserReducer';
import publicUserReducer from './userReducers';
import gymReducer from './gymReducer';
import postReducer from './postReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	current_user: currentUserReducer,
	gym: gymReducer,
	posts: postReducer,
	public_user: publicUserReducer,
	errors: errorReducer
});

export default rootReducer;