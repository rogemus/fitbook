import axios from 'axios';

import {
	FETCH_USER,
	FETCH_USER_COMMENTS,
	FETCH_USER_POSTS,
	CREATE_USER_COMMENTS,
	CREATE_USER_RATING
} from './types';

const ROOT_URL = 'http://fitbook-api.herokuapp.com/api/v1';

export function fetchUser(id) {
	return function (dispatch) {
		axios.get(`${ROOT_URL}/users/${id}`)
			.then(response => {
				dispatch({
					type: FETCH_USER,
					payload: response.data
				});
			});
	};
}

export function fetchUserComments(id) {
	return function (dispatch) {
		axios.get(`${ROOT_URL}/users/trainers/${id}/comments`)
			.then(response => {
				dispatch({
					type: FETCH_USER_COMMENTS,
					payload: response.data
				});
			});
	};
}

export function fetchUserPosts(id) {
	return function (dispatch) {
		axios.get(`${ROOT_URL}/users/trainers/${id}/posts`)
			.then(response => {
				dispatch({
					type: FETCH_USER_POSTS,
					payload: response.data
				});
			});
	};
}

export function createUserComment(id, commentBody) {
	return function (dispatch) {
		axios.post(`${ROOT_URL}/me/trainers/${id}/comment`,
			{
				body: commentBody
			}, {
				headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
			}
		).then(() => {
			axios.get(`${ROOT_URL}/users/trainers/${id}/comments`)
				.then(response => {
					dispatch({
						type: FETCH_USER_COMMENTS,
						payload: response.data
					});

					dispatch({
						type: CREATE_USER_COMMENTS
					});
				});
		});
	};
}

export function createRating(id, ratingBody) {
	return function (dispatch) {
		axios.put(`${ROOT_URL}/me/trainers/${id}/vote`,
			{
				rating: ratingBody
			}, {
				headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
			}
		).then(() => {
			axios.get(`${ROOT_URL}/users/${id}`)
				.then(response => {
					dispatch({
						type: CREATE_USER_RATING
					});

					dispatch({
						type: FETCH_USER,
						payload: response.data
					});
				});
		});
	};
}