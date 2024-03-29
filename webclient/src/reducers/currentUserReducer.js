import {
	FETCH_CURRENT_USER,
	FETCH_CURRENT_USER_AVAILABLE_GYMS
} from '../actions/types';

export default function (state = {}, action) {
	switch (action.type) {
		case FETCH_CURRENT_USER:
			return {...state, user: action.payload};
		case FETCH_CURRENT_USER_AVAILABLE_GYMS:
			return {...state, available_gyms: action.payload};
	}
	return state;
}