import {browserHistory} from 'react-router';
import axios from 'axios';

import {
	AUTH_USER,
	UNAUTH_USER,
	FETCH_CURRENT_USER
} from './types';

const ROOT_URL = 'http://fitbook-api.herokuapp.com';

export function signOutUser() {
	localStorage.removeItem('token');
	return {type: UNAUTH_USER};
}

export function signInUser(data) {
	var facebookToken = data.accessToken;
	console.log(facebookToken);

	return function (dispatch) {
		axios.post(`${ROOT_URL}/api/auth/facebook`, {
			token: facebookToken,
			long_term: true
		}).then(response => {

			localStorage.setItem('token', response.data.token);

			axios.get(`${ROOT_URL}/api/v1/me`, {
				headers: {'Authorization': 'Bearer ' + response.data.token}
			}).then(response => {
				dispatch({
					type: AUTH_USER
				});

				dispatch({
					type: FETCH_CURRENT_USER,
					payload: response.data
				});

				browserHistory.push('/');
			});
		});
	}
}