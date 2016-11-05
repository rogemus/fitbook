import {combineReducers} from 'redux';
import authReducer from './auth_reducer';
import userReducer from './current_user_reducer';
import gymReducer from './gym_reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    current_user: userReducer,
    gym: gymReducer
});

export default rootReducer;
