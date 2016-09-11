import {FETCH_CURRENT_USER} from '../actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_CURRENT_USER:
            return {...state, current_user: action.payload};
    }
    return state;
}