import axios from 'axios';

import {
    FETCH_CURRENT_USER
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

