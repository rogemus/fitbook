import {
	FETCH_USER,
	FETCH_USER_COMMENTS,
	FETCH_USER_POSTS
} from '../actions/types';

const INITIAL_STATE = {
	public_user: null
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_USER:
			return {...state, public_user: action.payload};
		case FETCH_USER_COMMENTS:
			return {...state, public_user_comments: action.payload};
		case FETCH_USER_POSTS:
			return {...state, public_user_posts: action.payload};
	}
	return state;
}