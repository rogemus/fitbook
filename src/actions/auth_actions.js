import {browserHistory} from 'react-router';
import axios from 'axios';

import {
    AUTH_USER,
    UNAUTH_USER,
    FETCH_GYM,
    FETCH_GYMS
} from './types';

const ROOT_URL = 'http://localhost:3030';

export function signOutUser() {
    localStorage.removeItem('token');
    return {type: UNAUTH_USER};
}

export function signInUser(data) {
    return function (dispatch) {
        dispatch({
            type: AUTH_USER,
            payload: data.userID
        });
        localStorage.setItem('token', data.accessToken);
        browserHistory.push('/gyms');
    };
}

export function fetchGyms() {
    return function (dispatch) {
        axios.get(ROOT_URL + '/api/v1/gyms', {
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
        }).then(response => {
            dispatch({
                type: FETCH_GYMS,
                payload: response.data.message
            });
        });
    }
}

export function fetchGym() {
    return function (dispatch) {
        axios.get(ROOT_URL + '/api/v1/gym', {
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
        }).then(response => {
            dispatch({
                type: FETCH_GYM,
                payload: response.data
            });
        });
    }
}


