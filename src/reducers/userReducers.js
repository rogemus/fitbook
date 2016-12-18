import {
	FETCH_USER
} from '../actions/types';

const INITIAL_STATE = {
	public_user: null
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_USER:
			return {...state, public_user: action.payload};
	}
	return state;
}