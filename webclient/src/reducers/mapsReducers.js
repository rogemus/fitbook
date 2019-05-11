import {
	SET_CENTER,
	SET_BOUNDS,
	SET_MARKERS
} from '../actions/types';

export default function (state = {}, action) {
	switch (action.type) {
		case SET_CENTER:
			return {...state, center: action.payload};
		case SET_BOUNDS:
			return {...state, bounds: action.payload};
		case SET_MARKERS:
			return {...state, markers: action.payload};
	}
	return state;
}