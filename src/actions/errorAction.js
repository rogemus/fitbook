import {
	ERROR
} from './types';

export function clearError() {
	return function (dispatch) {
		dispatch({
			type: ERROR,
			payload: ''
		});
	};
}
