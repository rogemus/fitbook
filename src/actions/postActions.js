import axios from 'axios';

import {
	FETCH_NEWEST_POST,
	FETCH_POST,
	ERROR,
	LOADING
} from './types';

const ROOT_URL = 'http://fitbook-api.herokuapp.com/api/v1';

export function fetchNewestPosts() {
	return function (dispatch) {
		dispatch({
			type: LOADING,
			payload: true
		});
		axios.get(`${ROOT_URL}/posts`)
			.then(response => {
				dispatch({
					type: FETCH_NEWEST_POST,
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

export function fetchPosts(id) {
	return function (dispatch) {
		axios.get(`${ROOT_URL}/posts/${id}`)
			.then(response => {
				dispatch({
					type: FETCH_POST,
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
