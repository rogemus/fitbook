import axios from 'axios';

import {
    FETCH_CURRENT_USER,
    FETCH_CURRENT_USER_GYMS
} from './types';

const ROOT_URL = 'http://fitbook-api.herokuapp.com/api/v1';

export function fetchCurrentUser() {
    return function (dispatch) {
        axios.get(ROOT_URL + '/me', {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then(response => {
            dispatch({
                type: FETCH_CURRENT_USER,
                payload: response.data
            });
        });
    }
}

export function fetchCurrentUserGyms() {
    return function (dispatch) {
        axios.get(ROOT_URL + '/me/gyms', {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then(response => {
            dispatch({
                type: FETCH_CURRENT_USER_GYMS,
                payload: response.data
            });
        });
    }
}