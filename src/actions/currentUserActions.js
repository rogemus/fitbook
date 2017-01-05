import axios from 'axios';
import {browserHistory} from 'react-router';

import {
	FETCH_CURRENT_USER_AVAILABLE_GYMS,
	BECOME_TRAINER,
	ERROR
} from './types';

const ROOT_URL = 'http://fitbook-api.herokuapp.com/api/v1';

export function fetchCurrentUserAvailableGyms() {
	return function (dispatch) {
		axios.get(`${ROOT_URL}/me/gyms/available`,
			{
				headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
			}
		).then(response => {
			dispatch({
				type: FETCH_CURRENT_USER_AVAILABLE_GYMS,
				payload: response.data
			});
		}).catch((error) => {
			dispatch({
				type: ERROR,
				payload: error.response.data
			});
		});
	};
}

export function becomeTrainer() {
	return function (dispatch) {
		axios.put(`${ROOT_URL}/me`,
			{
				options: {
					is_trainer: true
				}
			}, {
				headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
			}
		).then(() => {
			dispatch({
				type: BECOME_TRAINER
			});

			browserHistory.push('/me');
		}).catch((error) => {
			dispatch({
				type: ERROR,
				payload: error.response.data
			});
		});
	};
}