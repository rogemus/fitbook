import {
	FETCH_NEWEST_POST
} from '../actions/types';

export default function (state = {}, action) {
	switch (action.type) {
		case FETCH_NEWEST_POST:
			return {...state, newest_posts: action.payload};
	}
	return state;
}