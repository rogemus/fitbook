import {
    FETCH_CURRENT_USER,
    FETCH_CURRENT_USER_GYMS
} from '../actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_CURRENT_USER:
            return {...state, user: action.payload};
        case FETCH_CURRENT_USER_GYMS:
            return {...state, gyms: action.payload};
    }
    return state;
}