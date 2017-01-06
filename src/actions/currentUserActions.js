import axios from 'axios';
import {browserHistory} from 'react-router';

import {
	FETCH_CURRENT_USER_AVAILABLE_GYMS,
	BECOME_TRAINER,
	ERROR,
	LOADING
} from './types';

const ROOT_URL = 'http://fitbook-api.herokuapp.com/api/v1';

export function fetchCurrentUserAvailableGyms() {
	return function (dispatch) {
		dispatch({
			type: LOADING,
			payload: true
		});
		axios.get(`${ROOT_URL}/me/gyms/available`,
			{
				headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
			})
			.then(response => {
				dispatch({
					type: FETCH_CURRENT_USER_AVAILABLE_GYMS,
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

export function becomeTrainer() {
	return function (dispatch) {
		dispatch({
			type: LOADING,
			payload: true
		});
		axios.put(`${ROOT_URL}/me`,
			{
				options: {
					is_trainer: true
				}
			}, {
				headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
			})
			.then(() => {
				dispatch({
					type: BECOME_TRAINER
				});

				dispatch({
					type: LOADING,
					payload: false
				});
				browserHistory.push('/');
			})
			.catch((error) => {
				dispatch({
					type: ERROR,
					payload: error.response.data
				});
				dispatch({
					type: LOADING,
					payload: false
				});
			});
	};
}