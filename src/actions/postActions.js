import axios from 'axios';
import {browserHistory} from 'react-router';

import {
	FETCH_NEWEST_POST,
	FETCH_POST,
	ERROR,
	LOADING,
	CREATE_POST,
	DELETE_POST,
	UPDATE_POST
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
		dispatch({
			type: LOADING,
			payload: true
		});
		return axios.get(`${ROOT_URL}/posts/${id}`)
			.then(response => {
				dispatch({
					type: FETCH_POST,
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
				dispatch({
					type: LOADING,
					payload: false
				});
			});
	};
}

export function createPost(data) {
	return function (dispatch) {
		dispatch({
			type: LOADING,
			payload: true
		});
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
				type: UPDATE_POST
			});
			dispatch({
				type: LOADING,
				payload: false
			});

			browserHistory.push('/');
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
export function updatePost(data, id) {
	return function (dispatch) {
		dispatch({
			type: LOADING,
			payload: true
		});
		axios.put(`${ROOT_URL}/me/posts/${id}`,
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
			dispatch({
				type: LOADING,
				payload: false
			});

			browserHistory.push(`/posts/${id}`);
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

export function deletePost(id) {
	return function (dispatch) {
		dispatch({
			type: LOADING,
			payload: true
		});
		axios.delete(`${ROOT_URL}/me/posts/${id}`, {
			headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}
		).then(() => {
			dispatch({
				type: DELETE_POST
			});
			dispatch({
				type: LOADING,
				payload: false
			});
			browserHistory.push('/');
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