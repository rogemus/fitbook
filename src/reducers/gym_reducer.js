import {
    FETCH_GYM
} from '../actions/types'

const INITIAL_STATE = {gym: null};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_GYM:
            return {...state, gym: action.payload};
        default:
            return state;
    }
    return state;
}