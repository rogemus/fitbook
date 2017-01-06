import {
	FETCH_TRAINERS
} from '../actions/types';

export default function (state = {}, action) {
	switch (action.type) {
		case FETCH_TRAINERS:
			return {...state, trainers: action.payload};
	}
	return state;
}