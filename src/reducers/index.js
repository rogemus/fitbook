import {combineReducers} from 'redux';
import authReducer from './auth_reducer';
import gymReducer from './gyms_reducer';
import userReducer from './current_user_reducer';

const rootReducer = combineReducers({
    gyms: gymReducer,
    auth: authReducer,
    user: userReducer
});

export default rootReducer;
