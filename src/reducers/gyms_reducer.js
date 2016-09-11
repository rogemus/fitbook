import {FETCH_GYM, FETCH_GYMS} from '../actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_GYM:
            return {...state, gym: action.payload};
        case FETCH_GYMS:
            return {...state, gyms: action.payload};
    }
    return state;
}