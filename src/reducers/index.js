import {combineReducers} from 'redux';
import authReducer from './auth_reducer';
import userReducer from './current_user_reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    current_user: userReducer
});

export default rootReducer;
