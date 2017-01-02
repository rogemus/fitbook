import axios from 'axios';
import {browserHistory} from 'react-router';

import {
	FETCH_CURRENT_USER_GYMS,
	FETCH_CURRENT_USER_AVAILABLE_GYMS,
	FETCH_CURRENT_USER_POSTS,
	CREATE_GYM,
	CREATE_POST,
	BECOME_TRAINER,
	ERROR
} from './types';

const ROOT_URL = 'http://fitbook-api.herokuapp.com/api/v1';

export function fetchCurrentUserGyms() {
	return function (dispatch) {
		axios.get(`${ROOT_URL}/me/gyms`,
			{
				headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
			}
		).then(response => {
			dispatch({
				type: FETCH_CURRENT_USER_GYMS,
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

export function fetchCurrentUserPosts() {
	return function (dispatch) {
		axios.get(`${ROOT_URL}/me/posts`,
			{
				headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
			}
		).then(response => {
			dispatch({
				type: FETCH_CURRENT_USER_POSTS,
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

			browserHistory.push('/me');
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