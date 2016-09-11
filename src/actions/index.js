import axios from 'axios';
import {browserHistory} from 'react-router';

import {
    AUTH_USER,
    UNAUTH_USER,
    FETCH_MESSAGE
} from './types';

export function signOutUser() {
    localStorage.removeItem('token');
    return {type: UNAUTH_USER};
}

export function signInUser(data) {
    return function (dispatch) {
        dispatch({type: AUTH_USER});
        localStorage.setItem('token', data.authResponse.accessToken);
        browserHistory.push('/feature');
    };
}

export function fetchMessage() {
    return function (dispatch) {
        axios.get(ROOT_URL, {
            headers: {authorization: localStorage.getItem('token')}
        })
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                });
            });
    }
}
