import axios from 'axios';

import {
	FETCH_CURRENT_USER_AVAILABLE_GYMS,
	BECOME_TRAINER,
	ERROR,
	LOADING,
	FETCH_CURRENT_USER,
	STOP_BEING_TRAINER
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
				axios.get(`${ROOT_URL}/me`, {
					headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
				})
					.then(response => {
						const user = JSON.stringify(response.data);
						localStorage.setItem('current_user', user);

						dispatch({
							type: FETCH_CURRENT_USER,
							payload: response.data
						});

						dispatch({
							type: BECOME_TRAINER
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

export function stopBeingTrainer() {
	return function (dispatch) {
		dispatch({
			type: LOADING,
			payload: true
		});
		axios.put(`${ROOT_URL}/me`,
			{
				options: {
					is_trainer: false
				}
			}, {
				headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
			})
			.then(() => {
				axios.get(`${ROOT_URL}/me`, {
					headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
				})
					.then(response => {
						const user = JSON.stringify(response.data);
						localStorage.setItem('current_user', user);

						dispatch({
							type: FETCH_CURRENT_USER,
							payload: response.data
						});

						dispatch({
							type: STOP_BEING_TRAINER
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