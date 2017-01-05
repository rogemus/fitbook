import axios from 'axios';
import {browserHistory} from 'react-router';

import {
	FETCH_NEWEST_POST,
	FETCH_POST,
	ERROR,
	LOADING,
	CREATE_POST
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

export function createPost(data) {
	return function (dispatch) {
		axios.post(`${ROOT_URL}/me/posts`,
			{
				post: {
					title: data.title,
					heading: data.heading,
					body: data.body,
					tags: data.tags
				}
			}, {
				headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
			}
		).then(() => {
			dispatch({
				type: CREATE_POST
			});

			browserHistory.push('/');
		}).catch((error) => {
			dispatch({
				type: ERROR,
				payload: error.response.data
			});
		});
	};
}