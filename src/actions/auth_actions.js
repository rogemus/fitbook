import {browserHistory} from 'react-router';
import axios from 'axios';

import {
    AUTH_USER,
    UNAUTH_USER
} from './types';

const ROOT_URL = 'http://fitbook-api.herokuapp.com';

export function signOutUser() {
    localStorage.removeItem('token');
    return {type: UNAUTH_USER};
}

export function signInUser(data) {
    var facebookToken = data.accessToken;
    return function (dispatch) {
        axios.post(`${ROOT_URL}/api/auth/facebook`, {
            token: facebookToken,
            long_term: true
        }).then(response => {
            dispatch({
                type: AUTH_USER
            });

            localStorage.setItem('token', response.data.token);
            browserHistory.push('/');
        });
    }
}