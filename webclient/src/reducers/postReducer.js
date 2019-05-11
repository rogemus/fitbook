import {
	FETCH_NEWEST_POST,
	FETCH_POST
} from '../actions/types';

export default function (state = {}, action) {
	switch (action.type) {
		case FETCH_NEWEST_POST:
			return {...state, newest_posts: action.payload};
		case FETCH_POST:
			return {...state, public_post: action.payload};
	}
	return state;
}