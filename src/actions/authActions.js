import {browserHistory} from 'react-router';
import axios from 'axios';

import {
	AUTH_USER,
	UNAUTH_USER,
	FETCH_CURRENT_USER,
	LOADING
} from './types';

const ROOT_URL = 'http://fitbook-api.herokuapp.com';

export function signOutUser() {
	localStorage.removeItem('token');
	return {type: UNAUTH_USER};
}

export function signInUser(data) {
	const facebookToken = data.accessToken;

	return function (dispatch) {
		dispatch({
			type: LOADING,
			payload: true
		});
		axios.post(`${ROOT_URL}/api/auth/facebook`,
			{
				token: facebookToken,
				long_term: true
			}
		).then(response => {

			localStorage.setItem('token', response.data.token);

			axios.get(`${ROOT_URL}/api/v1/me`, {
				headers: {'Authorization': 'Bearer ' + response.data.token}
			}).then(response => {
				const user = JSON.stringify(response.data);
				localStorage.setItem('current_user', user);

				dispatch({
					type: AUTH_USER
				});

				dispatch({
					type: FETCH_CURRENT_USER,
					payload: response.data
				});

				dispatch({
					type: LOADING,
					payload: false
				});

				browserHistory.push('/');
			}).catch((error) => {
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
		});
	};
}

export function refreshToken(token) {
	axios.put(`${ROOT_URL}/api/auth/refresh`, {}, {
		headers: {'Authorization': 'Bearer ' + token}
	});
}