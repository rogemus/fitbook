import {combineReducers} from 'redux';
import authReducer from './auth_reducer';
import gymReducer from './gyms_refucer';

const rootReducer = combineReducers({
    gyms: gymReducer,
    auth: authReducer
});

export default rootReducer;
