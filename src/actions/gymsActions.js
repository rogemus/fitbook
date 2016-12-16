import axios from 'axios';

import {
	FETCH_GYM,
	FETCH_NEWEST_GYMS,
	FETCH_GYM_COMMENTS,
	FIND_GYMS
} from './types';

const ROOT_URL = 'http://fitbook-api.herokuapp.com/api/v1';

export function findGyms(data) {
	return function (dispatch) {
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
		});
	};
}

export function fetchGym(id) {
	return function (dispatch) {
		axios.get(`${ROOT_URL}/gyms/${id}`)
			.then(response => {
				dispatch({
					type: FETCH_GYM,
					payload: response.data
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
			});
	};
}