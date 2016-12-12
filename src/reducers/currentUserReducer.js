import {
	FETCH_CURRENT_USER,
	FETCH_CURRENT_USER_GYMS,
	FETCH_CURRENT_USER_AVAILABLE_GYMS,
	FETCH_CURRENT_USER_POSTS
} from '../actions/types'

export default function (state = {}, action) {
	switch (action.type) {
		case FETCH_CURRENT_USER:
			return {...state, user: action.payload};
		case FETCH_CURRENT_USER_GYMS:
			return {...state, gyms: action.payload};
		case FETCH_CURRENT_USER_AVAILABLE_GYMS:
			return {...state, available_gyms: action.payload};
		case FETCH_CURRENT_USER_POSTS:
			return {...state, posts: action.payload};
	}
	return state;
}