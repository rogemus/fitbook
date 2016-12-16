import {
	FETCH_GYM,
	FIND_GYMS,
	FETCH_NEWEST_GYMS,
	FETCH_GYM_COMMENTS
} from '../actions/types';

const INITIAL_STATE = {
	gym: null,
	search_gyms: null
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_GYM:
			return {...state, gym: action.payload};
		case FETCH_GYM_COMMENTS:
			return {...state, gym_comments: action.payload};
		case FETCH_NEWEST_GYMS:
			return {...state, newest_gyms: action.payload};
		case FIND_GYMS:
			return {...state, search_gyms: action.payload};
		default:
			return state;
	}
}