import {
	SET_CENTER,
	SET_BOUNDS,
	SET_MARKERS
} from './types';

export function setCenter(center) {
	return function (dispatch) {
		dispatch({
			type: SET_CENTER,
			payload: center
		});
	};
}
export function setBounds(bounds) {
	return function (dispatch) {
		dispatch({
			type: SET_BOUNDS,
			payload: bounds
		});
	};
}
export function setMarkers(markers) {
	return function (dispatch) {
		dispatch({
			type: SET_MARKERS,
			payload: markers
		});
	};
}
