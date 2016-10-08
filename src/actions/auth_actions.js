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
    var facebookToken = data.accessToken;
    return function (dispatch) {
        axios.post(ROOT_URL + '/api/auth/facebook', {
            facebook_token: facebookToken
        }).then(response => {
            dispatch({
                type: AUTH_USER
            });
            localStorage.setItem('token', response.data.auth_token);
        });
    }
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


