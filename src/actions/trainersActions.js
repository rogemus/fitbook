import axios from 'axios';

import {
	FETCH_TRAINERS,
	ERROR,
	LOADING
} from './types';

const ROOT_URL = 'http://fitbook-api.herokuapp.com/api/v1';

export function fetchTrainers() {
	return function (dispatch) {
		dispatch({
			type: LOADING,
			payload: true
		});
		axios.get(`${ROOT_URL}/users/trainers`)
			.then(response => {
				dispatch({
					type: FETCH_TRAINERS,
					payload: response.data
				});
				dispatch({
					type: LOADING,
					payload: false
				});
			})
			.catch((error) => {
				if (error.response) {
					dispatch({
						type: ERROR,
						payload: error.response.data
					});
				} else {
					console.log(error);
				}
				dispatch({
					type: LOADING,
					payload: false
				});
			});
	};
}