import {
	LOADING,
	NOLOADING
} from '../actions/types';

export default function (state = {}, action) {
	switch (action.type) {
		case LOADING:
			return {...state, loading: true};
		case NOLOADING:
			return {...state, loading: false};
	}
	return state;
}