import {
	ERROR
} from '../actions/types';

export default function (state = {}, action) {
	switch (action.type) {
		case ERROR:
			return {...state, error: action.payload};
	}
	return state;
}