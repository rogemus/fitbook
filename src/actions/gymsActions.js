import axios from 'axios';

import {
	FETCH_GYM,
	FETCH_NEWEST_GYMS,
	FETCH_GYM_COMMENTS,
	FETCH_GYM_TRAINERS,
	FIND_GYMS,
	CREATE_GYM_COMMENTS,
	CREATE_GYM_RATING,
	JOIN_GYM,
	ERROR,
	LOADING,
	CREATE_GYM
} from './types';

const ROOT_URL = 'http://fitbook-api.herokuapp.com/api/v1';

export function findGyms(data) {
	return function (dispatch) {
		dispatch({
			type: LOADING,
			payload: true
		});
		axios.post(`${ROOT_URL}/gyms/find`,
			{
				'location': {
					'top_left': {
						'latitude': data.top_left.latitude,
						'longitude': data.top_left.longitude
					},
					'bottom_right': {
						'latitude': data.bottom_right.latitude,
						'longitude': data.bottom_right.longitude
					}
				}
			}
			, {
				headers: {'Content-Type': 'application/json'}
			}
		).then(response => {
			dispatch({
				type: FIND_GYMS,
				payload: response.data
			});
			dispatch({
				type: LOADING,
				payload: false
			});
		}).catch((error) => {
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

export function fetchGym(id) {
	return function (dispatch) {
		dispatch({
			type: LOADING,
			payload: true
		});
		axios.get(`${ROOT_URL}/gyms/${id}`)
			.then(response => {
				dispatch({
					type: FETCH_GYM,
					payload: response.data
				});
				dispatch({
					type: LOADING,
					payload: false
				});
			})
			.catch((error) => {
				dispatch({
					type: ERROR,
					payload: error.response.data
				});
			});
	};
}
export function fetchGymComments(id) {
	return function (dispatch) {
		axios.get(`${ROOT_URL}/gyms/${id}/comments`)
			.then(response => {
				dispatch({
					type: FETCH_GYM_COMMENTS,
					payload: response.data
				});
			})
			.catch((error) => {
				dispatch({
					type: ERROR,
					payload: error.response.data
				});
			});
	};
}

export function fetchGymTrainers(id) {
	return function (dispatch) {
		axios.get(`${ROOT_URL}/gyms/${id}/trainers`)
			.then(response => {
				dispatch({
					type: FETCH_GYM_TRAINERS,
					payload: response.data
				});
			})
			.catch((error) => {
				dispatch({
					type: ERROR,
					payload: error.response.data
				});
			});
	};
}

export function fetchNewestGyms() {
	return function (dispatch) {
		axios.get(`${ROOT_URL}/gyms`)
			.then(response => {
				dispatch({
					type: FETCH_NEWEST_GYMS,
					payload: response.data
				});
			})
			.catch((error) => {
				dispatch({
					type: ERROR,
					payload: error.response.data
				});
			});
	};
}

export function createGymComment(id, commentBody) {
	return function (dispatch) {
		axios.post(`${ROOT_URL}/me/gyms/${id}/comment`,
			{
				body: commentBody
			}, {
				headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
			}
		).then(() => {
			axios.get(`${ROOT_URL}/gyms/${id}/comments`)
				.then(response => {
					dispatch({
						type: FETCH_GYM_COMMENTS,
						payload: response.data
					});

					dispatch({
						type: CREATE_GYM_COMMENTS
					});
				});
		}).catch((error) => {
			dispatch({
				type: ERROR,
				payload: error.response.data
			});
		});
	};
}

export function createGymRating(id, ratingBody) {
	return function (dispatch) {
		axios.put(`${ROOT_URL}/me/gyms/${id}/vote`,
			{
				rating: ratingBody
			}, {
				headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
			}
		).then(() => {
			axios.get(`${ROOT_URL}/gyms/${id}`)
				.then(response => {
					dispatch({
						type: CREATE_GYM_RATING
					});

					dispatch({
						type: FETCH_GYM,
						payload: response.data
					});
				});
		}).catch((error) => {
			dispatch({
				type: ERROR,
				payload: error.response.data
			});
		});
	};
}

export function joinGym(gymId) {
	return function (dispatch) {
		axios.post(`${ROOT_URL}/me/gyms/${gymId}/join`,
			{
				level: 'trainer'
			}, {
				headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
			}
		).then(() => {
			axios.get(`${ROOT_URL}/gyms/${gymId}/trainers`)
				.then(response => {
					dispatch({
						type: FETCH_GYM_TRAINERS,
						payload: response.data
					});

					dispatch({
						type: JOIN_GYM
					});
				});
		}).catch((error) => {
			dispatch({
				type: ERROR,
				payload: error.response.data
			});
		});
	};
}

export function createGym(gymId) {
	return function (dispatch) {
		axios.post(`${ROOT_URL}/me/gyms`,
			{
				facebook_id: gymId
			}, {
				headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
			}
		).then(() => {
			dispatch({
				type: CREATE_GYM
			});
		}).catch((error) => {
			dispatch({
				type: ERROR,
				payload: error.response.data
			});
		});
	};
}