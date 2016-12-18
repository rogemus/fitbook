import axios from 'axios';

import {
	FETCH_USER
} from './types';

const ROOT_URL = 'http://fitbook-api.herokuapp.com/api/v1';

export function fetchUser(id) {
	return function (dispatch) {
		axios.get(`${ROOT_URL}/users/trainers/${id}`)
			.then(response => {
				dispatch({
					type: FETCH_USER,
					payload: response.data
				});
			});
	};
}